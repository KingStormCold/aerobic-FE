import { useAppDispatch, useAppSelector } from 'app/config/store';
import { createProduct, getChildCategories, getProduct, reset, resetStatus, updateProduct } from 'app/shared/reducers/product';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Alert, Col, Row } from 'reactstrap';
import "./product-management.scss";

import ProductForm from 'app/components/product-form';
import { changeLink, changeName, resetMenuLink, changeName2, changeLink2 } from 'app/shared/reducers/menu';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { defaultValue } from './../../../shared/model/product.model';
import { PRODUCT_MANAGEMENT_ADD_LINK, PRODUCT_MANAGEMENT_ADD_LINK_NAME, PRODUCT_MANAGEMENT_UPDATE_LINK, PRODUCT_MANAGEMENT_UPDATE_LINK_NAME, PRODUCT_MANAGEMENT_LINK, PRODUCT_MANAGEMENT_LINK_NAME } from 'app/shared/util/menu-link';
import AlertMessage from 'app/components/alertMessage';
import { stubTrue } from 'lodash';

export const ProductManagementUpdate = (props: RouteComponentProps<{ productId: string }>) => {
    const [isNew] = useState(!props.match.params || !props.match.params.productId);
    const [defaultCategoryValue, setDefaultCategoryValue] = useState(null);
    const [originalPrice, setOriginalPrice] = useState("");
    const [shortDescription, setShortDescription] = useState("");
    const [infoInsurance, setInfoInsurance] = useState("");

    const dispatch = useAppDispatch();
    const loading = false;
    const updating = useAppSelector(state => state.productManagement.updating);
    const childCategories = useAppSelector(state => state.productManagement.childCategories);
    const updateSuccess = useAppSelector(state => state.productManagement.updateSuccess);
    const product = useAppSelector(state => state.productManagement.product);
    const errorMessage = useAppSelector(state => state.productManagement.errorMessage);

    const [editorSaveContent, setEditorSaveContent] = useState("");
    const [editorSaveShortDescription, setEditorSaveShortDescription] = useState("");
    const [editorSaveInfoInsurance, setEditorSaveInfoInsurance] = useState("");
    const [isInvalid, setIsInvalid] = useState(false);

    useEffect(() => {
        if (!isNew) {
            setShortDescription(product.sort_description)
            setInfoInsurance(product.info_insurance)
            setEditorSaveContent(product.content)
            setEditorSaveShortDescription(product.sort_description)
            setEditorSaveInfoInsurance(product.info_insurance)
        }
    }, [product])

    useEffect(() => {
        dispatch(resetMenuLink());
        if (isNew) {
            dispatch(changeLink(PRODUCT_MANAGEMENT_LINK));
            dispatch(changeName(PRODUCT_MANAGEMENT_LINK_NAME));

            dispatch(changeName2(PRODUCT_MANAGEMENT_ADD_LINK_NAME));
        }
        else {
            dispatch(changeLink(PRODUCT_MANAGEMENT_LINK));
            dispatch(changeName(PRODUCT_MANAGEMENT_LINK_NAME));

            dispatch(changeName2(PRODUCT_MANAGEMENT_UPDATE_LINK_NAME));
            dispatch(getProduct(props.match.params.productId));
        }
    }, [])

    useEffect(() => {
        setDefaultCategoryValue(childCategories[0])
        if (product !== defaultValue) {
            const search = obj => obj.categoryId === product.category_id;
            const categorySelected = childCategories.find(search);
            (categorySelected ? setDefaultCategoryValue(categorySelected) : setDefaultCategoryValue(childCategories[0]))
        }
    }, [childCategories, product])

    useEffect(() => {
        dispatch(reset());
        dispatch(getChildCategories());
    }, [props.match.params.productId]);

    const saveProduct = values => {
        setIsInvalid(true)

        const input = {
            ...values,
            content: editorSaveContent,
            sort_description: editorSaveShortDescription,
            info_insurance: editorSaveInfoInsurance
        }

        if (isNew) {
            dispatch(createProduct(input));
        } else {
            dispatch(updateProduct(input));
        }
    };

    const handleClose = () => {
        props.history.push('/admin/product-management');
    };

    const handleMessage = () => {
        dispatch(resetStatus());
        handleClose();
    }

    return (
        <div className='admin-management-update-container'>
            <Row className="justify-content-center">
                <Col md="6">
                    <h1>
                        {isNew ? "Đăng ký sản phẩm" : "Chỉnh sửa sản phẩm"}
                    </h1>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <ProductForm
                            isNew={isNew}
                            product={product}
                            defaultCategoryValue={defaultCategoryValue}
                            childCategories={childCategories}
                            updating={updating}
                            onSaveProduct={saveProduct}
                            setEditorSaveContent={setEditorSaveContent}
                            shortDescription={shortDescription}
                            setShortDescription={setShortDescription}
                            infoInsurance={infoInsurance}
                            setInfoInsurance={setInfoInsurance}
                            originalPrice={originalPrice}
                            setOriginalPrice={setOriginalPrice}
                            setEditorSaveShortDescription={setEditorSaveShortDescription}
                            setEditorSaveInfoInsurance={setEditorSaveInfoInsurance}
                            isInvalid={isInvalid}
                        />
                    )}
                </Col>
            </Row>

            <div className='alert-bottom-right'>
                <AlertMessage type="UPDATE" isOpen={updateSuccess} onHandleMessage={handleMessage} timeOut="1000" isNew={isNew} />
                <AlertMessage type="ERROR" isOpen={errorMessage} onHandleMessage={() => dispatch(resetStatus())} timeOut="3000" />
            </div>
        </div >
    );
};

export default ProductManagementUpdate;
