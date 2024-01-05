import ScrollToTopButton from 'app/components/ScrollToTopButton';
import React from 'react';
import './clientLayout.scss';
import Footer from './footer/footer';
import Header from './header/header';
import Menu from './menu/menu';
import PrivateRoute from 'app/shared/auth/private-route';
import detail from './subject/detail';
import search from './search/search';
import MyCourse from './my-course/my_course';
import { useAppSelector } from 'app/config/store';
import Video from './video/video';
import { Switch } from 'react-router-dom';
import ChangePass from '../login/change-pass';

const Routes = ({ match }) => {
  const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);
  return (
    <>
      <Header />
      <Menu />
      <Switch>
        <div className="main-layout">
          <>{<PrivateRoute exact path={`${match.url}subject`} component={detail} />}</>
          <>{<PrivateRoute exact path={`${match.url}search`} component={search} />}</>
          {isAuthenticated && <PrivateRoute exact path={`${match.url}my-course`} component={MyCourse} />}
          {isAuthenticated && <PrivateRoute exact path={`${match.url}my-course/videos`} component={Video} />}
        </div>
        <ScrollToTopButton />
      </Switch>
      <Footer />
    </>
  );
};

export default Routes;
