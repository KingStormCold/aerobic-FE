import React, { useEffect, useState } from 'react';
import Loadable from 'react-loadable';
import { Switch } from 'react-router-dom';

import Login from 'app/modules/login/login';
import Logout from 'app/modules/login/logout';
import PrivateRoute from 'app/shared/auth/private-route';
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import PageNotFound from 'app/shared/error/page-not-found';
import { Storage } from 'react-jhipster';
import { useAppSelector } from './config/store';
import Register from './modules/login/register';
import ChangePass from './modules/login/change-pass';

const Admin = Loadable({
  loader: () => import(/* webpackChunkName: "administration" */ 'app/modules/administration'),
  loading: () => <div>loading ...</div>,
});

const Client = Loadable({
  loader: () => import(/* webpackChunkName: "client" */ 'app/modules/client/'),
  loading: () => <div>loading ...</div>,
});

const Routes = () => {
  const [roleAdmin, setRoleAdmin] = useState(false);
  const haveRoles = useAppSelector(state => state.authentication.roles);
  useEffect(() => {
    if (haveRoles.includes('ADMIN')) {
      setRoleAdmin(true);
    }
  }, [haveRoles]);
  console.log('roleAdmin', roleAdmin);
  return (
    <Switch>
      <ErrorBoundaryRoute path="/login" component={Login} />
      <ErrorBoundaryRoute path="/logout" component={Logout} />
      <ErrorBoundaryRoute path="/register" component={Register} />
      <ErrorBoundaryRoute path="/change-password" component={ChangePass} />
      {roleAdmin && <PrivateRoute path="/admin" component={Admin} />}
      <PrivateRoute path="/" component={Client} />
      <ErrorBoundaryRoute component={PageNotFound} />
    </Switch>
  );
};

export default Routes;
