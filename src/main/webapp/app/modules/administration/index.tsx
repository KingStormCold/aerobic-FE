import React from 'react';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import Menus from './menu';
import HeaderAdmin from './header-admin';
import QuanLyUsers from './quanlyusers/quanlyuser';
import Dashboard from './dashboard/dashboard';
import { Switch } from 'react-router-dom';
import { Storage } from 'react-jhipster';
import PrivateRoute from 'app/shared/auth/private-route';

const ADMIN_USER = 'ADMIN_USER'

const Routes = ({ match }) => {
  const haveRoles = Storage.session.get('haveRoles');
  const roleUser = haveRoles.includes(ADMIN_USER)
  return (
    <>
      <Menus />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <HeaderAdmin />
        <div className="body flex-grow-1 px-3">
          <Switch>
            <ErrorBoundaryRoute exact path={`${match.url}/`} component={Dashboard} />
            ({roleUser && <PrivateRoute exact path={`${match.url}/user-management`} component={QuanLyUsers} />})
          </Switch>
        </div>
      </div>
    </>
  )
}

export default Routes;
