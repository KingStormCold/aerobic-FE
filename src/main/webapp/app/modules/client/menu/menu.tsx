import './menu.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import React from 'react';

const Menu = () => (
    <>
        <div className='menu'>
            <div className='menu-hover'>
                <div className="menu-dropdown">
                    <button className="menu-dropbtn"><FontAwesomeIcon icon="mobile"/> Điện thoại</button>
                    <div className="menu-dropdown-content">
                        <a href="#">Link 1</a>
                        <a href="#">Link 2</a>
                        <a href="#">Link 3</a>
                    </div>
                </div>
                <div className="menu-dropdown">
                    <button className="menu-dropbtn"><FontAwesomeIcon icon="mobile"/> Apple (AAR)</button>
                    <div className="menu-dropdown-content">
                        <div>
                            <a href="#">Link 1</a>
                            <a href="#">Link 2</a>
                            <a href="#">Link 3</a>
                        </div>
                        <div>
                            <a href="#">Link 1</a>
                            <a href="#">Link 2</a>
                            <a href="#">Link 3</a>
                        </div>
                    </div>
                </div>
                <div className="menu-dropdown">
                    <button className="menu-dropbtn"><FontAwesomeIcon icon="mobile"/> Laptop & Tablet</button>
                    <div className="menu-dropdown-content">
                        <a href="#">Link 1</a>
                        <a href="#">Link 2</a>
                        <a href="#">Link 3</a>
                    </div>
                </div>
                <div className="menu-dropdown">
                    <button className="menu-dropbtn"><FontAwesomeIcon icon="mobile"/> Âm thanh</button>
                    <div className="menu-dropdown-content">
                        <a href="#">Link 1</a>
                        <a href="#">Link 2</a>
                        <a href="#">Link 3</a>
                    </div>
                </div>
                <div className="menu-dropdown">
                    <button className="menu-dropbtn"><FontAwesomeIcon icon="mobile"/> Phụ kiện</button>
                    <div className="menu-dropdown-content">
                        <div>
                            <a href="#">Link 1</a>
                            <a href="#">Link 2</a>
                            <a href="#">Link 3</a>
                        </div>
                        <div>
                            <a href="#">Link 1</a>
                            <a href="#">Link 2</a>
                            <a href="#">Link 3</a>
                        </div>
                    </div>
                </div>
                <div className="menu-dropdown">
                    <button className="menu-dropbtn"><FontAwesomeIcon icon="mobile"/> Thế giới máy cũ</button>
                    <div className="menu-dropdown-content">
                        <a href="#">Link 1</a>
                        <a href="#">Link 2</a>
                        <a href="#">Link 3</a>
                    </div>
                </div>
            </div>
            <div className='menu-function'>
                <div className='menu-function-content'>                
                    <div className='menu-function-content-text'>Trả góp</div>
                </div>
                <div className='menu-function-content'>
                    <div className='menu-function-content-text'>Mua cũ đổi mới</div>
                </div>
                <div className='menu-function-content'>
                    <div className='menu-function-content-text'>Công nghệ 24h</div>
                </div>
            </div>
            {/* <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={direction}>
                <DropdownToggle caret>Dropdown</DropdownToggle>
                <DropdownMenu {...args}>
                <DropdownItem header>Header</DropdownItem>
                <DropdownItem>Some Action</DropdownItem>
                <DropdownItem text>Dropdown Item Text</DropdownItem>
                <DropdownItem disabled>Action (disabled)</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Foo Action</DropdownItem>
                <DropdownItem>Bar Action</DropdownItem>
                <DropdownItem>Quo Action</DropdownItem>
                </DropdownMenu>
            </Dropdown> */}
        </div>
    </>
)

export default Menu;
