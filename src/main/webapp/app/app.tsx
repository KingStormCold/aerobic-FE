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
import { Storage } from 'react-jhipster';

const baseHref = document.querySelector('base').getAttribute('href').replace(/\/$/, '');

export const App = () => {
  const dispatch = useAppDispatch();
  const token = Storage.local.get('jhi-authenticationToken') || Storage.session.get('jhi-authenticationToken');

  useEffect(() => {
    if (token) {
      dispatch(getSession());
    }
  }, [token]);

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
