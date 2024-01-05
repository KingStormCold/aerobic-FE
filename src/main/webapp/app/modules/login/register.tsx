import React, { useEffect, useLayoutEffect } from 'react';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { login } from 'app/shared/reducers/authentication';
import Loading from 'app/components/loading';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ICreateUser, IRegisterUser } from 'app/shared/model/user';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { createUser, registerUser } from 'app/shared/reducers/user';
import './register.scss';
import { useHistory } from 'react-router-dom';
import { URL_PATH } from 'app/config/path';
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

export const Register = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const registerUserSuccess = useAppSelector(state => state.user.registerUserSuccess);
  const registerUserErrorMessgae = useAppSelector(state => state.user.registerUserErrorMessgae);
  const loading = useAppSelector(state => state.user.loading);
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors }
  } = useForm<{
    email: string;
    fullname: string;
    password: string;
    confirmPassword: string;
    phone: number;
  }>();

  const addUser = (data) => {
    const requestBody = {
      user_email: data?.email,
      user_password: data?.password,
      user_phone: data?.phone,
      user_fullname: data?.fullname
    } as IRegisterUser
    dispatch(registerUser(requestBody))
  }

  useEffect(() => {
    if (registerUserSuccess) {
      dispatch(updateStateOpenToastMessage({ message: 'Đăng ký người dùng thành công', isError: false }));
      history.push(URL_PATH.LOGIN);
    }
  }, [registerUserSuccess])

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
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              </Avatar>
              <Typography component="h1" variant="h5">
                Đăng ký tài khoản
              </Typography>
              <Form onSubmit={handleSubmit(addUser)} className='form-layout'>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    {...register('email', {
                      required: 'Email không được trống',
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Email phải đúng định dạng',
                      },
                    })}
                    isInvalid={!!errors.email}
                  />
                  {errors.email && (
                    <Card.Text as="div" className='error-text'>{errors.email.message}</Card.Text>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Họ và tên</Form.Label>
                  <Form.Control
                    type="text"
                    {...register('fullname', {
                      required: 'Họ và tên không được trống',
                    })}
                    isInvalid={!!errors.fullname}
                  />
                  {errors.fullname && (
                    <Card.Text as="div" className='error-text'>{errors.fullname.message}</Card.Text>
                  )}
                </Form.Group>

                {/* Password */}
                <Form.Group className="mb-3">
                  <Form.Label>Mật khẩu</Form.Label>
                  <Form.Control
                    type="password"
                    {...register('password', {
                      required: 'Mật khẩu không được trống',
                      minLength: {
                        value: 6,
                        message: 'Mật khẩu phải ít nhất 6 kí tự',
                      },
                    })}
                    isInvalid={!!errors.password}
                  />
                  {errors.password && (
                    <Card.Text as="div" className='error-text'>{errors.password.message}</Card.Text>
                  )}
                </Form.Group>

                {/* Confirm Password */}
                <Form.Group className="mb-3">
                  <Form.Label>Xác nhận mật khẩu</Form.Label>
                  <Form.Control
                    type="password"
                    {...register('confirmPassword', {
                      required: 'Xác nhận mật khẩu không được trống',
                      validate: {
                        incorrectPassword: (value) => value === getValues('password') || 'Mật khẩu không trùng với nhau',
                      }
                    })}
                    isInvalid={!!errors.confirmPassword}
                  />
                  {errors.confirmPassword && (
                    <Card.Text as="div" className='error-text'>{errors.confirmPassword.message}</Card.Text>
                  )}
                </Form.Group>

                {/* Phone */}
                <Form.Group className="mb-3">
                  <Form.Label>Số điện thoại</Form.Label>
                  <Form.Control
                    type="text"
                    {...register('phone', {
                      required: 'Số điện thoại không được trống',
                      pattern: {
                        value: /^[0-9]{10}$/i,
                        message: 'Số điện thoại không hợp lệ',
                      },
                    })}
                    isInvalid={!!errors.phone}
                  />
                  {errors.phone && (
                    <Card.Text as="div" className='error-text'>{errors.phone.message}</Card.Text>
                  )}
                </Form.Group>
                {registerUserErrorMessgae && (
                  <Card.Text as="div" className='error-text'>{registerUserErrorMessgae}</Card.Text>
                )}
                <Button type='submit' variant="success" className='btn-right'>Đăng ký</Button>
              </Form>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  )
};

export default Register;