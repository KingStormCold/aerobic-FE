import { SelectChangeEvent } from '@mui/material';
import Loading from 'app/components/loading';
import { URL_PATH } from 'app/config/path';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { IUpdateUser } from 'app/shared/model/user';
import { getRoles, resetUser, updateUser } from 'app/shared/reducers/user';
import { resetToastMessage, updateStateOpenToastMessage } from 'app/shared/reducers/toast-message';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import './user_edit.scss';

export const UserEdit = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const loading = useAppSelector(state => state.user.loading);
  useEffect(() => {
    dispatch(getRoles())
  }, [])
  const roles = useAppSelector(state => state.user.roles);
  const updateUserSuccess = useAppSelector(state => state.user.updateUserSuccess);
  const userDetail = useAppSelector(state => state.user.user);
  const rolesErrorMessage = useAppSelector(state => state.user.rolesErrorMessage);
  const updateUserErrorMessage = useAppSelector(state => state.user.updateUserErrorMessage);
  const [parentUser, setParentUser] = useState('')

  useEffect(() => {
    if (rolesErrorMessage) {
      dispatch(updateStateOpenToastMessage({ message: 'Lấy danh sách vai trò' + rolesErrorMessage, isError: true }))
    }
  }, [rolesErrorMessage])

  useEffect(() => {
    // kiểm tra nếu người dùng đứng ở trang chỉnh sửa mà ctrl + f5 thì sẽ đá về lại trang quản lý vì User bị undefined
    // => hk có data để chỉnh sửa
    if (userDetail.id === undefined) {
      history.push(URL_PATH.ADMIN.USER.MANAGEMENT)
    }
    if (userDetail) {
      setValue('Email', userDetail?.email)
      
    }
  }, [userDetail])

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setValue,
    formState: { errors }
  } = useForm<{
    Email: string;
    roles: string;
    Phone: number;
    Status: BigInteger;
    Money: number;
  }>();

  const editUser = (data) => {
    const requestBody = {
      email: data?.Email
    } as IUpdateUser
    if (data?.roles !== "0") {
      requestBody.roles = data?.roles
    } else {
      requestBody.roles = []
    }
    dispatch(updateUser({ id: userDetail?.id, requestBody }))
  }

  useEffect(() => {
    if (updateUserSuccess) {
      dispatch(updateStateOpenToastMessage({ message: 'chỉnh sửa user thành công', isError: false }))
      dispatch(resetUser())
      history.push(URL_PATH.ADMIN.USER.MANAGEMENT)
    }
  }, [updateUserSuccess])

  const handleParentUser = (event: SelectChangeEvent) => {
    setParentUser(event.target.value)
    setValue('roles', event.target.value)
  }

  useEffect(() => {
    if (updateUserErrorMessage) {
      dispatch(updateStateOpenToastMessage({ message: updateUserErrorMessage, isError: true }))
    }
  }, [updateUserErrorMessage])

  return (
    <>
      {loading && <Loading />}
      <h3>
        Cập Nhật Users
      </h3>
      <div>
        <Form onSubmit={handleSubmit(editUser)}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              id="Email"
              {...register('Email', {
                required: true,
              })}
              // isInvalid={errors.Email?.type === 'required'}
              readOnly
            />
            {/* {errors.Email?.type === 'required' && (
              <Card.Text as="div" className='error-text'>Email không được trống</Card.Text>
            )} */}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Vai trò</Form.Label>
            <Form.Select aria-label="Danh mục cha" value={parentUser}
              {...register('roles', {
                onChange(event) {
                  handleParentUser(event)
                },
              })}
            >
              <option value="0">Chọn Vai trò</option>
              {roles && roles?.map((role, i) => (
                <option value={`${role.id}`} key={role.id}>{role.name}</option>
              ))}
            </Form.Select>
          </Form.Group>
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

          <Form.Group className="mb-3">
            <Form.Label>Money</Form.Label>
            <Form.Control
              type="text"
              {...register('Money', {
                required: 'Số tien không được trống',
              
              })}
              isInvalid={!!errors.Money}
            />
            {errors.Money && (
              <Card.Text as="div" className='error-text'>{errors.Money.message}</Card.Text>
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

          <Button type='submit' variant="success" className='btn-right'>Chỉnh sửa</Button>
        </Form>

      </div>
    </>

  );
};

export default UserEdit;
