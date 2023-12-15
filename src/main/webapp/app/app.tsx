import 'app/config/dayjs.ts';
import 'react-toastify/dist/ReactToastify.css';
import './app.scss';

import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { useAppDispatch } from 'app/config/store';
import AppRoutes from 'app/routes';
import ErrorBoundary from 'app/shared/error/error-boundary';
import { getSession } from './shared/reducers/authentication';
import { ToastMessage } from './components/toast-message';

const baseHref = document.querySelector('base').getAttribute('href').replace(/\/$/, '');

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSession());
  }, []);

  return (
    <Router>
      <ErrorBoundary>
        <AppRoutes />
        <ToastMessage />
      </ErrorBoundary>
    </Router>
  );
};

export default App;
