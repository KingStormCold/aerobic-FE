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

import { useAppSelector } from 'app/config/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import CountUp, { useCountUp } from 'react-countup';

export const Home = () => {
  const account = useAppSelector(state => state.authentication.account);

  const [age, setAge] = React.useState('');
  const [timeInfoCustomer, setTimeInfoCustomer] = React.useState(false);
  const [timeInfoNews, setTimeInfoNews] = React.useState(false);
  const [timeInfoLuotXem, setTimeInfoLuotXem] = React.useState(false);
  const [isShowAdd, setIsShowAdd] = React.useState(false);

  const handleChange = event => {
    setAge(event.target.value);
  };

  setTimeout(() => {
    setTimeInfoCustomer(true);
  }, 1000);

  setTimeout(() => {
    setTimeInfoNews(true);
  }, 1500);

  setTimeout(() => {
    setTimeInfoLuotXem(true);
  }, 2000);

  React.useEffect(() => {}, [timeInfoCustomer, timeInfoNews, timeInfoLuotXem]);

  const handleShowAdd = () => {
    setIsShowAdd(true);
  };

  const handleShowHidden = () => {
    setIsShowAdd(false);
  };

  const InfoCustomer = () => {
    return (
      <Grid item xs={4} md={4}>
        <div className="item-impressive-left">
          <div className="icon-impressive">
            <img src="content/images/client.png" />
          </div>
          <div className="content-impressive">
            <p>
              <CountUp className="account-balance" start={0} end={3255} duration={2.75} />
            </p>
            <p className="info-content-left">KHÁCH HÀNG</p>
          </div>
        </div>
      </Grid>
    );
  };

  const InfoNews = () => {
    return (
      <Grid item xs={4} md={4}>
        <div className="item-impressive-center">
          <div className="icon-impressive">
            <img src="content/images/news.png" />
            {/* <FontAwesomeIcon icon="newspaper" fixedWidth className = "text-white"/> */}
          </div>
          <div className="content-impressive">
            <p>
              <CountUp className="account-balance" start={0} end={556} duration={2.75} />
            </p>
            <p className="info-content-center">BÀI ĐĂNG</p>
          </div>
        </div>
      </Grid>
    );
  };

  const InfoLuotXem = () => {
    return (
      <Grid item xs={4} md={4}>
        <div className="item-impressive-right">
          <div className="icon-impressive">
            <img src="content/images/customer.png" />
          </div>
          <div className="content-impressive">
            <p>
              <CountUp className="account-balance" start={0} end={17657} duration={2.75} />
            </p>
            <p className="info-content-right">LƯỢT TRUY CẬP</p>
          </div>
        </div>
      </Grid>
    );
  };

  return (
    <>
      <Header/>
    </>
  );
};

export default Home;
