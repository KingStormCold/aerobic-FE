import './search-product.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import React, { useEffect, useState } from 'react';
import { Link, RouteComponentProps, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getProductList } from 'app/shared/reducers/product-list';
import { numberWithCommas } from 'app/shared/util/string-utils';
import Pagination from '@mui/material/Pagination';
import { Storage } from 'react-jhipster';
import { useHistory } from 'react-router-dom'
import { getSearchProductName } from './../../../shared/reducers/product-list';

const DATA_CATEGORY_ID = 'product_list_data_category_id_key'
const DATA_PRODUCT_ID = 'product_detail_data_product_id_key'

const SearchProduct = (props: RouteComponentProps<{ productName: string, page: string }>) => {
    const searchValue = new URLSearchParams(props.location.search).get("product_name")
    const searchPage = new URLSearchParams(props.location.search).get("page")

    const products = useAppSelector(state => state.productList.searchResultProducts);
    const loading = useAppSelector(state => state.productList.loading);
    const pagination = useAppSelector(state => state.productList.pagination);
    const history = useHistory();
    const dispatch = useAppDispatch();

    const page = {
        page: searchPage,
        size: 8,
        productName: searchValue,
    }

    let pageSize = 1;
    let pageNum = 1;

    if (pagination) {
        pageSize = pagination.total_page
        pageNum = pagination.page_num
    }

    useEffect(() => {
        dispatch(getSearchProductName(page))
    }, [searchValue])

    const handlegetpage = (p) => {
        setTimeout(() => {
            page.page = p;
            dispatch(getSearchProductName(page));
            return;
        }, 100);
        return;
    };

    const handleChangePage = (e, p) => {
        handlegetpage(p - 1)
    };

    const handleClickProduct = (product_id) => {
        Storage.local.set(DATA_PRODUCT_ID, product_id);
        history.push(`/product-detail`);
    }

    return (
        <div>
            <div className='search-product-list'>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div>
                        {(products?.length !== 0 ?
                            <div className="outer-wrapper">
                                {products?.map((product, i) => (
                                    <div className="wrapper" id={product.product_id} key={`product-${i}`} >
                                        <span className='product-detail-link' onClick={() => handleClickProduct(product.product_id)}>
                                            <div className="container">
                                                <div className="top">
                                                    <img className='img-top' src={product.image} alt="image" />
                                                </div>
                                                <div className="bottom">
                                                    <div className="left">
                                                        <div className="details">
                                                            <h5>{product.product_name}</h5>
                                                            <div className='details-buy-now-installment'>
                                                                <div className='details-buy-now'>
                                                                    <div className='details-buy-now-text'>Mua ngay</div>
                                                                    <div className='details-buy-now-value'>{
                                                                        numberWithCommas(product?.buy_now_price !== null ? product?.buy_now_price : '')}đ
                                                                    </div>
                                                                </div>
                                                                <div className="vertical-line"></div>
                                                                <div className='details-installment'>
                                                                    <div className='details-installment-text'>Trả trước</div>
                                                                    <div className='details-installment-value'>{
                                                                        numberWithCommas(product?.installment_price !== null ? product?.installment_price : '')}đ
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
                            </div>
                            :
                            <h3>Không tìm thấy kết quả phù hợp</h3>
                        )
                        }

                    </div>



                )}
            </div>

            <div>
                {loading ? (
                    <div></div>
                ) : (
                    <div>
                        {(products?.length !== 0 ?
                            <div className='pagaination-product'>
                                <Pagination
                                    count={pageSize}
                                    size="large"
                                    page={pageNum + 1}
                                    variant="outlined"
                                    shape="rounded"
                                    onChange={handleChangePage}
                                />
                            </div>
                            :
                            <div></div>
                        )
                        }
                    </div>
                )}
            </div>
        </div>
    )
};

export default SearchProduct;
