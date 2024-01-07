import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';
import { Storage } from 'react-jhipster';
import { Link, Redirect, RouteComponentProps, useHistory } from 'react-router-dom';
import './login.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TextField } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { Alert, Button } from 'reactstrap';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { forgotPassword, login } from 'app/shared/reducers/authentication';
import Loading from 'app/components/loading';
import { updateStateOpenToastMessage } from 'app/shared/reducers/toast-message';

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
  const loading = useAppSelector(state => state.authentication.loading);
  const forgotPasswordSuccess = useAppSelector(state => state.authentication.forgotPasswordSuccess);
  const forgotPasswordErrorMessage = useAppSelector(state => state.authentication.forgotPasswordErrorMessage);

  const [isRemember, setRemember] = React.useState(false);

  const [failByUsername, setFailByUsername] = React.useState(false);
  const [inputEmail, setInputEmail] = React.useState('');

  const [failByPassword, setFailByPassword] = React.useState(false);
  const [inputPassword, setInputPassword] = React.useState('');
  const roleAdmin = Storage.session.get('roleAdmin');
  const history = useHistory();

  useEffect(() => {
    const isRememberMe = Storage.local.get('isRememberMe', false);
    setRemember(isRememberMe);
    if (isRememberMe) {
      const username = Storage.local.get('USERNAME', '');
      setInputEmail(username);
    }
  }, []);

  const handleEmail = event => {
    setInputEmail(event.target.value);
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
      if (inputEmail === '') {
        setFailByUsername(true);
        setFailByPassword(false);
      } else if (inputPassword === '') {
        setFailByPassword(true);
        setFailByUsername(false);
      } else {
        setFailByPassword(false);
        const response = dispatch(login(inputEmail, inputPassword, isRemember));
        return;
      }
    }, 100);
    return;
  };

  useEffect(() => {
    if (forgotPasswordSuccess) {
      dispatch(
        updateStateOpenToastMessage({
          message: 'Forgot password link has been sent to your email. Please check your email',
          isError: false,
        })
      );
    }
  }, [forgotPasswordSuccess])

  useEffect(() => {
    if (forgotPasswordErrorMessage) {
      dispatch(
        updateStateOpenToastMessage({
          message: forgotPasswordErrorMessage,
          isError: true,
        })
      );
    }
  }, [forgotPasswordErrorMessage])

  const handleForgotPassword = () => {
    setFailByUsername(false);
    if (inputEmail === '') {
      setFailByUsername(true);
      return
    }
    dispatch(forgotPassword(inputEmail))
  }

  if (roleAdmin && isAuthenticated) {
    return <Redirect to="/admin" />
  } else if (!roleAdmin && isAuthenticated) {
    return <Redirect to="/" />
  }

  return (
    <>
      {loading && <Loading />}
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
                  <span>Incorrect account or password</span>
                </Alert>
              ) : null}
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              </Avatar>
              <Typography component="h1" variant="h5">
                Log in
              </Typography>
              <Box component="form" noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Email"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  onChange={handleEmail}
                  onKeyDown={handleKeyDownUsername}
                />
                {failByUsername && (
                  <div className="margin-top-05">
                    <FontAwesomeIcon icon="minus-circle" className="color-text-D70925" />
                    <span className="color-text-D70925">
                      Please enter your email.
                    </span>
                  </div>
                )}
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
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
                      Please enter your password.
                    </span>
                  </div>
                )}
                <br />
                <br />
                <Button id="register-submit" color="primary" onClick={handleSubmitLogin}>
                  Log in
                </Button>
                <br />
                <br />
                <Grid container sx={{ flexDirection: 'column', textAlign: 'center' }}>
                  <Grid item xs>
                    <span style={{ color: '#007bff', cursor: 'pointer' }} onClick={handleForgotPassword}>
                      Forgot your password?
                    </span>
                  </Grid>
                  <br />
                  <Grid item>
                    <Link to="/register">
                      Dont have an account yet? Register
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
};

export default Login;
