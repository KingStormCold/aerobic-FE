import './card-estate.scss';

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

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useAppSelector } from 'app/config/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import CountUp, { useCountUp } from 'react-countup';
import { Carousel } from 'react-carousel-minimal';

export const CardEstate = () => {

    const listCard = ["123", "123", "123", "123", "123", "123", "123"];
    const data = [
        {
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/GoldenGateBridge-001.jpg/1200px-GoldenGateBridge-001.jpg",
            caption: "San Francisco"
        },
        {
            image: "https://cdn.britannica.com/s:800x450,c:crop/35/204435-138-2F2B745A/Time-lapse-hyper-lapse-Isle-Skye-Scotland.jpg",
            caption: "Scotland"
        },
        {
            image: "https://static2.tripoto.com/media/filter/tst/img/735873/TripDocument/1537686560_1537686557954.jpg",
            caption: "Darjeeling"
        },
        {
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Palace_of_Fine_Arts_%2816794p%29.jpg/1200px-Palace_of_Fine_Arts_%2816794p%29.jpg",
            caption: "San Francisco"
        },
        {
            image: "https://i.natgeofe.com/n/f7732389-a045-402c-bf39-cb4eda39e786/scotland_travel_4x3.jpg",
            caption: "Scotland"
        },
        {
            image: "https://www.tusktravel.com/blog/wp-content/uploads/2020/07/Best-Time-to-Visit-Darjeeling-for-Honeymoon.jpg",
            caption: "Darjeeling"
        },
        {
            image: "https://www.omm.com/~/media/images/site/locations/san_francisco_780x520px.ashx",
            caption: "San Francisco"
        },
        {
            image: "https://images.ctfassets.net/bth3mlrehms2/6Ypj2Qd3m3jQk6ygmpsNAM/61d2f8cb9f939beed918971b9bc59bcd/Scotland.jpg?w=750&h=422&fl=progressive&q=50&fm=jpg",
            caption: "Scotland"
        },
        {
            image: "https://www.oyorooms.com/travel-guide/wp-content/uploads/2019/02/summer-7.jpg",
            caption: "Darjeeling"
        }
    ];

    const captionStyle = {
        fontSize: '2em',
        fontWeight: 'bold',
    }
    const slideNumberStyle = {
        fontSize: '20px',
        fontWeight: 'bold',
    }

    return (
        <div>
            <Grid item xs={12} container>
                {listCard.map((item, index) => {
                    return (
                        <Grid item xs={3} md={3} key = {index} className = "mt-bottom-10 mt-top-10">
                            <Link to = "/" className ="tag-a-hover">
                                <Card className = "layout-card">
                                    {/* <CardMedia
                                        component="img"
                                        alt="green iguana"
                                        height="200"
                                    > */}
                                        <Carousel
                                            key = {index}
                                            id = {index + 123123}
                                            data={data}
                                            time={10000}
                                            width="850px"
                                            height="500px"
                                            captionStyle={captionStyle}
                                            radius="10px"
                                            slideNumber={true}
                                            slideNumberStyle={slideNumberStyle}
                                            captionPosition="bottom"
                                            automatic={false}
                                            dots={true}
                                            pauseIconColor="white"
                                            pauseIconSize="40px"
                                            slideBackgroundColor="darkgrey"
                                            slideImageFit="cover"
                                            thumbnails={true}
                                            thumbnailWidth="100px"
                                            style={{
                                                textAlign: "center",
                                                maxWidth: "850px",
                                                maxHeight: "500px",
                                                margin: "40px auto",
                                            }}
                                            />
                                    {/* </CardMedia> */}
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            <Grid item xs={12} container>
                                                <Grid item xs={2} md={2} style = {{textAlign: 'center'}}>
                                                    <span style = {{fontSize: '18px'}}>1 tỷ</span>
                                                </Grid>
                                                <Grid item xs={5} md={5} style = {{textAlign: 'center'}}>
                                                    <span style = {{fontSize: '21px'}}>100 m2</span>
                                                </Grid>
                                                <Grid item xs={5} md={5} style = {{textAlign: 'center'}}>
                                                    <span style = {{fontSize: '20px'}}>100 triệu/m2</span>
                                                </Grid>
                                            </Grid>
                                        </Typography>
                                        <hr/>
                                        <Typography variant="body2" color="text.secondary">
                                        <p style = {{color: '#211eff'}}>Đất ở đô thị, thị trấn Đồng Phú, Bình Phước</p>
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            <Grid item xs={12} container>
                                                <Grid item xs={6} md={6} style = {{textAlign: 'center'}}>
                                                    <span>2 ngày trước</span>
                                                </Grid>
                                                <Grid item xs={6} md={6} style = {{textAlign: 'center'}}>
                                                    <span>Đã bán</span>
                                                </Grid>
                                            </Grid>
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Link>
                        </Grid>
                    )
                })}
                
            </Grid>
        </div>
    );

};

export default CardEstate;
