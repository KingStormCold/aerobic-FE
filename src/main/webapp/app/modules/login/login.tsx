import './login.scss';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect, RouteComponentProps, BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Storage, translate } from 'react-jhipster';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { Checkbox, FormControl, FormControlLabel, TextField } from '@material-ui/core';
import { Card } from 'reactstrap';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Alert, Row, Col, Form } from 'reactstrap';
import { Translate } from 'react-jhipster';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { login } from 'app/shared/reducers/authentication';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import HealthPage from 'app/modules/administration/health/health';

import { REX } from 'app/config/constants';

const useStylesMenu = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      borderRadius: '27px',
    },
    colorRed: {
      color: '#b30000',
    },
    svg: {
      color: 'black',
    },
    forgotPassword: {
      color: '#2071CE',
    },
    textCenter: {
      textAlign: 'center',
      '& a': {
        color: '#2071CE',
      },
    },
    boxShadow: {
      boxShadow: '4px 3px 10px #dee2e6',
      borderRadius: '18px',
      padding: '3rem !important',
      ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
        padding: '20px!important'
      }
    },
    muiOutlinedInputRoot: {
      '& fieldset': {
        borderColor: 'red !important',
      },
    },
  })
);

const theme = createTheme();

export const Login = (props: RouteComponentProps<any>) => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);
  const loginError = useAppSelector(state => state.authentication.loginError);

  const [isRemember, setRemember] = React.useState(false);

  const [failByUsername, setFailByUsername] = React.useState(false);
  const [inputUsername, setInputUsername] = React.useState('');

  const [failByPassword, setFailByPassword] = React.useState(false);
  const [inputPassword, setInputPassword] = React.useState('');
  const roleAdmin = Storage.session.get('roleAdmin');

  useEffect(() => {
    const isRememberMe = Storage.local.get('isRememberMe', false);
    setRemember(isRememberMe);
    if (isRememberMe) {
      const username = Storage.local.get('USERNAME', '');
      setInputUsername(username);
    }
  }, []);

  const handleUserName = event => {
    setInputUsername(event.target.value);
  };

  const handlePassword = event => {
    setInputPassword(event.target.value);
  };

  const handleKeyDownUsername = event => {
    if (event.key === 'Enter') {
      handleSubmitLogin();
    }
  };

  const handleKeyDownPassword = event => {
    if (event.key === 'Enter') {
      handleSubmitLogin();
    }
  };

  const handleSubmitLogin = () => {
    setTimeout(() => {
      if (inputUsername === '') {
        setFailByUsername(true);
        setFailByPassword(false);
      } else if (inputPassword === '') {
        setFailByPassword(true);
        setFailByUsername(false);
      } else {
        setFailByPassword(false);
        const response = dispatch(login(inputUsername, inputPassword, isRemember));
        return;
      }
    }, 100);
    return;
  };

  return (
    <>
      {roleAdmin && isAuthenticated && (
        <Redirect to="/admin" />
      )}
      {!roleAdmin && isAuthenticated && (
        <Redirect to="/" />
      )}
      {!isAuthenticated && (
        <ThemeProvider theme={theme}>
          <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
              item
              xs={false}
              sm={4}
              md={7}
              sx={{
                backgroundImage: 'url(https://source.unsplash.com/random)',
                backgroundRepeat: 'no-repeat',
                backgroundColor: (t) =>
                  t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                {loginError ? (
                  <Alert color="danger" data-cy="loginError">
                    <span>Tài khoản hoặc mật khẩu không đúng</span>
                  </Alert>
                ) : null}
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                </Avatar>
                <Typography component="h1" variant="h5">
                  Đăng nhập
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Tài khoản"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    onChange={handleUserName}
                    onKeyDown={handleKeyDownUsername}
                  />
                  {failByUsername && (
                    <div className="margin-top-05">
                      <FontAwesomeIcon icon="minus-circle" className="color-text-D70925" />
                      <span className="color-text-D70925">
                        Vui lòng nhập tài khoản.
                      </span>
                    </div>
                  )}
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Mật khẩu"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={handlePassword}
                    onKeyDown={handleKeyDownPassword}
                  />
                  {failByPassword && (
                    <div className="margin-top-05">
                      <FontAwesomeIcon icon="minus-circle" className="color-text-D70925" />
                      <span className="color-text-D70925">
                        Vui lòng nhập mật khẩu.
                      </span>
                    </div>
                  )}
                  <br />
                  <br />
                  <Button id="register-submit" color="primary" onClick={handleSubmitLogin}>
                    Đăng nhập
                  </Button>
                  <br />
                  <br />
                  <Grid container>
                    <Grid item xs>
                      <Link to="/login">
                        Quên mật khẩu?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link to="/login">
                        Bạn chưa có tài khoản? Đăng ký
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </ThemeProvider>
      )}
    </>
  );
};

export default Login;
