import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import "./category-management.scss";
import { ValidatedField, ValidatedForm } from 'react-jhipster';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Alert, Button, Col, Row } from 'reactstrap';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { createCategory, getCategory, getRootCategories, reset, updateCategory, resetUpdateMessage } from './../../../shared/reducers/category';
import { changeName, resetMenuLink } from './../../../shared/reducers/menu';
import { resetError } from 'app/shared/reducers/category';
import { CircularProgress } from '@mui/material';

export const CategoryManagementUpdate = (props: RouteComponentProps<{ categoryId: string }>) => {
    const [isNew] = useState(!props.match.params || !props.match.params.categoryId);
    const dispatch = useAppDispatch();
    const [isInvalid, setIsInvalid] = useState(false);
    const [isRootCategory, setIsRootCategory] = useState(true);

    const loading = useAppSelector(state => state.categoryManagement.loading);
    const updating = useAppSelector(state => state.categoryManagement.updating);
    const category = useAppSelector(state => state.categoryManagement.category);
    const rootCategories = useAppSelector(state => state.categoryManagement.rootCategories);

    const updateSuccess = useAppSelector(state => state.categoryManagement.updateSuccess);
    const errorMessage = useAppSelector(state => state.categoryManagement.errorMessage);
    const updateError = useAppSelector(state => state.categoryManagement.updateError);
    const isChild = useAppSelector(state => state.categoryManagement.isChild);

    const initSelected = useAppSelector(state => state.categoryManagement.selected);
    const [parentSelected, setParentSelected] = useState(isNew ? 0 : initSelected);
    const [displayInSlider, setDisplayInSlider] = useState(false);
    const categoryNameDup = useAppSelector(state => state.categoryManagement.categoryNameDup);

    if (updateSuccess) {
        setTimeout(() => {
            handleClose()
        }, 1000);
    }

    useEffect(() => {
        if (updateError) {
            if (isNew) {
                dispatch(reset());
            } else {
                dispatch(getCategory(props.match.params.categoryId));
            }
            dispatch(getRootCategories());
        }
    }, [updateError])

    useEffect(() => {
        setDisplayInSlider(category.display_in_slider)
        setIsRootCategory(category.category_parent === null)
    }, [category])

    useEffect(() => {
        dispatch(reset());
        if (!isNew) {
            dispatch(getCategory(props.match.params.categoryId));
        }
        dispatch(getRootCategories());
    }, [props.match.params.categoryId]);

    useEffect(() => {
        setTimeout(() => {
            dispatch(resetError())
        }, 10000);
        setIsInvalid(false)
    }, [categoryNameDup])


    useEffect(() => {
        dispatch(resetMenuLink());
        if (isNew) {
            dispatch(changeName("Thêm danh mục"));
            setIsRootCategory(true)
        }
        else
            dispatch(changeName("Sửa danh mục"));
    }, [])

    const handleClose = () => {
        props.history.push('/admin/category-management');
    };

    const saveCategory = values => {
        setIsInvalid(true);
        if (values.category_root === '0') values = { ...values, category_root: null };

        if (isNew) {
            dispatch(createCategory(values));
        } else {
            setTimeout(() => {
                dispatch(resetUpdateMessage())
            }, 10000);
            dispatch(updateCategory(values));
        }
    };

    const handleChange = (event) => {
        if (!isNew) setParentSelected(event.target.value);

        if (event.target.value === "0") {
            setIsRootCategory(true)
            setDisplayInSlider(false)
        }
        else setIsRootCategory(false)
    };

    useEffect(() => {
        setParentSelected(initSelected)
    }, [initSelected]);

    return (
        <div className='admin-management-update-container'>
            <Row className="justify-content-center mt-4">
                <Col md="6">
                    <h1>
                        {isNew ? "Đăng ký danh mục" : "Chỉnh sửa danh mục"}
                    </h1>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col md="6">
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <ValidatedForm onSubmit={saveCategory} defaultValues={category}>

                            <span className='form-group'>Tên danh mục </span>
                            <span className="required-mark">*</span>
                            <ValidatedField
                                type="text"
                                name="category_name"
                                validate={{
                                    maxLength: {
                                        value: 19,
                                        message: "Bạn chỉ được nhập dưới 20 ký tự",
                                    },
                                    required: {
                                        value: true,
                                        message: "Bạn phải nhập tên category",
                                    }
                                }}
                            />

                            <span className='form-group'>Mô tả danh mục</span>
                            <ValidatedField
                                type="textarea"
                                name="category_description"
                                validate={{
                                    maxLength: {
                                        value: 255,
                                        message: "Bạn chỉ được nhập tối đa 255 ký tự",
                                    }
                                }}
                            />

                            <span className='form-group'>Danh mục cha</span>
                            {
                                isNew ?
                                    (
                                        <ValidatedField type="select" name="category_root" onChange={handleChange}>
                                            <option selected value="0">Vui lòng chọn danh mục cha</option>
                                            {rootCategories?.map(rootCategory => (
                                                <option value={rootCategory.categoryId} key={rootCategory.categoryId} >
                                                    {rootCategory.categoryName}
                                                </option>
                                            ))}
                                        </ValidatedField>
                                    )
                                    :
                                    (
                                        isChild ?
                                            <ValidatedField type="select" name="category_root" value={parentSelected} onChange={handleChange}>
                                                <option value="0">Vui lòng chọn danh mục cha</option>
                                                {rootCategories?.map(rootCategory =>
                                                    category.category_id === rootCategory.category_id ?
                                                        (
                                                            <option selected value={rootCategory.categoryId} key={rootCategory.categoryId} >
                                                                {rootCategory.categoryName}
                                                            </option>
                                                        ) :
                                                        (
                                                            <option value={rootCategory.categoryId} key={rootCategory.categoryId} >
                                                                {rootCategory.categoryName}
                                                            </option>
                                                        )
                                                )}
                                            </ValidatedField>
                                            :
                                            <ValidatedField type="select" name="category_root" value={parentSelected} onChange={handleChange}>
                                                <option value="0">Vui lòng chọn danh mục cha</option>
                                                {rootCategories.map((rootCategory, i) => {
                                                    if (rootCategory.categoryId !== props.match.params.categoryId) {
                                                        return (
                                                            <option value={rootCategory.categoryId} key={rootCategory.categoryId}>
                                                                {rootCategory.categoryName}
                                                            </option>
                                                        )
                                                    }
                                                }
                                                )}
                                            </ValidatedField>
                                    )
                            }

                            <ValidatedField id="displayInSlider" type="checkbox" hidden={isRootCategory} name="display_in_slider" value={displayInSlider} check label="Hiển thị ngoài giao diện" onChange={() => setDisplayInSlider(!displayInSlider)} />

                            <br />

                            {/* BUTTON ==========================================================*/}
                            <Button tag={Link} to="/admin/category-management" replace color="danger">
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
                {updateSuccess
                    ? (<Alert color="success">{isNew ? "Đăng ký" : "Chỉnh sửa"} thành công</Alert>)
                    : ''
                }

                {errorMessage
                    ? (<Alert color="danger">{errorMessage}</Alert>)
                    : ''
                }

                {categoryNameDup
                    ? (<Alert color="danger">Tên danh mục đã được đăng ký</Alert>)
                    : ''
                }

            </div>

            <br />
            <br />
            <br />
            <div className="alert-bottom-right">
                <Alert isOpen={updateError.length !== 0} color="danger">{updateError.map((element, i) => (
                    <span key={i}>{element}<br /></span>
                ))}</Alert>
            </div>
        </div>
    );
};

export default CategoryManagementUpdate;
