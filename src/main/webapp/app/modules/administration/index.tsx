import React from 'react';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
// import UserManagement from './user-management';
import Logs from './logs/logs';
import Health from './health/health';
import Metrics from './metrics/metrics';
import Configuration from './configuration/configuration';
import Docs from './docs/docs';
import Menus from './menu';
import HeaderAdmin from './header-admin';
import QuanLyUsers from './quanlyusers/quanlyuser';
import Dashboard from './dashboard/dashboard';
import { Switch } from 'react-router-dom';
import UserManagementUpdate from './user-management/user-management-update'
import CategoryManagement from './category-management/category-management';
import { CategoryManagementUpdate } from './category-management/category-management-update';
import { ProductManagement } from './product-management/product-management';
import ProductManagementDetail from './product-management/product-management-detail';
import { ProductManagementUpdate } from './product-management/product-management-update';
import { ProductInfoManagement } from './product-info-management/product-info-management';
import { ProductInfoManagementUpdate } from './product-info-management/product-info-management-update';
import ProductInfoDetailManagement from './product-info-detail-management/product-info-detail-management';
import ProductInfoDetailManagementUpdate from './product-info-detail-management/product-info-detail-management-update';
import ProductInfoDetail from './product-info-management/product-info-detail';
import { Storage } from 'react-jhipster';
import PrivateRoute from 'app/shared/auth/private-route';
import VideoManagement from './video-management/video-management';
import VideoManagementUpdate from './video-management/video-management-update';
import OrderProductManagement from './order-product/order-product';

const ADMIN_USER = 'ADMIN_USER'
const ADMIN_PRODUCT = 'ADMIN_PRODUCT'
const ADMIN_CATEGORY = 'ADMIN_CATEGORY'
const ADMIN_VIDEO = 'ADMIN_VIDEO'
const ADMIN_ORDER_PRODUCT = 'ADMIN_ORDER_PRODUCT'

const Routes = ({ match }) => {
  const haveRoles = Storage.session.get('haveRoles');
  const roleUser = haveRoles.includes(ADMIN_USER)
  const roleCategory = haveRoles.includes(ADMIN_CATEGORY)
  const roleProduct = haveRoles.includes(ADMIN_PRODUCT)
  const roleVideo = haveRoles.includes(ADMIN_VIDEO)
  const roleOrderProduct = haveRoles.includes(ADMIN_ORDER_PRODUCT)
  return (
    <>
      <Menus />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <HeaderAdmin />
        <div className="body flex-grow-1 px-3">
          <Switch>
            <ErrorBoundaryRoute exact path={`${match.url}/`} component={Dashboard} />
            ({roleUser && <PrivateRoute exact path={`${match.url}/user-management`} component={QuanLyUsers} />})
            ({roleUser && <PrivateRoute exact path={`${match.url}/user-management/add`} component={UserManagementUpdate} />})
            ({roleUser && <PrivateRoute exact path={`${match.url}/user-management/edit`} component={UserManagementUpdate} />})
            ({roleCategory && <PrivateRoute exact path={`${match.url}/category-management`} component={CategoryManagement} />})
            ({roleCategory && <PrivateRoute exact path={`${match.url}/category-management/add`} component={CategoryManagementUpdate} />})
            ({roleCategory && <PrivateRoute exact path={`${match.url}/category-management/:categoryId/edit`} component={CategoryManagementUpdate} />})
            ({roleProduct && <PrivateRoute exact path={`${match.url}/product-management`} component={ProductManagement} />})
            ({roleProduct && <PrivateRoute exact path={`${match.url}/product-management/:productId/edit`} component={ProductManagementUpdate} />})
            ({roleProduct && <PrivateRoute exact path={`${match.url}/product-info-management/:productId`} component={ProductInfoManagement} />})
            ({roleProduct && <PrivateRoute exact path={`${match.url}/product-management/:productId/detail`} component={ProductManagementDetail} />})
            ({roleProduct && <PrivateRoute exact path={`${match.url}/product-management/add`} component={ProductManagementUpdate} />})
            ({roleProduct && <PrivateRoute exact path={`${match.url}/product-info-management/:productId/add`} component={ProductInfoManagementUpdate} />})
            ({roleProduct && <PrivateRoute exact path={`${match.url}/product-info-management/:productId/:productInfoId/edit`} component={ProductInfoManagementUpdate} />})
            ({roleProduct && <PrivateRoute exact path={`${match.url}/product-info-detail-management/:productId/:productInfoId`} component={ProductInfoDetailManagement} />})
            ({roleProduct && <PrivateRoute exact path={`${match.url}/product-info-detail-management/:productId/:productInfoId/add`} component={ProductInfoDetailManagementUpdate} />})
            ({roleProduct && <PrivateRoute exact path={`${match.url}/product-info-detail-management/:productId/:productInfoId/:productInfoDetailId/edit`} component={ProductInfoDetailManagementUpdate} />})
            ({roleProduct && <PrivateRoute exact path={`${match.url}/product-info-detail/:productId/:productInfoId/detail`} component={ProductInfoDetail} />})
            ({roleVideo && <PrivateRoute exact path={`${match.url}/video-management`} component={VideoManagement} />})
            ({roleVideo && <PrivateRoute exact path={`${match.url}/video-management/add`} component={VideoManagementUpdate} />})
            ({roleOrderProduct && <PrivateRoute exact path={`${match.url}/order-product`} component={OrderProductManagement} />})
          </Switch>
        </div>
      </div>
    </>
  )
}

export default Routes;
