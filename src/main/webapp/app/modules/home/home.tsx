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

    const handleChange = (event) => {
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

    React.useEffect(() => {

    }, [timeInfoCustomer, timeInfoNews, timeInfoLuotXem]);

    const handleShowAdd = () => {
        setIsShowAdd(true);
    }

    const handleShowHidden = () => {
        setIsShowAdd(false);
    }

    const InfoCustomer = () => {
        return (
            <Grid item xs={4} md={4}>
                <div className="item-impressive-left">
                    <div className="icon-impressive">
                        <img src='content/images/client.png' />
                    </div>
                    <div className="content-impressive">
                        <p>
                            <CountUp
                            className="account-balance"
                            start={0}
                            end={3255}
                            duration={2.75}
                            />
                        </p>
                        <p className = "info-content-left">KHÁCH HÀNG</p>
                    </div>
                </div>
            </Grid>
        )
    }

    const InfoNews = () => {
        return (
            <Grid item xs={4} md={4}>
                <div className="item-impressive-center">
                    <div className="icon-impressive">
                        <img src='content/images/news.png' />
                        {/* <FontAwesomeIcon icon="newspaper" fixedWidth className = "text-white"/> */}
                    </div>
                    <div className="content-impressive">
                        <p>
                            <CountUp
                            className="account-balance"
                            start={0}
                            end={556}
                            duration={2.75}
                            />
                        </p>
                        <p className = "info-content-center">BÀI ĐĂNG</p>
                    </div>
                </div>
            </Grid>
        )
    }

    const InfoLuotXem = () => {
        return (
            <Grid item xs={4} md={4}>
                <div className="item-impressive-right">
                    <div className="icon-impressive">
                        <img src='content/images/customer.png' />
                    </div>
                    <div className="content-impressive">
                        <p>
                            <CountUp
                            className="account-balance"
                            start={0}
                            end={17657}
                            duration={2.75}
                            />
                        </p>
                        <p className = "info-content-right">LƯỢT TRUY CẬP</p>
                    </div>
                </div>
            </Grid>
        )
    }

    return (
        <>
            <div className="bg-search">
                <Grid item xs={12} container className="pd-top-30">
                    <Grid item xs={1} md={1}></Grid>
                    <Grid item xs={2} md={2}>
                        {/* <select name="cars" className="custom-select custom-nha-dat">
                        <option value="" selected>Loại nhà đất</option>
                        <option value="volvo">Đất dự án</option>
                        <option value="fiat">Nhà riêng</option>
                    </select> */}
                        <Box>
                            <FormControl className="custom-box">
                                <InputLabel id="demo-simple-select-label">Loại nhà đất123213</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={age}
                                    label="Loại nhà đất"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="">
                                        <em>Không chọn</em>
                                    </MenuItem>
                                    <MenuItem value={20}>Đất dự án</MenuItem>
                                    <MenuItem value={30}>Nhà riêng</MenuItem>
                                    <MenuItem value={30}>Nhà phố, bệt</MenuItem>
                                    <MenuItem value={30}>Chung cư</MenuItem>
                                    <MenuItem value={30}>Khác</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>
                    <Grid item xs={2} md={2}>
                        <Box>
                            <FormControl className="custom-box">
                                <InputLabel id="demo-simple-select-label">Trên toàn quốc</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={age}
                                    label="Trên toàn quốc"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="">
                                        <em>Không chọn</em>
                                    </MenuItem>
                                    <MenuItem value={20}>Hồ Chí Minh</MenuItem>
                                    <MenuItem value={30}>Hà Nội</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>
                    <Grid item xs={2} md={2}>
                        <Box>
                            <FormControl className="custom-box">
                                <InputLabel id="demo-simple-select-label">Diện tích</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={age}
                                    label="Diện tích"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="">
                                        <em>Không chọn</em>
                                    </MenuItem>
                                    <MenuItem value={20}>{"<50 m2"}</MenuItem>
                                    <MenuItem value={30}>{"50 m2 - 100 m2"}</MenuItem>
                                    <MenuItem value={30}>{"100 - 300 m2"}</MenuItem>
                                    <MenuItem value={30}>{"> 300 m2"}</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>
                    <Grid item xs={2} md={2}>
                        <Box>
                            <FormControl className="custom-box">
                                <InputLabel id="demo-simple-select-label">Giá</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={age}
                                    label="Giá"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="">
                                        <em>Không chọn</em>
                                    </MenuItem>
                                    <MenuItem value={20}>{"< 500 triệu"}</MenuItem>
                                    <MenuItem value={30}>{"500 triệu - 800 triệu"}</MenuItem>
                                    <MenuItem value={30}>{"800 triệu - 1 tỷ"}</MenuItem>
                                    <MenuItem value={30}>{"1 tỷ - 2 tỷ"}</MenuItem>
                                    <MenuItem value={30}>{"2 tỷ - 4 tỷ"}</MenuItem>
                                    <MenuItem value={30}>{"> 4 tỷ"}</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>
                    <Grid item xs={2} md={2}>
                        {!isShowAdd &&
                        (<><p className="text-white pd-top-15 dp-inline-block hover-cursor-pointer" onClick = {handleShowAdd}>Hiển thị thêm</p>
                        <FontAwesomeIcon icon="caret-down" fixedWidth className="text-white hover-cursor-pointer" onClick = {handleShowAdd}/>
                         </>) }
                    </Grid>
                    <Grid item xs={1} md={1}></Grid>
                </Grid>
                {isShowAdd && 
                    <Grid item xs={12} container className="mg-top-15">
                        <Grid item xs={1} md={1}></Grid>
                        <Grid item xs={2} md={2}>
                            <Box>
                                <FormControl className="custom-box">
                                    <InputLabel id="demo-simple-select-label">Phường xã</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={age}
                                        label="Phường xã"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="">
                                            <em>Không chọn</em>
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                        <Grid item xs={2} md={2}>
                            <Box>
                                <FormControl className="custom-box">
                                    <InputLabel id="demo-simple-select-label">Đường phố</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={age}
                                        label="Đường phố"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="">
                                            <em>Không chọn</em>
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                        <Grid item xs={2} md={2}>
                            <Box>
                                <FormControl className="custom-box">
                                    <InputLabel id="demo-simple-select-label">Số phòng</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={age}
                                        label="Số phòng"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="">
                                            <em>Không chọn</em>
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                        <Grid item xs={2} md={2}>
                            <Box>
                                <FormControl className="custom-box">
                                    <InputLabel id="demo-simple-select-label">Hướng</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={age}
                                        label="Hướng"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="">
                                            <em>Không chọn</em>
                                        </MenuItem>
                                        <MenuItem value={20}>{"Đông"}</MenuItem>
                                        <MenuItem value={30}>{"Tây"}</MenuItem>
                                        <MenuItem value={30}>{"Nam"}</MenuItem>
                                        <MenuItem value={30}>{"Bắc"}</MenuItem>
                                        <MenuItem value={30}>{"Đông - Bắc"}</MenuItem>
                                        <MenuItem value={30}>{"Tây - Nam"}</MenuItem>
                                        <MenuItem value={30}>{"Đông - Nam"}</MenuItem>
                                        <MenuItem value={30}>{"Tây - Nam"}</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                        <Grid item xs={2} md={2}>
                            <p className="text-white pd-top-15 dp-inline-block hover-cursor-pointer" onClick = {handleShowHidden}>Thu gọn</p>
                            <FontAwesomeIcon icon="caret-up" fixedWidth className="text-white hover-cursor-pointer" onClick = {handleShowHidden}/>
                        </Grid>
                        <Grid item xs={1} md={1}></Grid>
                    </Grid>
                    }
                <Grid item xs={12} container className="mg-top-15">
                    <Grid item xs={1} md={1}></Grid>
                    <Grid item xs={9} md={9}>
                        <TextField id="outlined-basic" label="Tìm kiếm địa điểm" variant="outlined" fullWidth />
                        {/* <input type="text" className="form-control" id="usr" placeholder = "Tìm kiếm địa điểm"/> */}
                    </Grid>
                    <Grid item xs={2} md={2}></Grid>
                </Grid>
                {/* {!isShowAdd && 
                <Grid item xs={12} container className="mg-top-15 height-56"/>
                } */}
                <Grid item xs={12} container className="info-customer mg-top-15">
                    {timeInfoCustomer && InfoCustomer()}
                    {timeInfoNews && InfoNews()}
                    {timeInfoLuotXem && InfoLuotXem()}
                </Grid>
            </div>
        </>
    );
};

export default Home;
