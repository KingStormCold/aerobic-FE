import './top-low-price.scss';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getVideoDisplayInSlider } from 'app/shared/reducers/product-list';
import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router-dom';
import Slider from "react-slick";
import "./video-slider.scss";

const YOUTUBE_URL = 'https://www.youtube.com/'

const VideoSlider = () => {
    const loading = useAppSelector(state => state.productList.loading);
    const [title, setTitle] = useState("");
    const [size, setSize] = useState(1);
    const dispatch = useAppDispatch();
    const isLaptop = useMediaQuery({ query: '(max-width: 1024px)' })
    const isMobile = useMediaQuery({ query: '(max-width: 767px)' })

    let width
    if (isLaptop) width = '180'
    else if (isMobile) width = '450'
    else width = '324'

    const LIMIT_DISPLAY = 4;

    useEffect(() => {
        dispatch(getVideoDisplayInSlider())
        setTitle("VIDEO")
    }, [])

    const videos = useAppSelector(state => state.productList.videos);

    useEffect(() => {
        if (videos.length > 0) setSize(videos.length)
    }, [videos])

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        // autoplay: true,
        autoplaySpeed: 2000,
        nextArrow: size > LIMIT_DISPLAY ? <SampleNextArrow /> : "",
        prevArrow: size > LIMIT_DISPLAY ? <SamplePrevArrow /> : "",
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 980,
                settings: {
                    slidesToShow: 3,
                    nextArrow: size > 3 ? <SampleNextArrow /> : "",
                    prevArrow: size > 3 ? <SamplePrevArrow /> : "",
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    nextArrow: size > 1 ? <SampleNextArrow /> : "",
                    prevArrow: size > 1 ? <SamplePrevArrow /> : "",
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    nextArrow: size > 1 ? <SampleNextArrow /> : "",
                    prevArrow: size > 1 ? <SamplePrevArrow /> : "",
                }
            }
        ]
    };

    function SampleNextArrow(arrowProps) {
        const { className, style, onClick } = arrowProps;
        return (
            <div
                className={className}
                onClick={onClick}
            >
                <ArrowForwardIosIcon style={{ color: "black" }} />
            </div>
        );
    }

    function SamplePrevArrow(arrowProps) {
        const { className, style, onClick } = arrowProps;
        return (
            <div
                className={className}
                onClick={onClick}
            >
                <ArrowBackIosNewIcon style={{ color: "black" }} />
            </div>
        );
    }

    const convertYoutubeURLToYoutubeEmbedURL = (url) => {
        // get YouTube VideoId
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        const match = url.match(regExp);
        const youtubeID = (match && match[7].length === 11) ? match[7] : false;
        return `https://youtube.com/embed/${youtubeID}?autoplay=0`
    }

    if (loading) return <>loading...</>
    if (videos.length === 0) return <></>

    return (
        <div className='video-list-container'>
            <div className="home-product-list-top">
                {title}
            </div>
            <div className='home-product-list-center'>

                <Slider {...settings}>
                    {videos?.map((video, i) =>
                        video.video_url.includes(YOUTUBE_URL)
                            ? (
                                <div className="wrapper" id={video.video_id} key={`video-${i}`} >
                                    <iframe className='video' allowFullScreen={true} frameBorder="0" src={convertYoutubeURLToYoutubeEmbedURL(video.video_url)} ></iframe>
                                </div>
                            )
                            : (
                                <div className="wrapper" id={video.video_id} key={`video-${i}`} >
                                    <video className='video' controls >
                                        <source src={video.video_url} type="video/mp4" />
                                    </video>
                                </div>
                            )
                    )}
                </Slider>
            </div>

        </div>
    )
};

export default VideoSlider;
