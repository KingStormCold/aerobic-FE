import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import React, { useState } from 'react';
import { ValidatedField, ValidatedForm } from 'react-jhipster';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import "../modules/administration/product-management/product-management.scss";

import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { useEffect } from 'react';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { CircularProgress } from '@mui/material';
import { isJsonString } from 'app/shared/util/string-utils';


export const ProductForm = props => {

    const { isNew,
        isDetailPage,
        product,
        defaultCategoryValue,
        childCategories,
        updating,
        onSaveProduct,
        setEditorSaveContent,
        categoryName,
        shortDescription,
        setShortDescription,
        infoInsurance,
        setInfoInsurance,
        originalPrice,
        setOriginalPrice,
        setEditorSaveShortDescription,
        setEditorSaveInfoInsurance,
        isInvalid,
    } = props

    const [previewimageUrl, setPreviewimageUrl] = useState("");
    const [isOpenContentPreview, setIsOpenContentPreview] = useState(false);
    const [inputContent, setInputContent] = useState("");
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [editorStateShortDescription, setEditorStateShortDescription] = useState(EditorState.createEmpty());
    const [editorStateInfoInsurance, setEditorStateInfoInsurance] = useState(EditorState.createEmpty());


    const onEditorStateChange = (editorState1) => {
        setEditorState(editorState1);
        document.getElementById("editContent").textContent
        setEditorSaveContent(JSON.stringify(convertToRaw(editorState1.getCurrentContent())))
    }

    const onEditorShortDescriptionStateChange = (editorStateSD) => {
        setEditorStateShortDescription(editorStateSD);
        setEditorSaveShortDescription(JSON.stringify(convertToRaw(editorStateSD.getCurrentContent())))
    }

    const onEditorInfoInsuranceStateChange = (editorStateII) => {
        setEditorStateInfoInsurance(editorStateII);
        setEditorSaveInfoInsurance(JSON.stringify(convertToRaw(editorStateII.getCurrentContent())))
    }

    const convertImages = (htmlText) => {
        if (!htmlText.includes('<div style="text-align')) {
            let convertText = htmlText.replace('<img src="', '<div style="text-align:center;"><img src="')
            convertText = convertText.replace('" alt="undefined" style="height: auto;width: auto"/>', '" alt="undefined" style="height: auto;width: auto"></div>')
            return convertText
        }
        return htmlText.replace('<div style="text-align:none;"><img', '<div style="text-align:center;"><img')
    }

    useEffect(() => {
        if (isJsonString(product.content)) {
            setEditorState(EditorState.createWithContent(
                convertFromRaw(JSON.parse(product.content))
            ),)
        } else {
            setEditorState(EditorState.createEmpty())
        }

        if (isJsonString(product.sort_description)) {
            setEditorStateShortDescription(EditorState.createWithContent(
                convertFromRaw(JSON.parse(product.sort_description))
            ),)
        } else {
            setEditorStateShortDescription(EditorState.createEmpty())
        }

        if (isJsonString(product.info_insurance)) {
            setEditorStateInfoInsurance(EditorState.createWithContent(
                convertFromRaw(JSON.parse(product.info_insurance))
            ),)
        } else {
            setEditorStateInfoInsurance(EditorState.createEmpty())
        }

        setPreviewimageUrl(product.image)
    }, [childCategories, product])

    return (
        <ValidatedForm onSubmit={onSaveProduct} defaultValues={product}>
            <span className='form-group'>Tên sản phẩm</span>
            <span className="required-mark">*</span>
            <ValidatedField
                type="text"
                name="product_name"
                disabled={isDetailPage}
                validate={{
                    maxLength: {
                        value: 99,
                        message: "Bạn chỉ được nhập dưới 100 ký tự",
                    },
                    required: {
                        value: true,
                        message: "Bạn phải nhập tên sản phẩm",
                    }
                }}
            />

            <span className='form-group'>Danh mục sản phẩm</span>
            <span className="required-mark">*</span>
            <br />

            {isDetailPage ?
                <ValidatedField
                    type="text"
                    name="category_id"
                    value={categoryName}
                    disabled={isDetailPage}
                />
                : (defaultCategoryValue) &&
                <ValidatedField type="select" name="category_id" >

                    <option value={defaultCategoryValue?.categoryId}>{defaultCategoryValue?.categoryName}</option>

                    {childCategories?.map((category, i) =>
                        (i !== 0) &&
                        <option value={category.categoryId} key={category.categoryId}>
                            {category.categoryName}
                        </option>
                    )}
                </ValidatedField>
            }

            <span className='form-group'>Mô tả ngắn sản phẩm</span>
            <span className="required-mark">*</span>
            <div className="form-group hidden-img-insert-icon">
                {isDetailPage
                    ?
                    editorStateShortDescription &&
                    <div className='form-control disabled-form' dangerouslySetInnerHTML={{ __html: convertImages(draftToHtml(convertToRaw(editorStateShortDescription.getCurrentContent()))) }} />


                    : <>
                        <Editor
                            editorState={editorStateShortDescription}
                            onEditorStateChange={onEditorShortDescriptionStateChange}
                            wrapperClassName="wrapper-class"
                            editorClassName="editor-class"
                            toolbarClassName="toolbar-class"
                        />
                    </>
                }
            </div>

            <span className='form-group'>Hình ảnh</span>
            <span className="required-mark">*</span>
            <br />

            <ValidatedField
                placeholder='Nhập URL hình ảnh'
                type="text"
                name="image"
                value={previewimageUrl}
                disabled={isDetailPage}
                onChange={(e) => setPreviewimageUrl(e.target.value)}
                validate={{
                    required: {
                        value: true,
                        message: "Bạn phải nhập URL hình ảnh",
                    }
                }}
            />


            {previewimageUrl &&
                <div className='preview-image-container'>

                    {!isDetailPage && <p className='preview-image-icon' onClick={() => setPreviewimageUrl("")} >
                        <HighlightOffIcon />
                    </p>}
                    <img
                        className='preview-image'
                        src={previewimageUrl}
                        alt=""
                    />
                </div>
            }

            <span className='form-group'>Thông tin bảo hành</span>
            <div className="form-group hidden-img-insert-icon">
                {isDetailPage
                    ? editorState &&
                    <div className='form-control disabled-form' dangerouslySetInnerHTML={{ __html: convertImages(draftToHtml(convertToRaw(editorStateInfoInsurance.getCurrentContent()))) }} />
                    : <>
                        <Editor
                            className="form-group"
                            editorState={editorStateInfoInsurance}
                            onEditorStateChange={onEditorInfoInsuranceStateChange}
                            wrapperClassName="wrapper-class"
                            editorClassName="editor-class"
                            toolbarClassName="toolbar-class"
                        />
                    </>
                }
            </div>

            <span className='form-group'>Nội dung</span>
            <br />
            <div className="form-group">
                {isDetailPage
                    ? editorState &&
                    <div className='form-control disabled-form' dangerouslySetInnerHTML={{ __html: convertImages(draftToHtml(convertToRaw(editorState.getCurrentContent()))) }} />

                    : <>
                        <Editor
                            editorState={editorState}
                            onEditorStateChange={onEditorStateChange}
                            wrapperClassName="wrapper-class"
                            editorClassName="editor-class"
                            toolbarClassName="toolbar-class"
                            onChange={() => setInputContent(document.getElementById("editContent").textContent)}
                        />

                        {/* TODO: hiển thị đoạn nội dung để đem xuống DB */}
                        <div hidden id="editContent">
                            {editorState &&
                                convertImages(draftToHtml(convertToRaw(editorState.getCurrentContent())))}
                        </div>

                        {(inputContent) &&
                            <div className='open-review-link mt-3' onClick={() => setIsOpenContentPreview(!isOpenContentPreview)}>{isOpenContentPreview ? 'Ẩn' : 'Xem trước'} nội dung</div>
                        }

                        {isOpenContentPreview &&
                            <div className='content-review' dangerouslySetInnerHTML={{ __html: inputContent }} />
                        }
                    </>
                }
            </div>

            {/* BUTTON ==========================================================*/}
            {
                !isDetailPage &&
                <>
                    <Button tag={Link} to="/admin/product-management" replace color="danger">
                        <span className="d-none d-md-inline">
                            Trở về
                        </span>
                    </Button>
                    &nbsp;
                    <Button color="success" type="submit" disabled={isInvalid || updating}>
                        {isInvalid ? <CircularProgress size={20} /> : "Lưu"}
                    </Button>
                </>
            }
        </ValidatedForm >

    );
};

export default ProductForm;
