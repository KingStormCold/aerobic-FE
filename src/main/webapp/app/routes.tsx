import React from 'react';
import { Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

import Login from 'app/modules/login/login';
import Logout from 'app/modules/login/logout';
import Home from 'app/modules/client/home/home';
import PrivateRoute, { hasAnyAuthority } from 'app/shared/auth/private-route';
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import PageNotFound from 'app/shared/error/page-not-found';
import {useAppSelector } from 'app/config/store';
import { Storage } from 'react-jhipster';

const Admin = Loadable({
  loader: () => import(/* webpackChunkName: "administration" */ 'app/modules/administration'),
  loading: () => <div>loading ...</div>,
});

const Client = Loadable({
  loader: () => import(/* webpackChunkName: "client" */ 'app/modules/client/'),
  loading: () => <div>loading ...</div>,
});

const Routes = () => {

  const roleAdmin = Storage.session.get('roleAdmin');
  return (
    <Switch>
      <ErrorBoundaryRoute path="/login" component={Login} />
      <ErrorBoundaryRoute path="/logout" component={Logout} />
      {roleAdmin && <PrivateRoute path="/admin" component={Admin} />}
      <PrivateRoute path="/" component={Client} />
      <ErrorBoundaryRoute component={PageNotFound} />
    </Switch>
  );
};

export default Routes;
