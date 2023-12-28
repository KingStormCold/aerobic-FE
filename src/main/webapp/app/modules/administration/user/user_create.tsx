import Loading from 'app/components/loading';
import { URL_PATH } from 'app/config/path';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { IUser } from 'app/shared/model/user';
import { createUser, getRoles, resetUser } from 'app/shared/reducers/user';
import { resetToastMessage, updateStateOpenToastMessage } from 'app/shared/reducers/toast-message';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { ICreateUser } from 'app/shared/model/user';
import './user_create.scss';
import { ValidatedField } from 'react-jhipster';
import { updateStateTitle } from 'app/shared/reducers/category-show';

export const UserCreate = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const loading = useAppSelector(state => state.user.loading);
  useEffect(() => {
    dispatch(getRoles())
  }, [])
  const roles = useAppSelector(state => state.user.roles);
  const createUserSuccess = useAppSelector(state => state.user.createUserSuccess);
  const rolesErrorMessage = useAppSelector(state => state.user.rolesErrorMessage);
  const createUserErrorMessage = useAppSelector(state => state.user.createUserErrorMessage);
  const [checkedRoles, setcheckedRoles] = useState([]);
  const title = useAppSelector(state => state.categoryShow.title);

  useEffect(() => {
    if (title === '') {
      dispatch(updateStateTitle("Người dùng"))
    }
  }, [title])

  useEffect(() => {
    if (rolesErrorMessage) {
      dispatch(updateStateOpenToastMessage({ message: 'Lấy danh sách vai trò' + rolesErrorMessage, isError: true }))
    }
  }, [rolesErrorMessage])

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors }
  } = useForm<{
    email: string;
    fullname: string;
    password: string;
    confirmPassword: string;
    phone: number;
    status: number;

  }>();

  const addUser = (data) => {
    const requestBody = {
      user_email: data?.email,
      user_password: data?.password,
      user_password_confirmation: data?.confirmPassword,
      user_fullname: data?.fullname,
      user_phone: data?.phone,
      user_status: data?.status ? 1 : 0,
      user_role_name: checkedRoles,
    } as ICreateUser
    dispatch(createUser(requestBody))
  }

  useEffect(() => {
    if (createUserSuccess) {
      dispatch(updateStateOpenToastMessage({ message: 'Thêm người dùng thành công', isError: false }))
      dispatch(resetUser())
      history.push(URL_PATH.ADMIN.USER.MANAGEMENT)
    }
  }, [createUserSuccess])

  useEffect(() => {
    if (createUserErrorMessage) {
      dispatch(updateStateOpenToastMessage({ message: createUserErrorMessage, isError: true }))
    }
  }, [createUserErrorMessage])

  const handleGetRoles = props2 => {
    if (props2.checked === true) {
      setcheckedRoles(prev => [...prev, props2.value]);
    }
    if (props2.checked === false) {
      setcheckedRoles(prev => prev.filter(role => role !== props2.value));
    }
  };

  return (
    <>
      {loading && <Loading />}
      <h3>
        Thêm người dùng
      </h3>
      <div>
        <Form onSubmit={handleSubmit(addUser)}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              {...register('email', {
                required: 'Email không được trống',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Email phải đúng định dạng',
                },
              })}
              isInvalid={!!errors.email}
            />
            {errors.email && (
              <Card.Text as="div" className='error-text'>{errors.email.message}</Card.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Họ và tên</Form.Label>
            <Form.Control
              type="text"
              {...register('fullname', {
                required: 'Họ và tên không được trống',
              })}
              isInvalid={!!errors.fullname}
            />
            {errors.fullname && (
              <Card.Text as="div" className='error-text'>{errors.fullname.message}</Card.Text>
            )}
          </Form.Group>

          {/* Password */}
          <Form.Group className="mb-3">
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Control
              type="password"
              {...register('password', {
                required: 'Mật khẩu không được trống',
                minLength: {
                  value: 6,
                  message: 'Mật khẩu phải ít nhất 6 kí tự',
                },
              })}
              isInvalid={!!errors.password}
            />
            {errors.password && (
              <Card.Text as="div" className='error-text'>{errors.password.message}</Card.Text>
            )}
          </Form.Group>

          {/* Confirm Password */}
          <Form.Group className="mb-3">
            <Form.Label>Xác nhận mật khẩu</Form.Label>
            <Form.Control
              type="password"
              {...register('confirmPassword', {
                required: 'Xác nhận mật khẩu không được trống',
                validate: {
                  incorrectPassword: (value) => value === getValues('password') || 'Mật khẩu không trùng với nhau',
                }
              })}
              isInvalid={!!errors.confirmPassword}
            />
            {errors.confirmPassword && (
              <Card.Text as="div" className='error-text'>{errors.confirmPassword.message}</Card.Text>
            )}
          </Form.Group>

          {/* Phone */}
          <Form.Group className="mb-3">
            <Form.Label>Số điện thoại</Form.Label>
            <Form.Control
              type="text"
              {...register('phone', {
                required: 'Số điện thoại không được trống',
                pattern: {
                  value: /^[0-9]{10}$/i,
                  message: 'Số điện thoại không hợp lệ',
                },
              })}
              isInvalid={!!errors.phone}
            />
            {errors.phone && (
              <Card.Text as="div" className='error-text'>{errors.phone.message}</Card.Text>
            )}
          </Form.Group>

          {/* Status */}
          <Form.Group className="mb-3">
            <Form.Check
              type="switch"
              label="Kích hoạt"
              {...register('status')}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Vai trò</Form.Label>
            <div className='flex-display'>
              {
                roles && roles?.map((role, i) => {
                  return (
                    <div key={i}>
                      <ValidatedField
                        type="checkbox"
                        name="roles"
                        id={role.name}
                        key={role.name}
                        check
                        value={role.name}
                        label={role.name}
                        onClick={e => handleGetRoles(e.target)}
                      />
                    </div>
                  )
                })
              }
            </div>
          </Form.Group>

          <Button type='submit' variant="success" className='btn-right'>Thêm</Button>
        </Form>

      </div>
    </>

  );
};

export default UserCreate;
