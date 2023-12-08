// import './css/vendor/simplebar.css';
import './css/vendor/style.css';
import React from 'react';
import { Redirect, RouteComponentProps, BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { useAppSelector } from 'app/config/store';

const HeaderAdmin = () => {
  const name = useAppSelector(state => state.menu.headerName);
  const link = useAppSelector(state => state.menu.menuLink);
  const name2 = useAppSelector(state => state.menu.headerName2);
  const link2 = useAppSelector(state => state.menu.menuLink2);
  const name3 = useAppSelector(state => state.menu.headerName3);
  const link3 = useAppSelector(state => state.menu.menuLink3);
  const name4 = useAppSelector(state => state.menu.headerName4);
  const link4 = useAppSelector(state => state.menu.menuLink4);
  const name5 = useAppSelector(state => state.menu.headerName5);
  const link5 = useAppSelector(state => state.menu.menuLink5);
  const name6 = useAppSelector(state => state.menu.headerName6);
  const link6 = useAppSelector(state => state.menu.menuLink6);

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
          <ol className="breadcrumb my-0 ms-2">
            <Link to="/admin" className="breadcrumb-item" style={{ color: "#7a7a7a" }}>
              <span>Admin</span>
            </Link>
            <span>&nbsp;/&nbsp;</span>
            <Link to={link ? link : "#"}>
              <li className="breadcrumb-item active"><span>{name}</span></li>
            </Link>

            {
              name2 &&
              <>
                <span>&nbsp;/&nbsp;</span>
                <Link to={link2 ? link2 : "#"}>
                  <li className="breadcrumb-item active"><span>{name2}</span></li>
                </Link>
              </>
            }

            {
              name3 &&
              <>
                <span>&nbsp;/&nbsp;</span>
                <Link to={link3 ? link3 : "#"}>
                  <li className="breadcrumb-item active"><span>{name3}</span></li>
                </Link>
              </>
            }
            {
              name4 &&
              <>
                <span>&nbsp;/&nbsp;</span>
                <Link to={link4 ? link4 : "#"}>
                  <li className="breadcrumb-item active"><span>{name4}</span></li>
                </Link>
              </>
            }
            {
              name5 &&
              <>
                <span>&nbsp;/&nbsp;</span>
                <Link to={link5 ? link5 : "#"}>
                  <li className="breadcrumb-item active"><span>{name5}</span></li>
                </Link>
              </>
            }
            {
              name6 &&
              <>
                <span>&nbsp;/&nbsp;</span>
                <Link to={link6 ? link6 : "#"}>
                  <li className="breadcrumb-item active"><span>{name6}</span></li>
                </Link>
              </>
            }
          </ol>
        </nav>
      </div>
    </header>
  )
};

export default HeaderAdmin;
