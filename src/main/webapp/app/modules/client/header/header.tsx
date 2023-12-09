import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './header.scss';

import RightSideBar from 'app/components/rightSideBar';
import { useAppSelector } from 'app/config/store';
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Search from 'app/components/search';

const Header = () => {
  const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);
  const history = useHistory();

  const loginLogout = () => {
    if (!isAuthenticated) {
      return (
        <Link to="/login" className='header-link'>
          Đăng nhập
        </Link>
      );
    } else {
      return (
        <Link to="/logout" className='header-link'>
          Đăng xuất
        </Link>
      );
    }
  };
  return (
    <>
      <div className='header-client'>
        <div className='header-content'>
          <div className='header-image' onClick={() => history.push("/")}>
            <img src="content/images/aerobic.png" className='header-image-img' />
            <span className='header-logo-text'> Aerobic</span>
          </div>

          <Search />

          <div className='header-hotline'>
            <span className='header-hotline-icon'>
              <FontAwesomeIcon className='fa-solid' icon="phone" />
            </span>
            <div className='header-hotline-content'>
              <div className='hotline-text'>
                <Link className='hotline-link' to="/hotline">
                  Hotline hỗ trợ
                </Link>
              </div>
              <a className='hotline-number' href="tel:0927346666">
                0927346666
              </a>
            </div>
          </div>

          <div className='header-user'>
            <span className='header-user-icon'>
              <FontAwesomeIcon icon="user" />
            </span>
            <div className='header-account-content'>
              <div className='header-btn'>
                <div className='account-btnsignin'>
                  Đăng ký
                </div>
                <span>/</span>
                <div className='account-btnlogin'>
                  {loginLogout()}
                </div>
              </div>
              <div className='user-name'>
                Thành viên
              </div>
            </div>
          </div>

          <div className='header-cart'>
            {/* <FontAwesomeIcon icon="shopping-bag" /> */}
            <img src='content/images/header_cart.png' className='header-cart-img'></img>
          </div>
          <RightSideBar />
        </div>
      </div>
      {/* <div
                dangerouslySetInnerHTML={{
                    __html: ZaloChat
                }}
            /> */}
      {/* <div
                dangerouslySetInnerHTML={{
                    __html: MessengerChat
                }}
            /> */}
    </>
  );
}

export default Header;
