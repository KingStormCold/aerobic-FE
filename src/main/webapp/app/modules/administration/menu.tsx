import CategoryIcon from '@mui/icons-material/Category';
import GroupIcon from '@mui/icons-material/Group';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { CONSTANT } from 'app/config/constants';
import { URL_PATH } from 'app/config/path';
import { useAppSelector } from 'app/config/store';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './admin.scss';
import './css/vendor/simplebar.css';
import './css/vendor/style.css';

const Menus = () => {

  const _location = useLocation();
  const haveRoles = useAppSelector(state => state.authentication.roles);

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
        <li className={_location['pathname'] === `${URL_PATH.ADMIN.ENDPOINT}` ? 'active-menu nav-item' : 'nav-item'}>
          <Link className="nav-link" to="/admin" >
            <svg className="nav-icon">
              <InsertChartIcon />
            </svg> Dashboard<span className="badge badge-sm bg-info ms-auto">NEW</span></Link>
        </li>
        {
          haveRoles.includes(CONSTANT.ROLES.USER) &&
          <li className={_location['pathname'].includes(`/admin/user`) ? 'active-menu nav-item' : 'nav-item'}>
            <Link className="nav-link" to='/admin/user-management'>
              <svg className="nav-icon">
                <GroupIcon />
              </svg> User Management
            </Link>
          </li>
        }
        {
          haveRoles.includes(CONSTANT.ROLES.CATEGORY) &&
          <li className={_location['pathname'].includes(`/admin/category`) ? 'active-menu nav-item' : 'nav-item'}>
            <Link className="nav-link" to='/admin/category-management'>
              <svg className="nav-icon">
                <CategoryIcon />
              </svg> Category Management
            </Link>
          </li>
        }
        {
          haveRoles.includes(CONSTANT.ROLES.SUBJECT) &&
          <li className={_location['pathname'].includes(`/admin/subject`) ? 'active-menu nav-item' : 'nav-item'}>
            <Link className="nav-link" to='/admin/subject-management'>
              <svg className="nav-icon">
                <LibraryBooksIcon />
              </svg> Subject Management
            </Link>
          </li>
        }
        {
          haveRoles.includes(CONSTANT.ROLES.PAYMENT) &&
          <li className={_location['pathname'].includes(`/admin/payment`) ? 'active-menu nav-item' : 'nav-item'}>
            <Link className="nav-link" to='/admin/payment-management'>
              <svg className="nav-icon">
                <LibraryBooksIcon />
              </svg> Payment Management
            </Link>
          </li>
        }
      </ul>
    </div>
  )
};

export default Menus;
