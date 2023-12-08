import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './product-detail-buy-sale.scss';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import React, { useEffect, Suspense, useState } from 'react';
import LazyLoad from 'react-lazyload'
import { Button, Row } from 'reactstrap';
import ProductdetailLoader from './product-detail-loader'
import { numberWithCommas } from 'app/shared/util/string-utils';

const Loading = () => (
    <div className="post loading">
      <h5>Loading...</h5>
    </div>
  )

// const product = useAppSelector(state => state.productDetailClient.product);

const ProductDetailBuySale = (props) => {

    const [discountPrice, setDiscountPrice] = useState('0');
    const [originalPrice, setOriginalPrice] = useState('0');
    const [instaillmentPrice, setInstallmentPrice] = useState('0');

    const product = useAppSelector(state => state.productDetailClient.product);
    const productInfoDetailNow = useAppSelector(state => state.productDetailClient.productInfoDetailNow);
      
      useEffect(() => {
        if(product == null || product?.buy_now_price == null){
            setDiscountPrice('0');
        }else{
            setDiscountPrice(product?.buy_now_price)
        }
        if(product == null || product?.installment_price == null){
            setInstallmentPrice('0');
        }else{
            setInstallmentPrice(product?.installment_price)
        }
      }, [product])

      useEffect(() => {
        if(productInfoDetailNow == null || productInfoDetailNow?.buy_now_price == null){
            setDiscountPrice('0');
        }else{ 
            setOriginalPrice(productInfoDetailNow?.buy_now_price)
            if(productInfoDetailNow?.discount_price !== 0) {
                setDiscountPrice(String(productInfoDetailNow?.buy_now_price - productInfoDetailNow?.discount_price))
            } else {
                setDiscountPrice('0')
            }
        }
        if(productInfoDetailNow == null || productInfoDetailNow?.installment_price == null){
            setInstallmentPrice('0');
        }else{
            setInstallmentPrice(productInfoDetailNow?.installment_price)
        }
      }, [productInfoDetailNow])

    return(
        <Row className='product-info-detail-buy-sale-row'>
            <div className='product-info-detail-buy-sale-data'>
                <p className='product-info-detail-buy-sale-data-text'>Mua ngay</p>
                    {discountPrice === '0' && 
                        <h4 className='product-info-detail-buy-sale-data-price'>
                            {numberWithCommas(originalPrice)} ₫
                        </h4>
                    }
                    {discountPrice !== '0' && 
                        <>
                            <h4 className='product-info-detail-buy-sale-data-price'>
                                {numberWithCommas(discountPrice)} ₫
                            </h4>
                            <h5 className='original-price'>
                                {numberWithCommas(originalPrice)} đ
                            </h5>
                        </>
                    }
                    
                    {/* <p className='product-info-detail-buy-sale-data-sale-price'>
                        {numberWithCommas(instaillmentPrice)} ₫
                    </p> */}
            </div>
            <div className='product-info-detail-buy-sale-data-split'>Hoặc</div>
            <div className='product-info-detail-buy-sale-data-right'>
                <p className='product-info-detail-buy-sale-data-text'>Trả góp</p>
                <h4 className='product-info-detail-buy-sale-data-price'>
                    {numberWithCommas(instaillmentPrice)} ₫
                </h4>
            </div>
        </Row>
    )
};

export default ProductDetailBuySale;
