import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getProduct } from 'app/shared/reducers/product';
import React, { useEffect, useState } from 'react';
import { ValidatedField, ValidatedForm } from 'react-jhipster';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Alert, Button, Col, Row } from 'reactstrap';
import "./product-management.scss";
import { changeName, resetMenuLink, changeLink, changeName2, changeLink2, changeLink3 } from 'app/shared/reducers/menu';
import { createProductInfo, resetStatus } from 'app/shared/reducers/productInfo';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { getProductInfo, updateProductInfo, reset } from './../../../shared/reducers/productInfo';
import AlertMessage from 'app/components/alertMessage';
import { changeName3, changeName4 } from './../../../shared/reducers/menu';
import { PRODUCT_DETAIL_MANAGEMENT_LINK } from './../../../shared/util/menu-link';
import { PRODUCT_DETAIL_MANAGEMENT_LINK_NAME, PRODUCT_INFO_MANAGEMENT_LINK, PRODUCT_INFO_MANAGEMENT_LINK_NAME, PRODUCT_MANAGEMENT_LINK, PRODUCT_MANAGEMENT_LINK_NAME } from 'app/shared/util/menu-link';
import { CircularProgress } from '@mui/material';

export const ProductInfoManagementUpdate = (props: RouteComponentProps<{ productId: string, productInfoId: string }>) => {
    const [isNew] = useState(!props.match.params || !props.match.params.productInfoId);
    const updating = useAppSelector(state => state.productInfoManagement.updating);
    const updateSuccess = useAppSelector(state => state.productInfoManagement.updateSuccess);
    const productInfo = useAppSelector(state => state.productInfoManagement.productInfo);
    const product = useAppSelector(state => state.productManagement.product);
    const errorMessage = useAppSelector(state => state.productInfoManagement.errorMessage);
    const [isInvalid, setIsInvalid] = useState(false);

    const loading = false;
    const productIdParam = props.match.params.productId
    const back_link = `/admin/product-info-management/${productIdParam}`
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getProduct(productIdParam));
    }, [])

    useEffect(() => {
        dispatch(resetMenuLink());
        dispatch(changeLink(PRODUCT_MANAGEMENT_LINK));
        dispatch(changeName(PRODUCT_MANAGEMENT_LINK_NAME));

        dispatch(changeLink2(PRODUCT_DETAIL_MANAGEMENT_LINK(productIdParam)));
        dispatch(changeName2(PRODUCT_DETAIL_MANAGEMENT_LINK_NAME(product.product_name)));

        dispatch(changeLink3(PRODUCT_INFO_MANAGEMENT_LINK(productIdParam)));
        dispatch(changeName3(PRODUCT_INFO_MANAGEMENT_LINK_NAME(product.product_name)));

        if (isNew)
            dispatch(changeName4("Thêm danh sách sản phẩm " + product.product_name));
        else
            dispatch(changeName4("Chỉnh sửa danh sách sản phẩm " + product.product_name));
    }, [product.product_name])

    useEffect(() => {
        dispatch(reset());
        if (!isNew) {
            dispatch(reset());
            dispatch(getProductInfo(props.match.params.productInfoId));
        }
    }, [props.match.params.productInfoId]);

    const saveProductInfo = values => {
        setIsInvalid(true)
        const input = { ...values, product_id: productIdParam }
        if (isNew) {
            dispatch(createProductInfo(input));
        } else {
            dispatch(updateProductInfo(input));
        }
    };

    const handleClose = () => {
        props.history.push(back_link);
    };

    const handleMessage = () => {
        dispatch(resetStatus());
        handleClose()
    }

    return (
        <div className='admin-management-update-container'>
            <Row className="justify-content-center mt-4">
                <Col md="6">
                    <h1>
                        {isNew ? "Đăng ký chi tiết sản phẩm" : "Chỉnh sửa chi tiết sản phẩm"}
                    </h1>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col md="6">
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <ValidatedForm onSubmit={saveProductInfo} defaultValues={productInfo}>
                            <span className='form-group'>Tên thông tin chi tiết sản phẩm</span>
                            <span className="required-mark">*</span>
                            <ValidatedField
                                type="text"
                                name="product_info_name"
                                required
                                validate={{
                                    maxLength: {
                                        value: 19,
                                        message: "Bạn chỉ được nhập dưới 20 ký tự",
                                    },
                                    required: {
                                        value: true,
                                        message: "Bạn phải nhập tên sản phẩm",
                                    }
                                }}
                            />

                            <br />
                            {/* BUTTON ==========================================================*/}
                            <Button tag={Link} to={back_link} replace color="danger">
                                <span className="d-none d-md-inline">
                                    Trở về
                                </span>
                            </Button>
                            &nbsp;
                            <Button color="success" type="submit" disabled={isInvalid || updating}>
                                {isInvalid ? <CircularProgress size={20} /> : "Lưu"}
                            </Button>
                        </ValidatedForm>
                    )}
                </Col>
            </Row>

            <div className='alert-bottom-right'>
                <AlertMessage type="UPDATE" isOpen={updateSuccess} onHandleMessage={handleMessage} isNew={isNew} timeOut="1000" />
                <AlertMessage type="ERROR" isOpen={errorMessage} onHandleMessage={() => dispatch(resetStatus())} timeOut="3000" />
            </div>
        </div >
    );
};

export default ProductInfoManagementUpdate;
