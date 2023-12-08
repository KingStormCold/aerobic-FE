import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getProduct, resetStatus } from 'app/shared/reducers/product';
import React, { useEffect, useState } from 'react';
import { ValidatedField, ValidatedForm } from 'react-jhipster';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import "./product-info-detail-management.scss";

import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { CircularProgress } from '@mui/material';
import AlertMessage from 'app/components/alertMessage';
import { changeLink, changeLink2, changeLink3, changeLink4, changeLink5, changeName, changeName2, resetMenuLink } from 'app/shared/reducers/menu';
import { createProductInfoDetail, getProductInfoDetail, reset, updateProductInfoDetail } from 'app/shared/reducers/productInfoDetail';
import { PRODUCT_DETAIL_MANAGEMENT_LINK_NAME, PRODUCT_INFO_DETAIL_LINK_NAME, PRODUCT_INFO_DETAIL_MANAGEMENT_LINK, PRODUCT_INFO_DETAIL_MANAGEMENT_LINK_NAME, PRODUCT_INFO_MANAGEMENT_LINK, PRODUCT_INFO_MANAGEMENT_LINK_NAME, PRODUCT_MANAGEMENT_LINK, PRODUCT_MANAGEMENT_LINK_NAME } from 'app/shared/util/menu-link';
import CurrencyFormat from 'react-currency-format';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { getProductInfo } from '../../../shared/reducers/productInfo';
import { changeName3, changeName4, changeName5, changeName6 } from './../../../shared/reducers/menu';
import { PRODUCT_DETAIL_MANAGEMENT_LINK, PRODUCT_INFO_DETAIL_LINK } from './../../../shared/util/menu-link';

