import Loading from 'app/components/loading';
import { URL_PATH } from 'app/config/path';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { IUpdateUser } from 'app/shared/model/user';
import { updateStateOpenToastMessage } from 'app/shared/reducers/toast-message';
import { getRoles, resetUser, updateUser } from 'app/shared/reducers/user';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { ValidatedField } from 'react-jhipster';
import { useHistory } from 'react-router-dom';
import './user_edit.scss';
import { REX } from 'app/config/constants';
import { numberWithCommas } from 'app/shared/util/string-utils';

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
  const [checkedRoles, setcheckedRoles] = useState([]);
  const account = useAppSelector(state => state.authentication.account);

  useEffect(() => {
    if (rolesErrorMessage) {
      dispatch(updateStateOpenToastMessage({ message: 'Get a list of roles. ' + rolesErrorMessage, isError: true }))
    }
  }, [rolesErrorMessage])

  useEffect(() => {

    if (userDetail.id === undefined) {
      history.push(URL_PATH.ADMIN.USER.MANAGEMENT)
    }
    if (userDetail) {
      setValue('email', userDetail?.email)
      setValue('fullname', userDetail?.fullname)
      setValue('phone', userDetail?.phone)
      setValue('status', userDetail?.status)
      const money = numberWithCommas(userDetail?.money);
      setValue('money', money)
      if (userDetail?.roles && userDetail?.roles.length > 0) {
        userDetail?.roles.map(userRole => setcheckedRoles(prev => [...prev, userRole]));
      }
    }
  }, [userDetail])

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<{
    email: string;
    fullname: string;
    phone: string;
    status: number;
    money: string;
  }>();

  const editUser = (data) => {
    const money = data?.money.replaceAll('.', '')
    const requestBody = {
      user_fullname: data?.fullname,
      user_phone: data?.phone,
      user_status: data?.status ? 1 : 0,
      user_money: Number(money),
      user_role_name: checkedRoles
    } as IUpdateUser
    dispatch(updateUser({ id: userDetail?.id, requestBody }))
  }

  useEffect(() => {
    if (updateUserSuccess) {
      dispatch(updateStateOpenToastMessage({ message: 'User updated successfully', isError: false }))
      dispatch(resetUser())
      history.push(URL_PATH.ADMIN.USER.MANAGEMENT)
    }
  }, [updateUserSuccess])

  useEffect(() => {
    if (updateUserErrorMessage) {
      dispatch(updateStateOpenToastMessage({ message: updateUserErrorMessage, isError: true }))
    }
  }, [updateUserErrorMessage])

  const handleGetRoles = props2 => {
    if (props2.checked === true) {
      setcheckedRoles(prev => [...prev, props2.value]);
    }
    if (props2.checked === false) {
      setcheckedRoles(prev => prev.filter(role => role !== props2.value));
    }
  };

  const [moneyUser, setMoneyUser] = useState('');
  const [errorMoney, setErrorMoney] = useState('');
  const handleMoney = (e) => {
    const value = e.target.value
    if (value !== '' && value !== '0') {
      const valueReplace = value.replaceAll('.', '')
      if (!REX.number.test(valueReplace)) {
        setErrorMoney('The price must be number')
      } else {
        const convertMoney = numberWithCommas(valueReplace)
        setErrorMoney('')
        setValue('money', convertMoney)
        setMoneyUser(convertMoney);
      }
    } else {
      setErrorMoney('')
      setValue('money', '')
      setMoneyUser('')
    }
  }

  return (
    <>
      {loading && <Loading />}
      <h3>
        Update User
      </h3>
      <div>
        <Form onSubmit={handleSubmit(editUser)}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              disabled
              {...register('email', {

              })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Full name</Form.Label>
            <Form.Control
              type="text"
              {...register('fullname', {
                required: 'Full name is not empty',
              })}
              isInvalid={!!errors.fullname}
            />
            {errors.fullname && (
              <Card.Text as="div" className='error-text'>{errors.fullname.message}</Card.Text>
            )}
          </Form.Group>

          {/* Phone */}
          <Form.Group className="mb-3">
            <Form.Label>Phone number</Form.Label>
            <Form.Control
              type="text"
              {...register('phone', {
                required: 'Phone number is not empty',
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
                      {userDetail && userDetail?.roles && userDetail?.roles.includes(role.name) ? (
                        <ValidatedField
                          type="checkbox"
                          name="roles_display"
                          defaultChecked
                          id={role.name}
                          key={role.name}
                          check
                          value={role.name}
                          label={role.name}
                          onClick={e => handleGetRoles(e.target)}
                        />
                      ) : (
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
                      )}
                    </div>
                  )
                })
              }
            </div>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Money</Form.Label>
            <Form.Control
              disabled={account?.data?.email !== 'admin@gmail.com'}
              type="string"
              {...register('money', {
                required: 'Money is not empty',
                onChange(event) {
                  handleMoney(event)
                },
              })}
              isInvalid={!!errors.money || errorMoney !== ''}
            />
            {errors.money && (
              <Card.Text as="div" className='error-text'>{errors.money.message}</Card.Text>
            )}
            {errorMoney && (
              <Card.Text as="div" className="error-text">
                {errorMoney}
              </Card.Text>
            )}
          </Form.Group>

          <Button type='submit' variant="success" className='btn-right'>Edit</Button>
        </Form>

      </div>
    </>

  );
};

export default UserEdit;
