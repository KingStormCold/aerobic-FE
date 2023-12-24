import DnsIcon from '@mui/icons-material/Dns';
import InsertChartIcon from '@mui/icons-material/InsertChart';
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
                <DnsIcon />
              </svg> Quản lý người dùng
            </Link>
          </li>
        }
        {
          haveRoles.includes(CONSTANT.ROLES.CATEGORY) &&
          <li className={_location['pathname'].includes(`/admin/category`) ? 'active-menu nav-item' : 'nav-item'}>
            <Link className="nav-link" to='/admin/category-management'>
              <svg className="nav-icon">
                <DnsIcon />
              </svg> Quản lý danh mục
            </Link>
          </li>
        }
        {
          haveRoles.includes(CONSTANT.ROLES.SUBJECT) &&
          <li className={_location['pathname'].includes(`/admin/subject`) ? 'active-menu nav-item' : 'nav-item'}>
            <Link className="nav-link" to='/admin/subject-management'>
              <svg className="nav-icon">
                <DnsIcon />
              </svg> Quản lý môn học
            </Link>
          </li>
        }
        {
          haveRoles.includes(CONSTANT.ROLES.COURSE) &&
          <li className={_location['pathname'].includes(`/admin/course`) ? 'active-menu nav-item' : 'nav-item'}>
            <Link className="nav-link" to='/admin/course-management'>
              <svg className="nav-icon">
                <DnsIcon />
              </svg> Quản lý khóa học
            </Link>
          </li>
        }
        {
          haveRoles.includes(CONSTANT.ROLES.VIDEO) &&
          <li className={_location['pathname'].includes(`${URL_PATH.ADMIN.VIDEO.MANAGEMENT}`) ? 'active-menu nav-item' : 'nav-item'}>
            <Link className="nav-link" to='/admin/video-management'>
              <svg className="nav-icon">
                <DnsIcon />
              </svg> Quản lý video
            </Link>
          </li>
        }
      </ul>
    </div>
  )
};

export default Menus;
