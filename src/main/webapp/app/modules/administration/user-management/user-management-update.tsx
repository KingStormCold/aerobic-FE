import { CircularProgress } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { changeName, resetMenuLink } from 'app/shared/reducers/menu';
import React, { useEffect, useState } from 'react';
import { Storage, Translate, ValidatedField, ValidatedForm, isEmail, translate } from 'react-jhipster';
import { Link, RouteComponentProps, useLocation } from 'react-router-dom';
import { Alert, Button, Col, Row } from 'reactstrap';
import { createUser, getRoles, getUser, reset, resetError, updateUser, updateUserHandle } from '../../../shared/reducers/user';
import './user-management.scss';

const USER_EDIT_TOKEN = "user-management-token-user-edit";

export const UserManagementUpdate = (props: RouteComponentProps<{ login: string }>) => {
  const _location = useLocation();
  _location['pathname'].includes(`edit`)
  const paramUserName = Storage.session.get(USER_EDIT_TOKEN);
  const [isNew] = useState(_location['pathname'].includes(`add`));
  const [isEnableChangePW, setIsEnableChangePW] = useState(false);
  const [userRoles, setUserRoles] = useState([]);
  const [checkedRoles, setcheckedRoles] = useState([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getUser(paramUserName));
      setcheckedRoles([]);
    }
    dispatch(getRoles());
  }, [paramUserName]);

  useEffect(() => {
    dispatch(resetMenuLink());
    if (isNew)
      dispatch(changeName("Thêm người dùng"));
    else
      dispatch(changeName("Sửa người dùng"));
  }, [])

  const loading = useAppSelector(state => state.userManagement.loading);
  const loadingSuccess = useAppSelector(state => state.userManagement.loadingsuccess);
  const authorities = useAppSelector(state => state.userManagement.authorities);
  const updateSuccess = useAppSelector(state => state.userManagement.updateSuccess);
  const errorMessage = useAppSelector(state => state.userManagement.errorMessage);
  const user = useAppSelector(state => state.userManagement.user);
  const userDuplicate = useAppSelector(state => state.userManagement.userDuplicate);
  const [_user, setUser] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);

  if (updateSuccess) {
    setTimeout(() => {
      dispatch(updateUserHandle(false));
      handleClose();
    }, 1000);
  }

  const handleClose = () => {
    props.history.push('/admin/user-management');
  };

  const saveUser = values => {
    setIsInvalid(true)
    const inputValue = { ...values, roles: checkedRoles };
    if (isNew) {
      dispatch(createUser(inputValue));
    } else {
      dispatch(updateUser(inputValue));
    }
  };

  useEffect(() => {
    setUserRoles([]);
    setcheckedRoles([]);
    if (!isNew && loadingSuccess) {
      user.roles.map(userRole => setUserRoles(prev => [...prev, userRole.role_id]));
      user.roles.map(userRole => setcheckedRoles(prev => [...prev, userRole.role_id]));
    }
    setUser(user.user_name)
  }, [loadingSuccess, user.roles]);

  const handleGetRoles = props2 => {
    if (props2.checked === true) {
      setcheckedRoles(prev => [...prev, props2.value]);
    }
    if (props2.checked === false) {
      setcheckedRoles(prev => prev.filter(role => role !== props2.value));
    }
  };

  const handleChangeLowerCase = (e) => {
    const result = e.target.value.replace(/[^a-z0-9]/gi, '').toLowerCase();
    setUser(result)
  }

  useEffect(() => {
    setTimeout(() => {
      dispatch(resetError())
    }, 10000);
    setIsInvalid(false)
  }, [userDuplicate])

  return (
    <div className="user-management-update-container">
      <Row className="justify-content-center mt-4">
        <Col md="6">
          <h1>{isNew ? 'Đăng ký user' : 'Chỉnh sửa user'}</h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="6">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm onSubmit={saveUser} defaultValues={user}>
              <span>Tên đăng nhập </span>
              <span className="required-mark">*</span>
              <ValidatedField
                type="text"
                name="user_name"
                disabled={isNew ? false : true}
                value={_user}
                // onChange={(e) => handleChangeLowerCase(e)}
                onInput={(e) => handleChangeLowerCase(e)}
                validate={{
                  maxLength: {
                    value: 30,
                    message: 'Bạn chỉ nhập tối đa 30 ký tự',
                  },
                  required: {
                    value: true,
                    message: 'Bạn phải nhập tên đăng nhập',
                  },
                }}
              />
              <span>Mật khẩu </span>
              <span className="required-mark">*</span>
              {/* {!isNew && (
                <CustomInput
                  type="checkbox"
                  id="exampleCustomCheckbox"
                  label="Thay đổi password user"
                  onChange={e => setIsEnableChangePW(e.target.checked)}
                />
              )} */}
              {isEnableChangePW || isNew ? (
                <ValidatedField
                  type="password"
                  name="password"
                  validate={{
                    maxLength: {
                      value: 20,
                      message: 'Bạn chỉ nhập tối đa 20 ký tự',
                    },
                    required: {
                      value: true,
                      message: 'Bạn phải nhập mật khẩu',
                    },
                  }}
                />
              ) : (
                <ValidatedField type="password" name="password-disable" value="*******" disabled />
              )}
              <span>Họ và tên </span>
              <span className="required-mark">*</span>
              <ValidatedField
                type="text"
                name="full_name"
                validate={{
                  maxLength: {
                    value: 100,
                    message: 'Bạn chỉ nhập tối đa 100 ký tự',
                  },
                  required: {
                    value: true,
                    message: 'Bạn phải nhập họ và tên',
                  },
                }}
              />
              <span>Email </span>
              <span className="required-mark">*</span>
              <ValidatedField
                name="email"
                type="email"
                validate={{
                  required: {
                    value: true,
                    message: 'Bạn phải nhập email',
                  },
                  maxLength: {
                    value: 100,
                    message: 'Bạn chỉ nhập tối đa 100 ký tự',
                  },
                  validate: v => isEmail(v) || translate('global.messages.validate.email.invalid'),
                }}
              />
              <span>Số điện thoại </span>
              <span className="required-mark">*</span>
              <ValidatedField
                type="tel"
                name="phone_number"
                validate={{
                  maxLength: {
                    value: 10,
                    message: 'Bạn phải nhập 10 ký tự',
                  },
                  minLength: {
                    value: 10,
                    message: 'Bạn phải nhập 10 ký tự',
                  },
                  required: {
                    value: true,
                    message: 'Bạn phải nhập số điện thoại',
                  },
                }}
              />
              <ValidatedField
                type="text"
                name="address"
                label="Địa chỉ"
                validate={{
                  maxLength: {
                    value: 100,
                    message: 'Bạn chỉ nhập tối đa 100 ký tự',
                  },
                }}
              />
              <ValidatedField id="active" type="checkbox" name="active" check value={true} label="Active" />
              <br />
              <span>Vai trò </span>
              <div className="roles-wrapper">
                {(loadingSuccess || isNew) &&
                  authorities?.map((role, i) => {
                    return (
                      <div key={i}>
                        {userRoles.includes(role.role_id) ? (
                          <ValidatedField
                            type="checkbox"
                            name="roles_display"
                            defaultChecked
                            id={role.role_id}
                            key={role.role_id}
                            check
                            value={role.role_id}
                            label={role.role_id}
                            onClick={e => handleGetRoles(e.target)}
                          />
                        ) : (
                          <ValidatedField
                            type="checkbox"
                            name="roles"
                            id={role.role_id}
                            key={role.role_id}
                            check
                            value={role.role_id}
                            label={role.role_id}
                            onClick={e => handleGetRoles(e.target)}
                          />
                        )}
                      </div>
                    );
                  })}
              </div>
              <Button tag={Link} to="/admin/user-management" replace color="danger">
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              {/* <Button color="success" type="submit">
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Button color="success" type="submit" disabled={isInvalid}>
                  {isInvalid ? <CircularProgress size={10} /> : "Lưu"}
                  Luu
                </Button>
              </Button> */}
              <Button color="success" type="submit" disabled={isInvalid}>
                {isInvalid ? <CircularProgress size={20} /> : "Lưu"}
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>


      <div className="alert-bottom-right">
        {updateSuccess ? <Alert color="success">{isNew ? 'Đăng ký' : 'Chỉnh sửa'} thành công</Alert> : ''}

        {errorMessage ? <Alert color="danger">{errorMessage}</Alert> : ''}

        {userDuplicate
          ? (<Alert color="danger">Tên user đã được đăng ký</Alert>)
          : ''
        }
      </div>

      <br />
      <br />
      <br />
    </div>
  );
};

export default UserManagementUpdate;
