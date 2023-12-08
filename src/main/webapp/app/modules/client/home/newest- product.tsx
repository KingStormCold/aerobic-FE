import './newest-product.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import React, { useEffect, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getBestsellerProductList, getCategoryDisplayInSlider, getLowPriceProductList, getNewestProductList, getProductList, getTopProductByCategory1, getTopProductByCategory2, getTopProductByCategory3, reset, resetTopProduct } from 'app/shared/reducers/product-list';
import { numberWithCommas } from 'app/shared/util/string-utils';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Slider from "react-slick";
import { useMediaQuery } from 'react-responsive'
import { Truncate } from '@primer/react';
import { Storage } from 'react-jhipster';
import { useHistory } from 'react-router-dom'

const DATA_PRODUCT_ID = 'product_detail_data_product_id_key'

const NewestProduct = (props) => {
    const loading = useAppSelector(state => state.productList.loading);
    const [title, setTitle] = useState("");
    const [sizeProduct, setSizeProduct] = useState(1);
    const dispatch = useAppDispatch();
    const history = useHistory();
    const isLaptop = useMediaQuery({ query: '(max-width: 1024px)' })
    const isMobile = useMediaQuery({ query: '(max-width: 767px)' })

    let width
    if (isLaptop) width = '180'
    else if (isMobile) width = '450'
    else width = '324'

    const { mode } = props;
    const { category } = props;
    const { index } = props;

    const LIMIT_DISPLAY = 4;

    useEffect(() => {
        dispatch(resetTopProduct())
        switch (mode) {
            case "newestProduct":
                dispatch(getNewestProductList())
                setTitle("TOP SẢN PHẨM MỚI NHẤT")
                break;
            case "topCategory":
                if (index === 0) {
                    dispatch(getTopProductByCategory1(category.categoryId))
                }
                if (index === 1) {
                    dispatch(getTopProductByCategory2(category.categoryId))
                }
                if (index === 2) {
                    dispatch(getTopProductByCategory3(category.categoryId))
                }
                setTitle("TOP SẢN PHẨM " + category.categoryName)
                break;
            default:
                break;
        }
    }, [category])


    let topProducts = [];
    switch (mode) {
        case "newestProduct":
            topProducts = useAppSelector(state => state.productList.newestProducts);
            break;
        case "topCategory":
            if (index === 0) {
                topProducts = useAppSelector(state => state.productList.topProductsByCategory1);
            }
            if (index === 1) {
                topProducts = useAppSelector(state => state.productList.topProductsByCategory2);
            }
            if (index === 2) {
                topProducts = useAppSelector(state => state.productList.topProductsByCategory3);
            }
            break;
        default:
            break;
    }


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
                    nextArrow: sizeProduct > 1 ? <SampleNextArrow /> : "",
                    prevArrow: sizeProduct > 1 ? <SamplePrevArrow /> : "",
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2.5,
                    nextArrow: sizeProduct > 1 ? <SampleNextArrow /> : "",
                    prevArrow: sizeProduct > 1 ? <SamplePrevArrow /> : "",
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
    if (!(topProducts.length > 0)) return <></>

    const handleClickProduct = (product_id) => {
        Storage.local.set(DATA_PRODUCT_ID, product_id);
        history.push(`/product-detail`);
    }

    return (
        <div className='new-product-list-container'>
            <div className="home-product-list-top">
                {title}
            </div>
            <div className='home-product-list-center'>
                <Slider {...settings} className={sizeProduct >= 3 ? "slider-custom" : ""}>
                    {topProducts?.map((productData, i) => (
                        <div className="wrapper" id={productData.product_id} key={`product-${i}`} >
                            <span className='product-detail-link' onClick={() => handleClickProduct(productData.product_id)}>
                                <div className="container">
                                    <div className="top">
                                    </div>
                                    <div className="center">
                                        <img className='product-image' src={productData.image} alt="image" />
                                    </div>
                                    <div className="bottom">
                                        <div className="left">
                                            <div className="details">
                                                {!isMobile &&
                                                    <Truncate className='h5' maxWidth={width} title={`${productData.product_name}`} >
                                                        {`${productData.product_name}`}
                                                    </Truncate>
                                                }
                                                {isMobile &&
                                                    <div className='detail-product-name-mobile' >
                                                        {`${productData.product_name}`}
                                                    </div>
                                                }
                                                <div className='details-buy-now-installment'>
                                                    <div className='details-buy-now'>
                                                        <div className='details-buy-now-text'>Mua ngay</div>
                                                        <div className='details-after-discount-value'>
                                                        </div>
                                                        <div className='details-buy-now-value'>{
                                                            numberWithCommas(productData?.buy_now_price !== null ? productData?.buy_now_price : '')}đ
                                                        </div>
                                                    </div>
                                                    <div className="vertical-line"></div>
                                                    <div className='details-installment'>
                                                        <div className='details-installment-text'>Trả trước</div>
                                                        <div className='details-installment-value'>{
                                                            numberWithCommas(productData?.installment_price !== null ? productData?.installment_price : '')}đ
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

export default NewestProduct;
