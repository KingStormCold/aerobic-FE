import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './product-detail-promotion.scss';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getProductDetailPromotion } from 'app/shared/reducers/product-detail';
import React, { useEffect, useState } from 'react';
import ProductdetailLoader from './product-detail-loader'
import draftToHtmlPuri from "draftjs-to-html";


const ProductDetailPromotion = (props) => {
    const productInfoNow = useAppSelector(state => state.productDetailClient.productInfoNow);
    const promotion = useAppSelector(state => state.productDetailClient.promotion);
    const loadingPromotion = useAppSelector(state => state.productDetailClient.loadingPromotion);

    const dispatch = useAppDispatch();
    useEffect(() => {
        if (productInfoNow) {
            productInfoNow.product_info_id && dispatch(getProductDetailPromotion(productInfoNow.product_info_id))
        }
    }, [productInfoNow])

    const [convertedContent, setConvertedContent] = useState(null);

    useEffect(() => {
        if (promotion !== null && promotion?.content !== undefined && promotion?.content !== null && promotion?.content !== "") {
            setConvertedContent(draftToHtmlPuri(JSON.parse(promotion.content)));
        } else {
            setConvertedContent('');
        }
    }, [promotion]);

    return (
        <div>
            {loadingPromotion === true
                ?
                <ProductdetailLoader />
                :
                (!convertedContent || convertedContent == null ?
                    <div className='product-detail-container-col-right-promotion'>
                        <h5 className='promotion-header'>
                            Sản phẩm này đã hết đợt khuyến mãi
                        </h5>
                    </div>
                    :
                    <div className='product-detail-container-col-right-promotion'>
                        <h5 className='promotion-header'>
                            Khuyến mãi
                        </h5>
                        <div className='promotion-content'>
                            <div className='promotion-content-data'
                                dangerouslySetInnerHTML={{ __html: convertedContent }} />
                        </div>
                    </div>
                )
            }
        </div>
    )
};

export default ProductDetailPromotion;
