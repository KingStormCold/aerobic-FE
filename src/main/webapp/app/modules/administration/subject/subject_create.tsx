import Loading from 'app/components/loading';
import { URL_PATH } from 'app/config/path';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { ICreateSubject } from 'app/shared/model/subject';
import { createSubject, getChildCategories, resetSubject } from 'app/shared/reducers/subject';
import { resetToastMessage, updateStateOpenToastMessage } from 'app/shared/reducers/toast-message';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import './subject_create.scss';
import draftToHtml from 'draftjs-to-html';
import { REX } from 'app/config/constants';
import { numberWithCommas } from 'app/shared/util/string-utils';
import { updateStateTitle } from 'app/shared/reducers/category-show';

export const SubjectCreate = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const loading = useAppSelector(state => state.subject.loading);
  useEffect(() => {
    dispatch(getChildCategories())
  }, [])
  const categories = useAppSelector(state => state.subject.categories);
  const createSubjectSuccess = useAppSelector(state => state.subject.createSubjectSuccess);
  const childCategoriesErrorMessage = useAppSelector(state => state.subject.childCategoriesErrorMessage);
  const createSubjectErrorMessage = useAppSelector(state => state.subject.createSubjectErrorMessage);
  const [editorStateShortDescription, setEditorStateShortDescription] = useState(EditorState.createEmpty());
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [inputContent, setInputContent] = useState("");
  const [isOpenContentPreview, setIsOpenContentPreview] = useState(false);
  const [subjectContent, setSubjectContent] = useState('')
  const title = useAppSelector(state => state.categoryShow.title);

  useEffect(() => {
    if (title === '') {
      dispatch(updateStateTitle("Môn học"))
    }
  }, [title])

  useEffect(() => {
    if (childCategoriesErrorMessage) {
      dispatch(updateStateOpenToastMessage({ message: 'Get the category list. ' + childCategoriesErrorMessage, isError: true }))
    }
  }, [childCategoriesErrorMessage])

  useEffect(() => {
    console.log('categories', categories)
    if (categories.length > 0) {
      setValue('categoryId', categories[0].id);
    }
  }, [categories])

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors }
  } = useForm<{
    content: string,
    subjectImage: string;
    subjectPromotionalPrice: string;
    categoryId: number;
  }>();

  const addSubject = (data) => {
    const subjectPromotionalPrice = data?.subjectPromotionalPrice.replaceAll('.', '')
    const requestBody = {
      subject_content: subjectContent,
      promotional_price_subject: Number(subjectPromotionalPrice),
      subject_image: data?.subjectImage,
      category_id: data?.categoryId
    } as ICreateSubject
    dispatch(createSubject(requestBody))
  }

  useEffect(() => {
    if (createSubjectSuccess) {
      dispatch(updateStateOpenToastMessage({ message: 'More successful subjects', isError: false }))
      dispatch(resetSubject())
      history.push(URL_PATH.ADMIN.SUBJECT.MANAGEMENT)
    }
  }, [createSubjectSuccess])

  useEffect(() => {
    if (createSubjectErrorMessage) {
      dispatch(updateStateOpenToastMessage({ message: createSubjectErrorMessage, isError: true }))
    }
  }, [createSubjectErrorMessage])

  const onEditorShortDescriptionStateChange = editorStateSD => {
    setEditorStateShortDescription(editorStateSD);
  };

  const [urlImage, setUrlImage] = useState('')
  const handleImageSubject = (e) => {
    setUrlImage(e.target.value);
  }

  const convertImages = (htmlText) => {
    if (!htmlText.includes('<div style="text-align')) {
      let convertText = htmlText.replace('<img src="', '<div style="text-align:center;"><img src="')
      convertText = convertText.replace('" alt="undefined" style="height: auto;width: auto"/>', '" alt="undefined" style="height: auto;width: auto"></div>')
      return convertText
    }
    return htmlText.replace('<div style="text-align:none;"><img', '<div style="text-align:center;"><img')
  }

  const onEditorStateChange = (editorState1) => {
    setEditorState(editorState1);
    document.getElementById("editContent").textContent
    setSubjectContent(JSON.stringify(convertToRaw(editorState1.getCurrentContent())))
    setValue('content', JSON.stringify(convertToRaw(editorState1.getCurrentContent())))
  }

  const [subjectPromotionalPrice, setSubjectPromotionalPrice] = useState('');
  const [errorPrice, setErrorPrice] = useState('');
  const handlePriceCourse = (e) => {
    const value = e.target.value
    if (value !== '' && value !== '0') {
      const valueReplace = value.replaceAll('.', '')
      if (!REX.number.test(valueReplace)) {
        setErrorPrice('Giá phải là số')
      } else {
        const convertMoney = numberWithCommas(valueReplace)
        setErrorPrice('')
        setValue('subjectPromotionalPrice', convertMoney)
        setSubjectPromotionalPrice(convertMoney);
      }
    } else {
      setErrorPrice('')
      setValue('subjectPromotionalPrice', '')
      setSubjectPromotionalPrice('')
    }
  }

  const handleBack = () => {
    history.push(URL_PATH.ADMIN.SUBJECT.MANAGEMENT);
  }

  return (
    <>
      {loading && <Loading />}
      <h3>
      More subjects
      </h3>
      <div>
        <Form onSubmit={handleSubmit(addSubject)}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="price">Promo price</Form.Label>
            <Form.Control
              type="text"
              id="price"
              value={subjectPromotionalPrice}
              {...register('subjectPromotionalPrice', {
                required: true,
                onChange(event) {
                  handlePriceCourse(event)
                },
              })}
              isInvalid={errors.subjectPromotionalPrice?.type === 'required' || errorPrice !== ''}
            />
            {errors.subjectPromotionalPrice?.type === 'required' && (
              <Card.Text as="div" className="error-text">
                Promo price<i></i> cant be empty
              </Card.Text>
            )}
            {errorPrice && (
              <Card.Text as="div" className="error-text">
                {errorPrice}
              </Card.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              id="subjectImage"
              {...register('subjectImage', {
                required: true,
                onChange(event) {
                  handleImageSubject(event)
                },
              })}
              isInvalid={errors.subjectImage?.type === 'required'}
            />
            {errors.subjectImage?.type === 'required' && (
              <Card.Text as="div" className='error-text'>Content cant be blank</Card.Text>
            )}
            {urlImage && <Image className='image-thumbnail' src={`${urlImage}`} thumbnail />}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Directory</Form.Label>
            <Form.Select aria-label="Danh mục"
              {...register('categoryId', {
                required: true
              })}
            >
              {categories && categories?.map((category, i) => (
                <option value={`${category.id}`} key={category.id}>{category.name}</option>
              ))}
            </Form.Select>
            {errors.categoryId?.type === 'required' && (
              <Card.Text as="div" className='error-text'>Categories cant be empty</Card.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Content</Form.Label>
            <Editor
              {...register('content', { required: true })}
              editorState={editorState}
              wrapperClassName="wrapper-class"
              editorClassName="editor-class"
              toolbarClassName="toolbar-class"
              onEditorStateChange={onEditorStateChange}
              onChange={() => setInputContent(document.getElementById("editContent").textContent)}
            />
            {errors.content?.type === 'required' && (
              <Card.Text as="div" className="error-text">
                Content cant be blank
              </Card.Text>
            )}
            <div hidden id="editContent">
              {editorState &&
                convertImages(draftToHtml(convertToRaw(editorState.getCurrentContent())))}
            </div>

            {(inputContent) &&
              <div className='open-review-link mt-3' onClick={() => setIsOpenContentPreview(!isOpenContentPreview)}>{isOpenContentPreview ? 'Ẩn' : 'Xem trước'} Content</div>
            }

            {isOpenContentPreview &&
              <div className='content-review' dangerouslySetInnerHTML={{ __html: inputContent }} />
            }
          </Form.Group>
          <Button type='submit' variant="success" className='btn-right'>Add</Button>
          <Button color='dark' variant="dark" className="btn-right mr-10" onClick={handleBack}>
          Back
          </Button>
        </Form>

      </div>
    </>

  );
};

export default SubjectCreate;
