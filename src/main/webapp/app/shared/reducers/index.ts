import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale from './locale';
import authentication from './authentication';
// import applicationProfile from './application-profile';

import administration from 'app/modules/administration/administration.reducer';
// import userManagement from 'app/modules/administration/user-management/user-management.reducer';
import userManagement from './user'
import categoryManagement from './category'
import productManagement from './product'
import preferentialManagement from './preferential'
import menuClient from './menu-client'
import menu from './menu'
import productList from './product-list';
import specificationsManagement from './specification'
import productInfoManagement from './productInfo';
import productInfoDetailManagement from './productInfoDetail';
import promotionManagement from './promotion';
import productDetailClient from './product-detail';
import videoManagement from './video';
import provinceManagement from './province';
import districtManagement  from './district';
import wardManagement from './ward';
import orderProductManagement from './order-product';

/* jhipster-needle-add-reducer-import - JHipster will add reducer here */
const rootReducer = {
  authentication,
  locale,
  administration,
  userManagement,
  categoryManagement,
  productManagement,
  preferentialManagement,
  specificationsManagement,
  promotionManagement,
  menu,
  menuClient,
  productList,
  productDetailClient,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar,
  productInfoManagement,
  productInfoDetailManagement,
  videoManagement,
  provinceManagement,
  districtManagement,
  wardManagement,
  orderProductManagement
};

export default rootReducer;
