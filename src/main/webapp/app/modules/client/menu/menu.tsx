import './menu.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
  } from 'reactstrap';

import React from 'react';

const Menu = () => (
    <>
        <div className='menu'>
            <div className="menu-dropdown">
                <button className="menu-dropbtn"><FontAwesomeIcon icon="mobile"/> Dropdown</button>
                <div className="menu-dropdown-content">
                    <a href="#">Link 1</a>
                    <a href="#">Link 2</a>
                    <a href="#">Link 3</a>
                </div>
                <button className="menu-dropbtn"><FontAwesomeIcon icon="mobile"/> Dropdown</button>
                <div className="menu-dropdown-content">
                    <a href="#">Link 1</a>
                    <a href="#">Link 2</a>
                    <a href="#">Link 3</a>
                </div>
                <button className="menu-dropbtn"><FontAwesomeIcon icon="mobile"/> Dropdown</button>
                <div className="menu-dropdown-content">
                    <a href="#">Link 1</a>
                    <a href="#">Link 2</a>
                    <a href="#">Link 3</a>
                </div>
                <button className="menu-dropbtn"><FontAwesomeIcon icon="mobile"/> Dropdown</button>
                <div className="menu-dropdown-content">
                    <a href="#">Link 1</a>
                    <a href="#">Link 2</a>
                    <a href="#">Link 3</a>
                </div>
            </div>
            <div className='menu-function'>
                <div className='menu-function-content'>
                    <FontAwesomeIcon icon="shopping-bag" /> 
                    <div className='menu-function-content-text'>Trả góp<br/></div>
                </div>
                <div className='menu-function-content'>
                    <FontAwesomeIcon icon="shopping-bag" />
                    <div className='menu-function-content-text'>Mua cũ<br/>đổi mới</div>
                </div>
                <div className='menu-function-content'>
                    <FontAwesomeIcon icon="shopping-bag" /> 
                    <div className='menu-function-content-text'>Công nghệ<br/>24h</div>
                </div>
                <div className='menu-function-content'>
                    <div className='menu-function-content-text'>Khuyến mãi<br/>tháng 10</div>
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
