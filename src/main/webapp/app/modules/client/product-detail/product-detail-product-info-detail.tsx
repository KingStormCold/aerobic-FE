import './product-detail-product-info-detail.scss';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { changeProductInfoDetai, getProductDetailProductDetailInfo, resetProductInfoDetail } from 'app/shared/reducers/product-detail';
import React, { useEffect, useState } from 'react';
import { Row } from 'reactstrap';
import { numberWithCommas } from 'app/shared/util/string-utils';
import ProductdetailLoader from './product-detail-loader'

const ProductDetailPreferential = (props) => {
    const [stateProductDetailInfos, setStateProductDetailInfos] = useState([]);
    const productInfoNow = useAppSelector(state => state.productDetailClient.productInfoNow);
    const productDetailInfos = useAppSelector(state => state.productDetailClient.productDetailInfo);
    const loadingInfoDetail = useAppSelector(state => state.productDetailClient.loadingInfoDetail);
    const product = useAppSelector(state => state.productDetailClient.product);
    const productInfoDetailNow = useAppSelector(state => state.productDetailClient.productInfoDetailNow);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if(productInfoNow) {
            productInfoNow?.product_info_id && dispatch(getProductDetailProductDetailInfo(productInfoNow.product_info_id))
        } else {
            dispatch(resetProductInfoDetail);
        }
    }, [productInfoNow])

    useEffect(() => {
        if(productDetailInfos != null) {
            setStateProductDetailInfos(productDetailInfos)
            // setproductDetailIdNow(product?.product_info_detail_id)
            changeProductInfoDetailById(product?.product_info_detail_id)
        }
    }, [productDetailInfos])

    function handleChoose(_index) {
        for (let index = 0; index < productDetailInfos.length; index++) {
            if(_index === index){
                dispatch(changeProductInfoDetai(productDetailInfos[index]));
                break;
            }
        }
    }

    function changeProductInfoDetailById(_productDetailIdNow) {
        for (let index = 0; index < productDetailInfos.length; index++) {
            if(productDetailInfos.product_info_detail_id === _productDetailIdNow){
                dispatch(changeProductInfoDetai(productDetailInfos[index]));
                break;
            }
        }
    }

    return(
        <Row className='product-info-detail-select-row'>
            {loadingInfoDetail === true ?
                <ProductdetailLoader/>
            :
                (stateProductDetailInfos?.map((productDetailInfo, i) => (
                    productDetailInfo.product_info_detail_id === productInfoDetailNow?.product_info_detail_id ? 
                        <div className='product-info-detail-select-data-choosen' id={productDetailInfo.product_info_detail_id} key={`product-detail-info-${i}`} >
                            {productDetailInfo.name}
                            &nbsp;
                            {numberWithCommas(productDetailInfo.buy_now_price)}đ
                        </div>
                        :
                            productDetailInfo?.total > 0 ? 
                                <div className='product-info-detail-select-data' id={productDetailInfo.product_info_detail_id} key={`product-detail-info-${i}`} onClick={() => handleChoose(i)} >
                                    {productDetailInfo.name}
                                    &nbsp;
                                    {numberWithCommas(productDetailInfo.buy_now_price)}đ
                                </div>
                            :
                                <div className='product-info-detail-select-data' id={productDetailInfo.product_info_detail_id} key={`product-detail-info-${i}`} style={{ cursor: "not-allowed",  textDecoration: "line-through" }} >
                                    {productDetailInfo.name}
                                    &nbsp;
                                    {numberWithCommas(productDetailInfo.buy_now_price)}đ
                                    <span className='sold-out'>Hết hàng</span>
                                </div>
                    ))
                )
            }
        </Row>
    )
};

export default ProductDetailPreferential;
