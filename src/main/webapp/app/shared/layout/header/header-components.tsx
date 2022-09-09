import React from 'react';
import { Translate } from 'react-jhipster';

import { NavItem, NavLink, NavbarBrand } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createTheme, createStyles, withStyles, makeStyles, Theme, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
  })
);

const ColorButton = withStyles((theme: Theme) => ({
  root: {
    backgroundColor: '#25436d',
    height: '2.5rem',
    borderRadius: '5rem',
    '& span': {
      color: 'white',
    },
    padding: '1px 10px !important',
    '&:hover': {
      backgroundColor: '#11294b',
    },
    textTransform: 'none'
  },
}))(Button);

export const BrandIcon = props => (
  <div {...props} className="brand-icon">
    <img src="content/images/logo.png" alt="Logo" />
  </div>
);

export const Brand = () => (
  <NavbarBrand tag={Link} to="/" className="brand-logo">
    <BrandIcon />
    <div className ="header-group-title">
      <span className="brand-title">
        HELLO ĐẤT VÀNG
      </span>
      <span className="navbar-version">Đồng hành đầu tư cùng chúng tôi</span>
    </div>
  </NavbarBrand>
);

export const Register = () => (
  <Link to="/" className = "text-decoration-a">
    <ColorButton disableRipple>
        <span>Đăng ký</span>
    </ColorButton>
  </Link>
);

export const Login = () => (
  <Link to="/login" className = "text-decoration-a mrl-05">
    <ColorButton disableRipple>
        <span>Đăng nhập</span>
    </ColorButton>
  </Link>
);

export const Post = () => (
  <Link to="/post" className = "text-decoration-a mrl-05">
    <ColorButton disableRipple>
        <span>Đăng tin</span>
    </ColorButton>
  </Link>
);
