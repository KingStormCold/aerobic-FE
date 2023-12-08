import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './product-detail-preferential.scss';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getProductDetailPreferential } from 'app/shared/reducers/product-detail';
import React, { useEffect, Suspense, useState } from 'react';
import LazyLoad from 'react-lazyload'
import ProductdetailLoader from './product-detail-loader'
import draftToHtmlPuri from "draftjs-to-html";

const ProductDetailPreferential = (props) => {

    const preferential = useAppSelector(state => state.productDetailClient.preferential);
    const loadingPreferential = useAppSelector(state => state.productDetailClient.loadingPreferential);
    const [convertedPreferential, setConvertedPreferential] = useState(null);

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getProductDetailPreferential(props.productId))
    }, [])

    useEffect(() => {
        if (preferential !== null && preferential !== undefined) {
            setConvertedPreferential(draftToHtmlPuri(preferential));
        }
    }, [preferential]);

    return (
        <div>
            {!preferential ?
                <div></div>
                :
                <div className='product-detail-container-col-right-preferential'>
                    <h5 className='preferential-header'>
                        {/* <FontAwesomeIcon icon="shield-alt"/>   */}
                        Ưu đãi
                    </h5>
                    <div className='preferential-content'>
                        <div className='preferential-content-data'
                            dangerouslySetInnerHTML={{ __html: convertedPreferential }} />
                    </div>
                </div>
            }
        </div>
    )
};

export default ProductDetailPreferential;
