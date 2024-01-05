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
import { getSubjectByGym, getSubjectByMeditate, getSubjectByYoga } from './shared/reducers/subject';

const baseHref = document.querySelector('base').getAttribute('href').replace(/\/$/, '');

export const App = () => {
  const dispatch = useAppDispatch();
  const token = Storage.local.get('jhi-authenticationToken') || Storage.session.get('jhi-authenticationToken');

  useEffect(() => {
    if (token) {
      dispatch(getSession());
    }
  }, [token]);

  async function callSubject() {
    await dispatch(getSubjectByMeditate({ content_search: 'meditate', page_size: 3 }))
    await dispatch(getSubjectByYoga({ content_search: 'yoga', page_size: 5 }))
    await dispatch(getSubjectByGym({ content_search: 'gym', page_size: 3 }))
  }
  useEffect(() => {
    callSubject()
  }, [])

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
