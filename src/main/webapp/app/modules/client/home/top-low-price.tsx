import './top-low-price.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import React, { useEffect, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getBestsellerProductList, getLowPriceProductList, getProductList } from 'app/shared/reducers/product-list';
import { numberWithCommas } from 'app/shared/util/string-utils';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Slider from "react-slick";
import { useMediaQuery } from 'react-responsive'
import { Truncate } from '@primer/react';
import { Storage } from 'react-jhipster';
import { useHistory } from 'react-router-dom'

const DATA_PRODUCT_ID = 'product_detail_data_product_id_key'

const TopLowPrice = (props) => {
    const loading = useAppSelector(state => state.productList.loading);
    const [title, setTitle] = useState("");
    const [sizeProduct, setSizeProduct] = useState(1);
    const dispatch = useAppDispatch();
    const isLaptop = useMediaQuery({ query: '(max-width: 1024px)' })
    const isMobile = useMediaQuery({ query: '(max-width: 767px)' })
    const history = useHistory();

    let width
    if (isLaptop) width = '180'
    else if (isMobile) width = '450'
    else width = '324'

    const { mode } = props;
    const LIMIT_DISPLAY = 4;

    let topProducts = [];
    switch (mode) {
        case "discount":
            topProducts = useAppSelector(state => state.productList.lowestProducts);
            break;
        case "bestseller":
            topProducts = useAppSelector(state => state.productList.bestsellerProducts);
            break;
        default:
            break;
    }

    useEffect(() => {
        switch (mode) {
            case "discount":
                dispatch(getLowPriceProductList())
                setTitle("TOP SẢN PHẨM GIẢM GIÁ")
                break;
            case "bestseller":
                dispatch(getBestsellerProductList())
                setTitle("TOP SẢN PHẨM BÁN CHẠY")
                break;
            default:
                break;
        }
    }, [mode])

    useEffect(() => {
        if (topProducts.length > 0) setSizeProduct(topProducts.length)
    }, [topProducts])

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        nextArrow: sizeProduct > LIMIT_DISPLAY ? <SampleNextArrow /> : "",
        prevArrow: sizeProduct > LIMIT_DISPLAY ? <SamplePrevArrow /> : "",
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
                    nextArrow: sizeProduct > 3 ? <SampleNextArrow /> : "",
                    prevArrow: sizeProduct > 3 ? <SamplePrevArrow /> : "",
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2.5,
                    nextArrow: sizeProduct > 2 ? <SampleNextArrow /> : "",
                    prevArrow: sizeProduct > 2 ? <SamplePrevArrow /> : "",
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2.5,
                    nextArrow: sizeProduct > 2 ? <SampleNextArrow /> : "",
                    prevArrow: sizeProduct > 2 ? <SamplePrevArrow /> : "",
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


    if (loading) return <>loading...</>
    if (topProducts.length === 0) return <></>

    const handleClickProduct = (product_id) => {
        Storage.local.set(DATA_PRODUCT_ID, product_id);
        history.push(`/product-detail`);
    }

    return (
        <div className='top-product-list-container'>
            <div className="home-product-list-top">
                {title}
            </div>
            <div className='home-product-list-center'>
                <Slider {...settings} className={sizeProduct >= 3 ? "slider-custom" : ""}>
                    {topProducts?.map((productInfoDetail, i) => (
                        <div className="wrapper" id={productInfoDetail.product_info_detail_id} key={`product-${i}`} style={{ width: "40%" }} >
                            <span className='product-detail-link' onClick={() => handleClickProduct(productInfoDetail.product_id)}>
                                <div className="container">
                                    <div className="top">
                                        <span className=''>Giảm {numberWithCommas(productInfoDetail.discount_price !== null ? productInfoDetail.discount_price : '')}đ</span>
                                    </div>
                                    <div className="center">
                                        <img className='product-image' src={productInfoDetail.images} alt="image" />
                                    </div>
                                    <div className="bottom">
                                        <div className="left">
                                            <div className="details">
                                                {!isMobile &&
                                                    <Truncate className='h5' maxWidth={width} title={`${productInfoDetail.product_name}  ${productInfoDetail.product_info_name}  ${productInfoDetail.name}`} >
                                                        {`${productInfoDetail.product_name}  ${productInfoDetail.product_info_name}  ${productInfoDetail.name}`}
                                                    </Truncate>
                                                }
                                                {isMobile &&
                                                    <div className='detail-product-name-mobile'>
                                                        {productInfoDetail.product_name} {productInfoDetail.product_info_name} {productInfoDetail.name}
                                                    </div>
                                                }


                                                <div className='details-buy-now-installment'>
                                                    <div className='details-buy-now'>
                                                        <div className='details-buy-now-text'>Mua ngay</div>
                                                        <div className='details-after-discount-value'>{
                                                            numberWithCommas(productInfoDetail?.price_after_discount !== null ? productInfoDetail?.price_after_discount : '')}đ
                                                        </div>
                                                        <div className='details-before-discount-value'>{
                                                            numberWithCommas(productInfoDetail?.buy_now_price !== null ? productInfoDetail?.buy_now_price : '')}đ
                                                        </div>
                                                    </div>
                                                    <div className="vertical-line"></div>
                                                    <div className='details-installment'>
                                                        <div className='details-installment-text'>Trả trước</div>
                                                        <div className='details-installment-value'>{
                                                            numberWithCommas(productInfoDetail?.installment_price !== null ? productInfoDetail?.installment_price : '')}đ
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </span>
                        </div>
                    ))}
                </Slider>
            </div>

        </div>
    )
};

export default TopLowPrice;
