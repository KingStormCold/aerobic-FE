import { SelectChangeEvent } from '@mui/material';
import Loading from 'app/components/loading';
import { URL_PATH } from 'app/config/path';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { IUpdateSubject } from 'app/shared/model/subject';
import { updateSubject, getChildCategories, resetSubject } from 'app/shared/reducers/subject';
import { resetToastMessage, updateStateOpenToastMessage } from 'app/shared/reducers/toast-message';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';


export const SubjectUpdate = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const loading = useAppSelector(state => state.subject.loading);
  useEffect(() => {
    dispatch(getChildCategories())
  }, [])
  const categories = useAppSelector(state => state.subject.categories);
  const updateSubjectSuccess = useAppSelector(state => state.subject.updateSubjectSuccess);
  const subjectDetail = useAppSelector(state => state.subject.subject);
  const childCategoriesErrorMessage = useAppSelector(state => state.subject.childCategoriesErrorMessage);
  const updateSubjectErrorMessage = useAppSelector(state => state.subject.updateSubjectErrorMessage);

  useEffect(() => {
    if (childCategoriesErrorMessage) {
      dispatch(updateStateOpenToastMessage({ message: 'Lấy danh sách danh muc. ' + childCategoriesErrorMessage, isError: true }))
    }
  }, [childCategoriesErrorMessage])

  useEffect(() => {
    // kiểm tra nếu người dùng đứng ở trang chỉnh sửa mà ctrl + f5 thì sẽ đá về lại trang quản lý vì category bị undefined
    // => hk có data để chỉnh sửa
    if (subjectDetail.id === undefined) {
      history.push(URL_PATH.ADMIN.SUBJECT.MANAGEMENT)
    }
    if (subjectDetail) {
      setValue('subjectContent', subjectDetail?.content)
      setValue('subjectPromotionalPrice', subjectDetail?.promotional_price)
      setValue('subjectImage', subjectDetail?.image)
      setValue('categoryId', String(subjectDetail?.category_id))
      setCategoryId(String(subjectDetail?.category_id))
    }
  }, [subjectDetail])

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors }
  } = useForm<{
    subjectContent: string;
    subjectImage: string;
    subjectPromotionalPrice: number;
    categoryId: string;
  }>();

 const ediSubject = (data) => {
  const requestBody = {
    subject_content: 'data?.subjectContent',
    promotionalPriceSubject: Number(data?.subjectPromotionalPrice),
    subject_image: data?.subjectImage,
    category_id: data?.categoryId
  } as IUpdateSubject
  dispatch(updateSubject({id: subjectDetail?.id, requestBody}))
 }

  useEffect(() => {
    if (updateSubjectSuccess) {
      dispatch(updateStateOpenToastMessage({ message: 'Sửa môn học thành công', isError: false }))
      dispatch(resetSubject())
      history.push(URL_PATH.ADMIN.SUBJECT.MANAGEMENT)
    }
  }, [updateSubjectSuccess])

  useEffect(() => {
    if (updateSubjectErrorMessage) {
      dispatch(updateStateOpenToastMessage({ message: updateSubjectErrorMessage, isError: true }))
    }
  }, [updateSubjectErrorMessage])

  const [categoryId, setCategoryId] = useState('')
  const handleCategory = (event: SelectChangeEvent) => {
    setValue('categoryId', event.target.value)
    setCategoryId(event.target.value)
  }

  return (
    <>
      {loading && <Loading />}
      <h3>
        Thêm môn học
      </h3>
      <div>
        <Form onSubmit={handleSubmit(ediSubject)}>
          <Form.Group className="mb-3">
            <Form.Label>Nội dung</Form.Label>
            <Form.Control
              type="text"
              id="subjectContent"
              {...register('subjectContent', {
                required: true,
              })}
              isInvalid={errors.subjectContent?.type === 'required'}
            />
            {errors.subjectContent?.type === 'required' && (
              <Card.Text as="div" className='error-text'>Nội dung không được trống</Card.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Giá khuyến mãi</Form.Label>
            <Form.Control
              type="Number"
              id="subjectPromotionalPrice"
              {...register('subjectPromotionalPrice', {
                required: true,
              })}
              isInvalid={errors.subjectPromotionalPrice?.type === 'required'}
            />
            {errors.subjectPromotionalPrice?.type === 'required' && (
              <Card.Text as="div" className='error-text'>Giá khuyến mãi không được trống</Card.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Hình ảnh</Form.Label>
            <Form.Control
              type="text"
              id="subjectImage"
              {...register('subjectImage', {
                required: true,
              })}
              isInvalid={errors.subjectImage?.type === 'required'}
            />
            {errors.subjectImage?.type === 'required' && (
              <Card.Text as="div" className='error-text'>Nội dung không được trống</Card.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Danh mục</Form.Label>
            <Form.Select aria-label="Danh mục"
              value={categoryId}
              {...register('categoryId', {
                onChange(event) {
                  handleCategory(event)
                },
              })}
            >
              {categories && categories?.map((category, i) => (
                <option value={`${category.id}`} key={category.id}>{category.name}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Button type='submit' variant="success" className='btn-right'>Chỉnh sửa</Button>
        </Form>

      </div>
    </>

  );
};

export default SubjectUpdate;
