import './header.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import React from 'react';

const Header = () => (
    <>
        <div className='header'>
            <div className='header-content'>
                <div className='header-image'>
                    <img src="content/images/client.png" />
                </div>
                <div className = 'header-cart'>
                    <FontAwesomeIcon icon="shopping-bag" />
                </div>
                <div className = "header-vertical-line"></div>
                <div className = 'header-user'>
                    <span className='header-user-icon'>
                        <FontAwesomeIcon icon="user"/>
                    </span>
                    <div className='header-account-content'>
                        <div className='btn'>
                            <div className='account-btnsignin'>
                                Đăng ký
                            </div>
                            <span>/</span>
                            <div className='account-btnlogin'>
                                Đăng nhập
                            </div>
                        </div>
                        <div className='user-name'>
                            Thành viên
                        </div>
                    </div>
                </div>
                   
                <div className = "header-vertical-line"></div>

                <div className = 'header-hotline'>
                        <span className='header-hotline-icon'>
                            <FontAwesomeIcon className='fa-solid' icon="phone" />
                        </span>
                        <div className='header-hotline-content'>                          
                            <div className='hotline-text'>
                                Hotline hỗ trợ
                            </div>
                            <div className='hotline-number'>
                                1800 1234
                            </div>
                        </div>
                </div>
                
                <div className = 'header-search'>
                    <div className='header-search-box'>
                        <input type="text" placeholder="Search.."></input>
                        <FontAwesomeIcon icon="search" className='header-search-icon'/>
                    </div>
                    <div>
                        <span>Iphone13</span>
                        <span>GalaxyA</span>
                        <span>Laptop</span>
                        <span>Tablet</span>
                    </div>
                </div>
            </div>
        </div>
    </>
)

export default Header;
