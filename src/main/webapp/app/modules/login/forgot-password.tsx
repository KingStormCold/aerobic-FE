import React, { useEffect, useLayoutEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Loading from 'app/components/loading';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { changePass, changePasswordForgot, checkUuid } from 'app/shared/reducers/user';
// import './change-pass.scss';
import { useHistory } from 'react-router-dom';
import { URL_PATH } from 'app/config/path';
import { updateStateOpenToastMessage } from 'app/shared/reducers/toast-message';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

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
      ['@media (max-width:767px)']: {
        padding: '20px!important',
      },
    },
    muiOutlinedInputRoot: {
      '& fieldset': {
        borderColor: 'red !important',
      },
    },
  })
);

const theme = createTheme();

export const ForgotPassword = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const queryParameters = new URLSearchParams(window.location.search)
  const uuid = queryParameters.get("uuid")
  console.log('uuid', uuid)
  if (uuid === null || uuid === "") {
    history.push("/");
  }

  const checkUUIDSuccess = useAppSelector(state => state.user.checkUUIDSuccess);
  const loading = useAppSelector(state => state.user.loading);
  const changePasswordForgotErrorMessage = useAppSelector(state => state.user.changePasswordForgotErrorMessage);
  const changePasswordForgotSuccess = useAppSelector(state => state.user.changePasswordForgotSuccess);
  const userCheckUUID = useAppSelector(state => state.user.userCheckUUID);
  const [isHiddenPassword, setIsHiddenPassword] = React.useState(true);

  const forgotPassword = data => {
    dispatch(changePasswordForgot({ email: userCheckUUID?.email, password: data?.password, uuid }));
  };

  useEffect(() => {
    if (uuid !== null || uuid !== "") {
      dispatch(checkUuid(uuid))
    }
  }, [uuid])

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<{
    password: string;
    confirmPassword: string;
  }>();

  useEffect(() => {
    if (changePasswordForgotSuccess) {
      dispatch(
        updateStateOpenToastMessage({
          message: 'You have successfully changed your password',
          isError: false,
        })
      );
      history.push("/login");
    }
  }, [changePasswordForgotSuccess])

  useEffect(() => {
    if (changePasswordForgotErrorMessage) {
      dispatch(
        updateStateOpenToastMessage({
          message: changePasswordForgotErrorMessage,
          isError: true,
        })
      );
    }
  }, [changePasswordForgotErrorMessage])

  const handleShowPassword = () => {
    setIsHiddenPassword(!isHiddenPassword)
  }

  return (
    <>
      {loading && <Loading />}
      {checkUUIDSuccess ?

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
                  Forgot Password
                </Typography>
                <Form onSubmit={handleSubmit(forgotPassword)} className='form-layout'>
                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type={isHiddenPassword ? "password" : "text"}
                      {...register('password', {
                        required: 'Passwords is not empty',
                        minLength: {
                          value: 6,
                          message: 'Password must be at least 6 characters',
                        },
                      })}
                      isInvalid={!!errors.password}
                    />

                    <Box
                      position='relative'
                      component='div'
                      onClick={handleShowPassword}
                      sx={{
                        '&:hover': {
                          cursor: 'pointer'
                        },
                        float: 'right',
                        top: '-30px',
                        right: '10px'
                      }}
                    >
                      {isHiddenPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </Box>
                    {errors.password && (
                      <Card.Text as="div" className='error-text'>{errors.password.message}</Card.Text>
                    )}
                  </Form.Group>

                  {/* Confirm Password */}
                  <Form.Group className="mb-3">
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control
                      type="password"
                      {...register('confirmPassword', {
                        required: 'Confirm password is not empty',
                        validate: {
                          incorrectPassword: (value) => value === getValues('password') || 'Passwords dont match each other',
                        }
                      })}
                      isInvalid={!!errors.confirmPassword}
                    />
                    <Box
                      position='relative'
                      component='div'
                      onClick={handleShowPassword}
                      sx={{
                        '&:hover': {
                          cursor: 'pointer'
                        },
                        float: 'right',
                        top: '-30px',
                        right: '10px'
                      }}
                    >
                      {isHiddenPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </Box>
                    {errors.confirmPassword && (
                      <Card.Text as="div" className='error-text'>{errors.confirmPassword.message}</Card.Text>
                    )}
                  </Form.Group>
                  {/* {registerUserErrorMessgae && (
                  <Card.Text as="div" className='error-text'>{registerUserErrorMessgae}</Card.Text>
                )} */}
                  <Button type='submit' variant="success" className='btn-right'>Submit</Button>
                </Form>
              </Box>
            </Grid>
          </Grid>
        </ThemeProvider >
        :
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
            <Typography component="h1" variant="h5">
              Please wait a second
            </Typography>
          </Box>
        </Grid>
      }
    </>
  );
};

export default ForgotPassword;
