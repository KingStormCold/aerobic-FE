import './product-detail-product-info.scss';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getProductDetailProductInfo, changeProductInfo } from 'app/shared/reducers/product-detail';
import React, { useEffect } from 'react';
import { Col, Row } from 'reactstrap';
import { numberWithCommas } from 'app/shared/util/string-utils';

const ProductDetailProductInfo = (props) => {

    const productInfos = useAppSelector(state => state.productDetailClient.productInfo);
    const productInfoNow = useAppSelector(state => state.productDetailClient.productInfoNow);
    const product = useAppSelector(state => state.productDetailClient.product);

    const dispatch = useAppDispatch();
    useEffect(() => {
        if (product !== null) {
            dispatch(getProductDetailProductInfo(props.productId));
        }
    }, [product])

    function handleChoose(_index) {
        for (let index = 0; index < productInfos.length; index++) {
            if (_index === index) {
                dispatch(changeProductInfo(productInfos[index]));
                break;
            }
        }
    }

    return (
        <Row className='product-info-select-row'>
            {
                (
                    productInfos.length > 0 && productInfos?.map((productInfo, i) => (

                        <div className='product-info-select-row-top' id={productInfo.product_info_id} key={`product-info-${i}`}>
                            {
                                productInfoNow?.product_info_id === productInfo.product_info_id ?
                                    <Col className='product-info-select-col-choosen' >
                                        <div className='product-info-select-size-col' >
                                            {productInfo.product_info_name}
                                        </div>
                                        <div className='product-info-select-price-col' >
                                            {numberWithCommas(productInfo.price)} đ
                                        </div>
                                    </Col>
                                    :
                                    productInfo?.total > 0 ?
                                    <Col className='product-info-select-col' onClick={() => handleChoose(i)}>
                                        <div className='product-info-select-size-col' >
                                            {productInfo.product_info_name}
                                        </div>
                                        <div className='product-info-select-price-col' >
                                            {numberWithCommas(productInfo.price)} đ
                                        </div>
                                    </Col>
                                    :
                                    <Col className='product-info-select-col-not-stored' >
                                        <span className='sold-out'>Hết hàng</span>
                                        <div className='product-info-select-size-col' >
                                            {productInfo.product_info_name}
                                        </div>
                                        <div className='product-info-select-price-col' >
                                            {numberWithCommas(productInfo.price)} đ
                                        </div>
                                    </Col>
                            }
                        </div>
                    )
                ))
            }
        </Row>
    )
};

export default ProductDetailProductInfo;
