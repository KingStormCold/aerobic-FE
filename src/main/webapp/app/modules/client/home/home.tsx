import './home.scss';

import React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { Row, Col, Alert } from 'reactstrap';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Header from '../header/header';
import Footer from '../footer/footer';
import Menu from '../menu/menu';

export const Home = () => {
  return (
    <>
      <Header/>
      <Menu/>
      <Footer/>
    </>
  );
};

export default Home;
