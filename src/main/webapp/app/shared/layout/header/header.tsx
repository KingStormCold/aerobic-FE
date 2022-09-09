import './header.scss';

import React, { useState } from 'react';
import { Translate, Storage } from 'react-jhipster';
import { Navbar, Nav, NavbarToggler, Collapse } from 'reactstrap';
import LoadingBar from 'react-redux-loading-bar';

import { Register, Brand, Login, Post } from './header-components';
import { AdminMenu, EntitiesMenu, AccountMenu, LocaleMenu } from '../menus';
import { useAppDispatch } from 'app/config/store';
import { setLocale } from 'app/shared/reducers/locale';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  currentLocale: string;
}

const Header = (props: IHeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const dispatch = useAppDispatch();

  const handleLocaleChange = event => {
    const langKey = event.target.value;
    Storage.session.set('locale', langKey);
    dispatch(setLocale(langKey));
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  /* jhipster-needle-add-element-to-menu - JHipster will add new menu items here */

  return (
    <header className="">
      <nav>
        <div className="container">
          <div className="relative d-lg-flex ">
            <div className="header-content clearfix a-center">
              <div className="logo inline-block">
                <a href="/" className="logo-wrapper ">
                  <img width="164" height="36" src="//bizweb.dktcdn.net/100/311/377/themes/861480/assets/logo.png?1652897591428" alt="logo " />
                </a>
              </div>
            </div>
            <div className="hidden-sm hidden-xs flex-grow-1">
              <ul className="nav nav-left">
                <li className="nav-item active">
                  <a title="Trang chủ" className="nav-link" href="/">
                    <span className="icon" style={{ backgroundImage: "url('//bizweb.dktcdn.net/100/311/377/themes/861480/assets/menu-icon-3.png?1652897591428')" }}></span>
                    <span>Trang chủ</span>
                  </a>
                </li>
                <li className="nav-item  has-mega">
                  <a title="Sản phẩm" href="/collections/all" className="nav-link">
                    <span className="icon" style={{ backgroundImage: "url('//bizweb.dktcdn.net/100/311/377/themes/861480/assets/menu-icon-3.png?1652897591428')" }}></span>
                    <span>Sản phẩm</span> <i className="fa fa-angle-down" data-toggle="dropdown"></i>
                  </a>
                  <div className="mega-content">
                    <div className="level0-wrapper2">
                      <div className="nav-block nav-block-center">
                        <ul className="level0">
                          <li className="level1 parent item">
                            <h2 className="h4"><a href="/collections/all"><span>Giày cao gót</span></a></h2>
                            <ul className="level1">
                              <li className="level2"> <a href="/collections/all" title="Giày cao gót 5cm">Giày cao gót 5cm</a> </li>
                              <li className="level2"> <a href="/collections/all" title="Giày cao gót 10cm">Giày cao gót 10cm</a> </li>
                              <li className="level2"> <a href="/collections/all" title="Giày cao gót 15cm">Giày cao gót 15cm</a> </li>
                              <li className="level2"> <a href="/collections/all" title="Giày cao gót 20cm">Giày cao gót 20cm</a> </li>
                            </ul>
                          </li>
                          <li className="level1 parent item">
                            <h2 className="h4"><a href="/collections/all"><span>Giày xăng đan</span></a></h2>
                            <ul className="level1">
                              <li className="level2"> <a href="/collections/all" title="Giày xăng đan loại 1">Giày xăng đan loại 1</a> </li>
                              <li className="level2"> <a href="/collections/all" title="Giày xăng đan loại 2">Giày xăng đan loại 2</a> </li>
                              <li className="level2"> <a href="/collections/all" title="Giày xăng đan loại 3">Giày xăng đan loại 3</a> </li>
                              <li className="level2"> <a href="/collections/all" title="Giày xăng đan loại 4">Giày xăng đan loại 4</a> </li>
                            </ul>
                          </li>
                          <li className="level1 parent item">
                            <h2 className="h4"><a href="/collections/all"><span>Giày búp bê</span></a></h2>
                            <ul className="level1">
                              <li className="level2"> <a href="/collections/all" title="Giày búp bê loại 1">Giày búp bê loại 1</a> </li>
                              <li className="level2"> <a href="/collections/all" title="Giày búp bê loại 2">Giày búp bê loại 2</a> </li>
                              <li className="level2"> <a href="/collections/all" title="Giày búp bê loại 3">Giày búp bê loại 3</a> </li>
                              <li className="level2"> <a href="/collections/all" title="Giày búp bê loại 4">Giày búp bê loại 4</a> </li>
                            </ul>
                          </li>
                          <li className="level1 parent item">
                            <h2 className="h4"><a href="/collections/all"><span>Túi xách</span></a></h2>
                            <ul className="level1">
                              <li className="level2"> <a href="/collections/all" title="Túi xách loại 1">Túi xách loại 1</a> </li>
                              <li className="level2"> <a href="/collections/all" title="Túi xách loại 2">Túi xách loại 2</a> </li>
                              <li className="level2"> <a href="/collections/all" title="Túi xách loại 3">Túi xách loại 3</a> </li>
                              <li className="level2"> <a href="/collections/all" title="Túi xách loại 4">Túi xách loại 4</a> </li>
                            </ul>
                          </li>
                          <li className="level1 item">
                            <h2 className="h4"><a title="Sản phẩm hot" href="/san-pham-hot">Sản phẩm hot</a> </h2>
                          </li>
                          <li className="level1 item">
                            <h2 className="h4"><a title="Sản phẩm nổi bật" href="/san-pham-noi-bat">Sản phẩm nổi bật</a> </h2>
                          </li>
                          <li className="level1 item">
                            <h2 className="h4"><a title="Sản phẩm khuyến mãi" href="/san-pham-khuyen-mai">Sản phẩm khuyến mãi</a> </h2>
                          </li>
                          <li className="level1 item">
                            <h2 className="h4"><a title="Sản phẩm mới" href="/san-pham-moi">Sản phẩm mới</a> </h2>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="nav-item ">
                  <a title="Giới thiệu" className="nav-link" href="/gioi-thieu">
                    <span className="icon" style={{ backgroundImage: "url('//bizweb.dktcdn.net/100/311/377/themes/861480/assets/menu-icon-3.png?1652897591428')" }}></span>
                    <span>Giới thiệu</span>
                  </a>
                </li>
                <li className="nav-item ">
                  <a title="Tin tức" href="/tin-tuc" className="nav-link">
                    <span className="icon" style={{ backgroundImage: "url('//bizweb.dktcdn.net/100/311/377/themes/861480/assets/menu-icon-3.png?1652897591428')" }}></span>
                    <span>Tin tức</span> <i className="fa fa-angle-down" data-toggle="dropdown"></i>
                  </a>
                  <ul className="dropdown-menu">
                    <li className="dropdown-submenu nav-item-lv2">
                      <a className="nav-link" href="/tin-tuc">Tin mới <i className="fa fa-angle-right"></i></a>
                      <ul className="dropdown-menu">
                        <li className="nav-item-lv3">
                          <a className="nav-link" href="/tin-tuc">Mới nhất</a>
                        </li>
                        <li className="nav-item-lv3">
                          <a className="nav-link" href="/tin-tuc">Tin quốc tế</a>
                        </li>
                      </ul>
                    </li>
                    <li className="nav-item-lv2">
                      <a className="nav-link" href="/tin-tuc">Tin thời trang</a>
                    </li>
                    <li className="nav-item-lv2">
                      <a className="nav-link" href="/tin-tuc">Tin hot</a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item ">
                  <a title="Liên hệ" className="nav-link" href="/lien-he">
                    <span className="icon" style={{ backgroundImage: "url('//bizweb.dktcdn.net/100/311/377/themes/861480/assets/menu-icon-3.png?1652897591428')" }}></span>
                    <span>Liên hệ</span>
                  </a>
                </li>
                <li className="nav-item ">
                  <a title="Chỉ đường" className="nav-link" href="/he-thong-dai-ly">
                    <span className="icon" style={{ backgroundImage: "url('//bizweb.dktcdn.net/100/311/377/themes/861480/assets/menu-icon-3.png?1652897591428')" }}></span>
                    <span>Chỉ đường</span>
                  </a>
                </li>
              </ul>
              <div className='top-cart-contain f-right'>
                <div className="mini-cart text-xs-center">
                  <div className="heading-cart">
                    <a href="/cart">
                      <div className="icon f-left relative">
                        <i className='fa fa-shopping-bag'></i>
                        <span className="cartCount count_item_pr" id="cart-total">0</span>
                      </div>
                      <div className="right-content">
                        <span className="label">Giỏ hàng</span>
                        (<span className="cartCount2">0</span>) sản phẩm
                      </div>
                    </a>
                  </div>
                  <div className="top-cart-content hidden-md hidden-sm hidden-xs">
                    <ul id="cart-sidebar" className="mini-products-list count_li">
                      <div className="no-item">
                        <p>Không có sản phẩm nào trong giỏ hàng.</p>
                      </div>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
