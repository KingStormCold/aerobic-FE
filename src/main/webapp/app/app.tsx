import './app.scss';
import 'react-toastify/dist/ReactToastify.css';
import 'app/config/dayjs.ts';

import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import ErrorBoundary from 'app/shared/error/error-boundary';
import { AUTHORITIES } from 'app/config/constants';
import AppRoutes from 'app/routes';

const baseHref = document.querySelector('base').getAttribute('href').replace(/\/$/, '');
// toast.success("Welcome to datvang");

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // dispatch(getSession());
    // dispatch(getProfile());
  }, []);

  const currentLocale = useAppSelector(state => state.locale.currentLocale);
  const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);
  const isAdmin = useAppSelector(state => hasAnyAuthority(state.authentication.account.authorities, [AUTHORITIES.ADMIN]));
  // const ribbonEnv = useAppSelector(state => state.applicationProfile.ribbonEnv);
  // const isInProduction = useAppSelector(state => state.applicationProfile.inProduction);
  // const isOpenAPIEnabled = useAppSelector(state => state.applicationProfile.isOpenAPIEnabled);

  const [age, setAge] = React.useState('');

  const handleChange = event => {
    setAge(event.target.value);
  };

  return (
    <Router>
      <ErrorBoundary>
        <AppRoutes />
      </ErrorBoundary>
    </Router>
  );
};

export default App;