export const ProductInfoDetailManagementUpdate = (props: RouteComponentProps<{ productId: string, productInfoId: string, productInfoDetailId: string }>) => {
    const [isNew] = useState(!props.match.params || !props.match.params.productInfoDetailId);
    const [productIdParam, setProductIdParam] = useState(props.match.params.productId);
    const [productInfoIdParam, setProductInfoIdParam] = useState(props.match.params.productInfoId);
    const [previewimageUrl, setPreviewimageUrl] = useState("");
    const [buyNowPrice, setBuyNowPrice] = useState("");
    const [installmentPrice, setInstallmentPrice] = useState("");
    const [discountPrice, setDiscountPrice] = useState("");
    const [checkBlankBuyNowPrice, setCheckBlankBuyNowPrice] = useState(true);
    const [checkPositiveBuyNowPrice, setCheckPositiveBuyNowPrice] = useState(true);
    const [checkBlankInstallmentPrice, setCheckBlankInstallmentPrice] = useState(true);
    const [checkPositiveInstallmentPrice, setCheckPositiveInstallmentPrice] = useState(true);
    const [checkPositiveDiscountPrice, setCheckPositiveDiscountPrice] = useState(true);
    const [isInvalid, setIsInvalid] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isBestSellert, setIsBestSeller] = useState(false);
    const dispatch = useAppDispatch();

    const loading = false;

    useEffect(() => {
        dispatch(getProduct(productIdParam));
        dispatch(getProductInfo(productInfoIdParam));
    }, [])

    useEffect(() => {
        dispatch(reset());
        if (!isNew) {
            dispatch(getProductInfoDetail(props.match.params.productInfoDetailId));
        }
    }, [props.match.params.productInfoDetailId]);

    const updating = useAppSelector(state => state.productInfoDetailManagement.updating);
    const updateSuccess = useAppSelector(state => state.productInfoDetailManagement.updateSuccess);
    const product = useAppSelector(state => state.productManagement.product);
    const productInfo = useAppSelector(state => state.productInfoManagement.productInfo);
    const productInfoDetail = useAppSelector(state => state.productInfoDetailManagement.productInfoDetail);
    const errorMessage = useAppSelector(state => state.productInfoDetailManagement.errorMessage);

    useEffect(() => {
        if (!isNew) {
            setPreviewimageUrl(productInfoDetail.images);
            setIsBestSeller(productInfoDetail.bestseller);
        }
    }, [productInfoDetail]);

    const BACK_LINK = `/admin/product-info-detail-management/${productIdParam}/${productInfoIdParam}`

    useEffect(() => {
        if (productInfoDetail) {
            setBuyNowPrice(productInfoDetail.buy_now_price)
            setInstallmentPrice(productInfoDetail.installment_price)
            setDiscountPrice(productInfoDetail.discount_price)
        }
    }, [productInfoDetail]);

    if (updateSuccess) {
        setTimeout(() => {
            dispatch(resetStatus());
            handleClose()
        }, 3000);
    }

    useEffect(() => {
        dispatch(resetMenuLink());
        dispatch(changeLink(PRODUCT_MANAGEMENT_LINK));
        dispatch(changeName(PRODUCT_MANAGEMENT_LINK_NAME));

        dispatch(changeLink2(PRODUCT_DETAIL_MANAGEMENT_LINK(productIdParam)));
        dispatch(changeName2(PRODUCT_DETAIL_MANAGEMENT_LINK_NAME(product.product_name)));

        dispatch(changeLink3(PRODUCT_INFO_MANAGEMENT_LINK(productIdParam)));
        dispatch(changeName3(PRODUCT_INFO_MANAGEMENT_LINK_NAME(product.product_name)));

        dispatch(changeLink4(PRODUCT_INFO_DETAIL_LINK(productIdParam, productInfoIdParam)));
        dispatch(changeName4(PRODUCT_INFO_DETAIL_LINK_NAME(productInfo.product_info_name)));

        dispatch(changeLink5(PRODUCT_INFO_DETAIL_MANAGEMENT_LINK(productIdParam, productInfoIdParam)));
        dispatch(changeName5(PRODUCT_INFO_DETAIL_MANAGEMENT_LINK_NAME(product.product_name)));

        if (isNew)
            dispatch(changeName6("Thêm màu"));
        else
            dispatch(changeName6("Chỉnh sửa màu "));
    }, [product.product_name])

    const handleSave = values => {
        setIsInvalid(true)
        const input =
        {
            ...values,
            buy_now_price: buyNowPrice ? buyNowPrice.toString().replace(/,/g, '').replace(/ đ/g, '') : 0,
            installment_price: installmentPrice ? installmentPrice.toString().replace(/,/g, '').replace(/ đ/g, '') : 0,
            discount_price: discountPrice ? discountPrice.toString().replace(/,/g, '').replace(/ đ/g, '') : 0,
            product_info_id: productInfoIdParam
        }

        if (isNew) {
            dispatch(createProductInfoDetail(input))
        } else {
            dispatch(updateProductInfoDetail(input))
        }
    };

    const handleClose = () => {
        props.history.push(BACK_LINK)
    };

    const handleMessage = () => {
        dispatch(resetStatus());
    }

    const handlCheckBuyNowPriceInput = (e) => {
        const value = e.target.value
        setBuyNowPrice(value)
        if (value === '') setCheckBlankBuyNowPrice(false)
        else setCheckBlankBuyNowPrice(true)

        if (value.includes("-") || value === '0 đ') setCheckPositiveBuyNowPrice(false)
        else setCheckPositiveBuyNowPrice(true)

        checkAllValidate();
    }

    const handleCheckInstallmentPriceInput = (e) => {
        const value = e.target.value
        setInstallmentPrice(value)
        if (value === '') setCheckBlankInstallmentPrice(false)
        else setCheckBlankInstallmentPrice(true)

        if (value.includes("-") || value === '0 đ') setCheckPositiveInstallmentPrice(false)
        else setCheckPositiveInstallmentPrice(true)
        checkAllValidate();
    }

    const handleCheckDiscountPriceInput = (e) => {
        const value = e.target.value
        if (value) setDiscountPrice(value)

        if (value.includes("-")) setCheckPositiveDiscountPrice(false)
        else setCheckPositiveDiscountPrice(true)
        checkAllValidate();
    }

    useEffect(() => {
        checkAllValidate();
    }, [buyNowPrice, installmentPrice, checkBlankBuyNowPrice, checkBlankInstallmentPrice])

    const checkAllValidate = () => {
        if (checkBlankBuyNowPrice && checkPositiveBuyNowPrice
            && checkBlankInstallmentPrice && checkPositiveInstallmentPrice && checkPositiveDiscountPrice) {
            setIsError(false)
        }
        else
            setIsError(true)
    }

    return (
        <div className='admin-management-update-container'>
            <Row className="justify-content-center mt-4">
                <Col md="6">
                    <h1>
                        {isNew ? "Đăng ký màu sản phẩm" : "Chỉnh sửa màu sản phẩm"}
                    </h1>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col md="6">
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <ValidatedForm onSubmit={handleSave} defaultValues={productInfoDetail}>
                            <span className='form-group'>Tên màu sản phẩm</span>
                            <span className="required-mark">*</span>
                            <ValidatedField
                                type="text"
                                name="name"
                                required
                                validate={{
                                    maxLength: {
                                        value: 100,
                                        message: "Bạn chỉ được nhập dưới 100 ký tự",
                                    },
                                    required: {
                                        value: true,
                                        message: "Bạn phải nhập tên sản phẩm",
                                    }
                                }}
                            />

                            <span className='form-group'>Hình ảnh </span>
                            <span className="required-mark">*</span>
                            <ValidatedField
                                type="text"
                                name="images"
                                required
                                value={previewimageUrl}
                                onChange={(e) => setPreviewimageUrl(e.target.value)}
                                validate={{
                                    required: {
                                        value: true,
                                        message: "Bạn phải dán URL hình ảnh sản phẩm",
                                    }
                                }}
                            />

                            {previewimageUrl &&
                                <div className='preview-image-container'>
                                    <p className='preview-image-icon' onClick={() => setPreviewimageUrl("")} >
                                        <HighlightOffIcon />
                                    </p>
                                    <img
                                        className='preview-image'
                                        src={previewimageUrl}
                                        alt=""
                                    />
                                </div>
                            }

                            <span className='form-group'>Số lượng</span>
                            <span className="required-mark">*</span>
                            <ValidatedField
                                type="number"
                                name="total"
                                required
                                validate={{
                                    required: {
                                        value: true,
                                        message: "Bạn phải nhập số lượng sản phẩm",
                                    },
                                    min: {
                                        value: 1,
                                        message: "Bạn phải nhập lớn hơn 0",
                                    }
                                }}
                            />

                            <span className='form-group' >Giá mua ngay</span>
                            <span className="required-mark">*</span>
                            <div className="form-group">
                                <CurrencyFormat
                                    value={buyNowPrice}
                                    className={`${(checkBlankBuyNowPrice && checkPositiveBuyNowPrice) ? "form-control" : " is-touched is-invalid form-control"}`}
                                    thousandSeparator={true}
                                    suffix={' đ'}
                                    onChange={(e) => handlCheckBuyNowPriceInput(e)}
                                />
                                {!checkBlankBuyNowPrice && <div className="invalid-feedback">Bạn phải nhập giá mua ngay</div>}
                                {!checkPositiveBuyNowPrice && <div className="invalid-feedback">Giá tiền không hợp lệ</div>}
                            </div>

                            <span className='form-group'>Giá trả góp</span>
                            <span className="required-mark">*</span>
                            <div className="form-group">
                                <CurrencyFormat
                                    value={installmentPrice}
                                    className={`${(checkBlankInstallmentPrice && checkPositiveInstallmentPrice) ? "form-control" : " is-touched is-invalid form-control"}`}
                                    thousandSeparator={true}
                                    suffix={' đ'}
                                    onChange={(e) => handleCheckInstallmentPriceInput(e)}
                                />
                                {!checkBlankInstallmentPrice && <div className="invalid-feedback">Bạn phải nhập giá trả góp</div>}
                                {!checkPositiveInstallmentPrice && <div className="invalid-feedback">Giá tiền không hợp lệ</div>}
                            </div>

                            <span className='form-group'>Giá giảm</span>
                            <div className="form-group">
                                <CurrencyFormat
                                    value={discountPrice === null ? "" : discountPrice}
                                    className={`${(checkPositiveDiscountPrice) ? "form-control" : " is-touched is-invalid form-control"}`}
                                    thousandSeparator={true}
                                    suffix={' đ'}
                                    onChange={(e) => handleCheckDiscountPriceInput(e)}
                                />
                                {!checkPositiveInstallmentPrice && <div className="invalid-feedback">Giá giảm không hợp lệ</div>}
                            </div>

                            <ValidatedField type="checkbox" name="bestseller" value={isBestSellert} check label="Bán chạy" onChange={() => setIsBestSeller(!isBestSellert)} />

                            <br />
                            {/* BUTTON ==========================================================*/}
                            <Button tag={Link} to={BACK_LINK} replace color="danger">
                                <span className="d-none d-md-inline">
                                    Trở về
                                </span>
                            </Button>
                            &nbsp;
                            <Button color="success" type="submit" disabled={isError || isInvalid}>
                                {isInvalid ? <CircularProgress size={20} /> : "Lưu"}
                            </Button>
                        </ValidatedForm>
                    )}
                </Col>
            </Row>

            <div className='alert-bottom-right'>
                <AlertMessage type="UPDATE" isOpen={updateSuccess} isNew={isNew} onHandleMessage={handleMessage} timeOut="1000" />
                <AlertMessage type="ERROR" isOpen={errorMessage} onHandleMessage={() => dispatch(resetStatus())} timeOut="3000" />
            </div>
        </div >
    );
};

export default ProductInfoDetailManagementUpdate;
