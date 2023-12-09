import DnsIcon from '@mui/icons-material/Dns';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import PersonIcon from '@mui/icons-material/Person';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Path from 'app/config/path';
import React from 'react';
import { Storage } from 'react-jhipster';
import { Link, useLocation } from 'react-router-dom';
import './admin.scss';
import './css/vendor/simplebar.css';
import './css/vendor/style.css';

const ADMIN_USER = 'ADMIN_USER'
const ADMIN = 'ADMIN'

const Menus = () => {

  const _location = useLocation();
  const haveRoles = Storage.session.get('haveRoles');

  return (
    <div className="sidebar sidebar-dark sidebar-fixed" id="sidebar">
      <div className="sidebar-brand d-none d-md-flex">
        <svg className="sidebar-brand-full" width="118" height="46">
          a
        </svg>
        <svg className="sidebar-brand-narrow" width="46" height="46">
          a
        </svg>
      </div>
      <ul className="sidebar-nav" data-coreui="navigation" data-simplebar="" >
        <li className={_location['pathname'] === `${Path.UrlPath.Admin}` ? 'active-menu nav-item' : 'nav-item'}>
          <Link className="nav-link" to="/admin" >
            <svg className="nav-icon">
              <InsertChartIcon />
            </svg> Dashboard<span className="badge badge-sm bg-info ms-auto">NEW</span></Link>
        </li>
        {
          haveRoles.includes(ADMIN) && haveRoles.includes(ADMIN_USER) ?
            <li className={_location['pathname'].includes(`${Path.UrlPath.AdminUserManagement}`) ? 'active-menu nav-item' : 'nav-item'}>
              <Link className="nav-link" to='/admin/user-management'>
                <svg className="nav-icon">
                  <DnsIcon />
                </svg> Quản lý người dùng
              </Link>
            </li>
            :
            <></>
        }
        {
          haveRoles.includes(ADMIN) ?
            <li className={_location['pathname'].includes(`${Path.UrlPath.AdminCategoryManegement}`) ? 'active-menu nav-item' : 'nav-item'}>
              <Link className="nav-link" to='/admin/category-management'>
                <svg className="nav-icon">
                  <DnsIcon />
                </svg> Quản lý danh mục
              </Link>
            </li>
            :
            <></>
        }
        {
          haveRoles.includes(ADMIN) ?
            <li className={_location['pathname'].includes(`${Path.UrlPath.AdminProductManegement}`) ? 'active-menu nav-item' : 'nav-item'}>
              <Link className="nav-link" to='/admin/product-management'>
                <svg className="nav-icon">
                  <PhoneAndroidIcon />
                </svg> Quản lý môn học
              </Link>
            </li>
            :
            <></>
        }
      </ul>
    </div>
  )
};

export default Menus;
