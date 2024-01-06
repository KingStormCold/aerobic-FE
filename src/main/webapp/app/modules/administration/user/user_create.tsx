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
      dispatch(updateStateTitle("User"))
    }
  }, [title])

  useEffect(() => {
    if (rolesErrorMessage) {
      dispatch(updateStateOpenToastMessage({ message: 'Get a list of roles' + rolesErrorMessage, isError: true }))
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
      dispatch(updateStateOpenToastMessage({ message: 'Add a successful user', isError: false }))
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
      Add users
      </h3>
      <div>
        <Form onSubmit={handleSubmit(addUser)}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              {...register('email', {
                required: 'Email cant be blank',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Emails must be in the correct format',
                },
              })}
              isInvalid={!!errors.email}
            />
            {errors.email && (
              <Card.Text as="div" className='error-text'>{errors.email.message}</Card.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Full name</Form.Label>
            <Form.Control
              type="text"
              {...register('fullname', {
                required: 'Full name must not be blank',
              })}
              isInvalid={!!errors.fullname}
            />
            {errors.fullname && (
              <Card.Text as="div" className='error-text'>{errors.fullname.message}</Card.Text>
            )}
          </Form.Group>

          {/* Password */}
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              {...register('password', {
                required: 'Passwords cant be blank',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
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
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              type="password"
              {...register('confirmPassword', {
                required: 'Confirm password cant be blank',
                validate: {
                  incorrectPassword: (value) => value === getValues('password') || 'Passwords dont match each other',
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
            <Form.Label>Phone number</Form.Label>
            <Form.Control
              type="text"
              {...register('phone', {
                required: 'Phone number cant be blank',
                pattern: {
                  value: /^[0-9]{10}$/i,
                  message: 'Invalid phone number',
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
              label="Activate"
              {...register('status')}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Role</Form.Label>
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

          <Button type='submit' variant="success" className='btn-right'>Add</Button>
        </Form>

      </div>
    </>

  );
};

export default UserCreate;
