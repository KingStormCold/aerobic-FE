import React from 'react';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import Menus from './menu';
import HeaderAdmin from './header-admin';
import QuanLyUsers from './quanlyusers/quanlyuser';
import Dashboard from './dashboard/dashboard';
import { Switch } from 'react-router-dom';
import { Storage } from 'react-jhipster';
import PrivateRoute from 'app/shared/auth/private-route';
import { useAppSelector } from 'app/config/store';
import Loading from 'app/components/loading';
import { CONSTANT } from 'app/config/constants';
import CategoryManagement from './category/category';
import CategoryCreate from './category/category_create';
import CategoryEdit from './category/category_edit';


const Routes = ({ match }) => {
  const haveRoles = useAppSelector(state => state.authentication.roles);
  const loading = useAppSelector(state => state.authentication.loading);
  const roleUser = haveRoles.includes(CONSTANT.ROLES.USER)
  const roleCategory = haveRoles.includes(CONSTANT.ROLES.CATEGORY)
  return (
    <>
      {loading ? <Loading /> :
        <>
          <Menus />
          <div className="wrapper d-flex flex-column min-vh-100 bg-light">
            <HeaderAdmin />
            <div className="body flex-grow-1 px-3">
              <Switch>
                <ErrorBoundaryRoute exact path={`${match.url}/`} component={Dashboard} />
                ({roleUser && <PrivateRoute exact path={`${match.url}/user-management`} component={QuanLyUsers} />})
                ({roleCategory && <PrivateRoute exact path={`${match.url}/category-management`} component={CategoryManagement} />})
                ({roleCategory && <PrivateRoute exact path={`${match.url}/category-create`} component={CategoryCreate} />})
                ({roleCategory && <PrivateRoute exact path={`${match.url}/category-edit`} component={CategoryEdit} />})
              </Switch>
            </div>
          </div>
        </>
      }
    </>
  )
}

export default Routes;
