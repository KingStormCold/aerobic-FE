import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './product-detail-insurance.scss';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import React, { useEffect, Suspense, useState } from 'react';
import LazyLoad from 'react-lazyload'
import ProductdetailLoader from './product-detail-loader'
import draftToHtmlPuri from "draftjs-to-html";

const Loading = () => (
    <div className="post loading">
        <h5>Loading...</h5>
    </div>
)

const ProductDetailInsurance = (props) => {

    const product = useAppSelector(state => state.productDetailClient.product);
    const [convertedInsurance, setConvertedInsurance] = useState(null);

    useEffect(() => {
        if (product !== null && product?.info_insurance !== undefined && product?.info_insurance !== "") {
            setConvertedInsurance(draftToHtmlPuri(JSON.parse(product.info_insurance)));
        }
    }, [product]);

    return (
        <div>
            {!product?.info_insurance ?
                <div></div>
                :
                <div className='product-detail-container-col-right-warranty'>
                    <h5 className='warranty-header'>Bảo hành</h5>
                    <div className='warranty-content'>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: convertedInsurance
                            }}
                        />
                    </div>
                </div>
            }
        </div>
    )
};

export default ProductDetailInsurance;
