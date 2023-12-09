// import './css/vendor/simplebar.css';
import './css/vendor/style.css';
import React from 'react';
import { Redirect, RouteComponentProps, BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { useAppSelector } from 'app/config/store';

const HeaderAdmin = () => {

  return (
    <header className="header header-sticky mb-4">
      <div className="container-fluid">
        <button className="header-toggler px-md-0 me-md-3" type="button">
          <svg className="icon icon-lg">
          </svg>
        </button><a className="header-brand d-md-none" href="#">
          <svg width="118" height="46">

          </svg></a>
        {/* <ul className="header-nav d-none d-md-flex">
          <li className="nav-item"><Link className="nav-link" to="/admin/new">Dashboard</Link></li>
          <li className="nav-item"><a className="nav-link" href="#">Users</a></li>
          <li className="nav-item"><a className="nav-link" href="#">Settings</a></li>
        </ul> */}
        <ul className="header-nav ms-auto">
          <li className="nav-item"><a className="nav-link" href="#">
            <svg className="icon icon-lg">
            </svg></a></li>
          <li className="nav-item"><a className="nav-link" href="#">
            <svg className="icon icon-lg">
            </svg></a></li>
          <li className="nav-item"><a className="nav-link" href="#">
            <svg className="icon icon-lg">
            </svg></a></li>
        </ul>
        <ul className="header-nav ms-3">
          <li className="nav-item dropdown"><Link className="nav-link py-0" data-coreui-toggle="dropdown" to="/logout" role="button" aria-haspopup="true" aria-expanded="false">
            <div className="avatar avatar-md">Đăng xuất</div>
          </Link>
          </li>
        </ul>
      </div>
      <div className="header-divider"></div>
      <div className="container-fluid">
        <nav aria-label="breadcrumb">

        </nav>
      </div>
    </header>
  )
};

export default HeaderAdmin;
