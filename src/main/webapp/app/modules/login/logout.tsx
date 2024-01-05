import React, { useLayoutEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { logout } from 'app/shared/reducers/authentication';
import { Redirect } from 'react-router-dom';
import { Storage } from 'react-jhipster';
import { resetUser } from 'app/shared/reducers/user';

const USER_EDIT_TOKEN = "user-management-token-user-edit";

export const Logout = () => {
  const logoutUrl = useAppSelector(state => state.authentication.logoutUrl);
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    Storage.session.remove('roleAdmin');
    Storage.session.remove('haveRoles');
    Storage.session.remove(USER_EDIT_TOKEN);
    dispatch(resetUser())
    dispatch(logout());
      // window.location.href = "/";
  });

  return <Redirect to="/" />;
};

export default Logout;
