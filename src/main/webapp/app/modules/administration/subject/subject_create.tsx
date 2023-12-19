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
import { EditorState } from 'draft-js';
import './subject_create.scss';

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

  useEffect(() => {
    if (childCategoriesErrorMessage) {
      dispatch(updateStateOpenToastMessage({ message: 'Lấy danh sách danh mục. ' + childCategoriesErrorMessage, isError: true }))
    }
  }, [childCategoriesErrorMessage])

  useEffect(() => {
    console.log('categories', categories)
    if(categories.length > 0) {
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
    subjectContent: string;
    subjectImage: string;
    subjectPromotionalPrice: number;
    categoryId: number;
  }>();

  const addSubject = (data) => {
    const requestBody = {
      subject_content: 'data?.subjectContent',
      promotionalPriceSubject: Number(data?.subjectPromotionalPrice),
      subject_image: data?.subjectImage,
      category_id: data?.categoryId
    } as ICreateSubject
    dispatch(createSubject(requestBody))
  }

  useEffect(() => {
    if (createSubjectSuccess) {
      dispatch(updateStateOpenToastMessage({ message: 'Thêm môn học thành công', isError: false }))
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

  return (
    <>
      {loading && <Loading />}
      <h3>
        Thêm môn học
      </h3>
      <div>
        <Form onSubmit={handleSubmit(addSubject)}>
          <Form.Group className="mb-3">
            <Form.Label>Giá khuyến mãi</Form.Label>
            <Form.Control
              type="Number"
              id="subjectPromotionalPrice"
              {...register('subjectPromotionalPrice', {
                required: true,
                validate: {
                  promotionalPriceGreaterThan: value => value > 0,
                },
              })}
              isInvalid={errors.subjectPromotionalPrice?.type === 'required' || errors.subjectPromotionalPrice?.type === 'promotionalPriceGreaterThan'}
            />
            {errors.subjectPromotionalPrice?.type === 'required' && (
              <Card.Text as="div" className='error-text'>Giá khuyến mãi không được trống</Card.Text>
            )}
            {errors.subjectPromotionalPrice?.type === 'promotionalPriceGreaterThan' && (
              <Card.Text as="div" className='error-text'>Giá khuyến mãi phải lớn hơn 0</Card.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Hình ảnh</Form.Label>
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
              <Card.Text as="div" className='error-text'>Nội dung không được trống</Card.Text>
            )}
            {urlImage && <Image className='image-thumbnail' src={`${urlImage}`} thumbnail />}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Danh mục</Form.Label>
            <Form.Select aria-label="Danh mục"
              {...register('categoryId', {
              })}
            >      
              {categories && categories?.map((category, i) => (
                <option value={`${category.id}`} key={category.id}>{category.name}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Nội dung</Form.Label>
            <Editor
              // {...register('description', { required: true })}
              editorState={editorStateShortDescription}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={onEditorShortDescriptionStateChange}
            />
            {errors.subjectContent?.type === 'required' && (
              <Card.Text as="div" className="error-text">
                Nội dung không được trống
              </Card.Text>
            )}
          </Form.Group>
          <Button type='submit' variant="success" className='btn-right'>Thêm</Button>
        </Form>

      </div>
    </>

  );
};

export default SubjectCreate;
