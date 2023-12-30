import ScrollToTopButton from 'app/components/ScrollToTopButton';
import React from 'react';
import './clientLayout.scss';
import Footer from './footer/footer';
import Header from './header/header';
import Menu from './menu/menu';
import PrivateRoute from 'app/shared/auth/private-route';
import { URL_PATH } from 'app/config/path';
import detail from './subject/detail';
import { Switch } from 'react-router-dom';

const Routes = ({ match }) => (
  <>
    <Header />
    <Menu />
    <Switch>
      <div className="main-layout">
        <>{<PrivateRoute exact path={`${match.url}subject`} component={detail} />}</>
      </div>
      <ScrollToTopButton />
    </Switch>
    <Footer />
  </>
);

export default Routes;
