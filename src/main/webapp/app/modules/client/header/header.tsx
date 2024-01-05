import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './header.scss';

import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Search from 'app/components/search';
import { useAppSelector } from 'app/config/store';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const Header = () => {
  const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);
  const account = useAppSelector(state => state.authentication.account);
  const history = useHistory();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <div className="header-client">
        <div className="header-content">
          <div className="header-image" onClick={() => history.push('/')}>
            <img src="content/images/aerobic.png" className="header-image-img" />
            <span className="header-logo-text"> Aerobic</span>
          </div>

          <Search />

          <div className="header-hotline">
            <span className="header-hotline-icon">
              <FontAwesomeIcon className="fa-solid" icon="phone" />
            </span>
            <div className="header-hotline-content">
              <div className="hotline-text">
                <Link className="hotline-link" to="/hotline">
                  Hotline hỗ trợ
                </Link>
              </div>
              <a className="hotline-number" href="tel:0927346666">
                0927346666
              </a>
            </div>
          </div>

          <div className="header-user">
            {isAuthenticated && (
              <span className="header-user-icon">
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <FontAwesomeIcon icon="user" />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  sx={{
                    li: {
                      a: {
                        textDecoration: 'none',
                        color: 'black',
                        width: '100%',
                        textAlign: 'center',
                      },
                    },
                  }}
                >
                  <MenuItem>
                    <Link className="nav-link" to="/change-password">
                      Thay đổi mật khẩu
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link className="nav-link" to="/my-course">
                      Khóa học của tôi
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link className="nav-link" to="/history-payment">
                      Lịch sử giao dịch
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to="/logout" className="nav-link">
                      Đăng xuất
                    </Link>
                  </MenuItem>
                </Menu>
              </span>
            )}

            <div className="header-account-content">
              <div className="header-btn">
                {!isAuthenticated && (
                  <>
                    <div className="account-btnsignin">
                      <Link to="/register" className="header-link">
                        Đăng ký
                      </Link>
                    </div>
                    <div className="account-btnlogin">
                      <Link to="/login" className="header-link">
                        Đăng nhập
                      </Link>
                    </div>
                  </>
                )}
              </div>
              {isAuthenticated && (
                <>
                  <div className="user-name">Xin chào</div>
                  <div className="user-name">{account?.data?.fullname}</div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
