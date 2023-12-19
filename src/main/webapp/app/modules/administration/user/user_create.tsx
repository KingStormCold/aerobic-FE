import Loading from 'app/components/loading';
import { URL_PATH } from 'app/config/path';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { IUser } from 'app/shared/model/user';
import { createUser, getRoles, resetUser } from 'app/shared/reducers/user';
import { resetToastMessage, updateStateOpenToastMessage } from 'app/shared/reducers/toast-message';
import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { ICreateUser } from 'app/shared/model/user';
import './user_create.scss';

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
    roles: string;
    Email: string;
    Password: string;
    ConfirmPassword: string;
    Phone: number;
    Status: BigInteger;

  }>();

  const addUser = (data) => {
    const requestBody = {
      email: data?.Email
    } as ICreateUser
    if (data?.roles !== "0") {
      requestBody.roles = data?.roles
    }
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

  return (
    <>
      {loading && <Loading />}
      <h3>
        Thêm User
      </h3>
      <div>
        <Form onSubmit={handleSubmit(addUser)}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              {...register('Email', {
                required: 'Email không được trống',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Email phải đúng định dạng',
                },
              })}
              isInvalid={!!errors.Email}
            />
            {errors.Email && (
              <Card.Text as="div" className='error-text'>{errors.Email.message}</Card.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Vai trò</Form.Label>
            <Form.Select aria-label="Danh mục cha"
              {...register('roles', {
              })}
            >
              <option value="0">Chọn vai trò</option>
              {roles && roles?.map((role, i) => (
                <option value={`${role.id}`} key={role.id}>{role.name}</option>
              ))}
            </Form.Select>
          </Form.Group>

          {/* Password */}
          <Form.Group className="mb-3">
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Control
              type="password"
              {...register('Password', {
                required: 'Mật khẩu không được trống',
                minLength: {
                  value: 6,
                  message: 'Mật khẩu phải ít nhất 6 kí tự',
                },
              })}
              isInvalid={!!errors.Password}
            />
            {errors.Password && (
              <Card.Text as="div" className='error-text'>{errors.Password.message}</Card.Text>
            )}
          </Form.Group>

          {/* Confirm Password */}
          <Form.Group className="mb-3">
            <Form.Label>Xác nhận mật khẩu</Form.Label>
            <Form.Control
              type="password"
              {...register('ConfirmPassword', {
                required: 'Xác nhận mật khẩu không được trống',
                validate: value => value === watch('Password') || 'Mật khẩu xác nhận không khớp',
              })}
              isInvalid={!!errors.ConfirmPassword}
            />
            {errors.ConfirmPassword && (
              <Card.Text as="div" className='error-text'>{errors.ConfirmPassword.message}</Card.Text>
            )}
          </Form.Group>

          {/* Phone */}
          <Form.Group className="mb-3">
            <Form.Label>Số điện thoại</Form.Label>
            <Form.Control
              type="text"
              {...register('Phone', {
                required: 'Số điện thoại không được trống',
                pattern: {
                  value: /^[0-9]{10}$/i,
                  message: 'Số điện thoại không hợp lệ',
                },
              })}
              isInvalid={!!errors.Phone}
            />
            {errors.Phone && (
              <Card.Text as="div" className='error-text'>{errors.Phone.message}</Card.Text>
            )}
          </Form.Group>

          {/* Status */}
          <Form.Group className="mb-3">
            <Form.Check
              type="switch"
              label="Kích hoạt"
              {...register('Status')}
            />
          </Form.Group>


          <Button type='submit' variant="success" className='btn-right'>Thêm</Button>
        </Form>

      </div>
    </>

  );
};

export default UserCreate;
