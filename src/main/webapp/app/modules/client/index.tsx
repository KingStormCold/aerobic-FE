import ScrollToTopButton from 'app/components/ScrollToTopButton';
import React from 'react';
import './clientLayout.scss';
import Footer from './footer/footer';
import Header from './header/header';
import Menu from './menu/menu';

const Routes = ({ match }) => (
  <>
    <Header />
    <Menu />
    <div className='main-layout' >
      Home
    </div>
    <ScrollToTopButton />
    <Footer />
  </>
);

export default Routes;
