import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './product-detail-specifications.scss';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getProductDetailSpecification, resetStateChange } from 'app/shared/reducers/product-detail';
import React, { useEffect } from 'react';
import { Button, Col, Row, Table } from 'reactstrap';
import ProductdetailLoader from './product-detail-loader'

const ProductDetailSpecifications = (props) => {

    const specifications = useAppSelector(state => state.productDetailClient.specificationsData);
    const loadingSpec = useAppSelector(state => state.productDetailClient.loadingSpec);

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getProductDetailSpecification(props.productId))
    }, [])

    if (specifications === null || specifications === "") return <></>
    return (
        <Col xs="3" className='product-detail-specification-col-right'>
            {loadingSpec === true ?
                <ProductdetailLoader />
                :
                <div className='product-detail-container-col-right-specification'>
                    <h5>Thông số kỹ thuật</h5>
                    <div className='specification-content'>
                        <Table hover responsive striped>
                            <thead>
                                <tr>
                                    <th style={{ width: "30%" }} >Tên</th>
                                    <th style={{ width: "70%" }}>Giá trị</th>
                                </tr>
                            </thead>
                            {
                                !specifications ?
                                    <div></div>
                                    :
                                    specifications?.map((spec, i) => (
                                        <tr id={i} key={`spec-${i}`}>
                                            <td>
                                                {spec.specification.specification_name}
                                            </td>
                                            <td>
                                                {spec.specification.specification_value}
                                            </td>
                                        </tr>
                                    ))
                            }

                        </Table>
                    </div>
                </div>
            }
        </Col>
    )
};

export default ProductDetailSpecifications;
