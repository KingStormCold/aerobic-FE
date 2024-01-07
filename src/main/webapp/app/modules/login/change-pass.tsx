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
import { changePass } from 'app/shared/reducers/user';
// import './change-pass.scss';
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

export const ChangePassWord = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const changePassSuccess = useAppSelector(state => state.user.changePassSuccess);
  const changePassErrorMessage = useAppSelector(state => state.user.changePassErrorMessage);
  const loading = useAppSelector(state => state.user.loading);

  const addUser = data => {
    const requestBody = {
      old_password: data?.old_password,
      new_password: data?.new_password,
      new_password_confirmation: data?.new_password_confirmation,
    };
    dispatch(changePass(requestBody));
  };

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<{
    old_password: string;
    new_password: string;
    new_password_confirmation: string;
  }>();

  useEffect(() => {
    if (changePassSuccess) {
      dispatch(
        updateStateOpenToastMessage({ message: 'You have successfully changed your password, please log in again to continue', isError: false })
      );
      history.push(URL_PATH.LOGOUT);
    }
  }, [changePassSuccess]);

  useEffect(() => {
    if (changePassErrorMessage) {
      dispatch(updateStateOpenToastMessage({ message: changePassErrorMessage, isError: true }));
    }
  }, [changePassErrorMessage]);

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
              backgroundColor: t => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
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
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
              <Typography component="h1" variant="h5">
                Change password
              </Typography>

              <Form onSubmit={handleSubmit(addUser)} className="form-layout">
                <Form.Group className="mb-3">
                  <Form.Label>Old password</Form.Label>
                  <Form.Control
                    type="password"
                    {...register('old_password', {
                      required: 'Password is not empty',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters',
                      },
                    })}
                    isInvalid={!!errors.old_password}
                  />
                  {errors.old_password && (
                    <Card.Text as="div" className="error-text">
                      {errors.old_password.message}
                    </Card.Text>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>New password</Form.Label>
                  <Form.Control
                    type="password"
                    {...register('new_password', {
                      required: 'Passwords is not empty',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters',
                      },
                    })}
                    isInvalid={!!errors.new_password}
                  />
                  {errors.new_password && (
                    <Card.Text as="div" className="error-text">
                      {errors.new_password.message}
                    </Card.Text>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Confirm new password</Form.Label>
                  <Form.Control
                    type="password"
                    {...register('new_password_confirmation', {
                      required: 'Confirm new password is not empty',
                      validate: {
                        incorrectPassword: value => value === getValues('new_password') || 'Password do not match',
                      },
                    })}
                    isInvalid={!!errors.new_password_confirmation}
                  />
                  {errors.new_password_confirmation && (
                    <Card.Text as="div" className="error-text">
                      {errors.new_password_confirmation.message}
                    </Card.Text>
                  )}
                </Form.Group>

                <Button type="submit" variant="success" className="btn-right">
                  Change
                </Button>
              </Form>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
};

export default ChangePassWord;
