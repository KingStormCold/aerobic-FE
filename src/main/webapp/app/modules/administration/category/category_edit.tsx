import { SelectChangeEvent } from '@mui/material';
import Loading from 'app/components/loading';
import { URL_PATH } from 'app/config/path';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { ICreateCategory } from 'app/shared/model/category';
import { getParentCategories, resetCategory, updateCategory } from 'app/shared/reducers/category';
import { resetToastMessage, updateStateOpenToastMessage } from 'app/shared/reducers/toast-message';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

export const CategoryEdit = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const loading = useAppSelector(state => state.category.loading);
  useEffect(() => {
    dispatch(getParentCategories())
  }, [])
  const parentCategories = useAppSelector(state => state.category.parentCategories);
  const updateCategorySuccess = useAppSelector(state => state.category.updateCategorySuccess);
  const categoryDetail = useAppSelector(state => state.category.category);
  const parentCategoriesErrorMessage = useAppSelector(state => state.category.parentCategoriesErrorMessage);
  const updateCategoryErrorMessage = useAppSelector(state => state.category.updateCategoryErrorMessage);
  const [parentCategory, setParentCategory] = useState('')

  useEffect(() => {
    if (parentCategoriesErrorMessage) {
      dispatch(updateStateOpenToastMessage({ message: 'Lấy danh sách danh mục cha. ' + parentCategoriesErrorMessage, isError: true }))
    }
  }, [parentCategoriesErrorMessage])

  useEffect(() => {
    // kiểm tra nếu người dùng đứng ở trang chỉnh sửa mà ctrl + f5 thì sẽ đá về lại trang quản lý vì category bị undefined
    // => hk có data để chỉnh sửa
    if (categoryDetail.id === undefined) {
      history.push(URL_PATH.ADMIN.CATEGORY.MANAGEMENT)
    }
    if (categoryDetail) {
      setValue('categoryName', categoryDetail?.name)
      setValue('parentCategory', categoryDetail?.parent_id)
      setParentCategory(categoryDetail?.parent_id)
    }
  }, [categoryDetail])

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setValue,
    formState: { errors }
  } = useForm<{
    categoryName: string;
    parentCategory: string;
  }>();

  const editCategory = (data) => {
    const requestBody = {
      category_name: data?.categoryName
    } as ICreateCategory
    if (data?.parentCategory !== "0") {
      requestBody.parent_id = data?.parentCategory
    } else {
      requestBody.parent_id = ""
    }
    dispatch(updateCategory({ id: categoryDetail?.id, requestBody }))
  }

  useEffect(() => {
    if (updateCategorySuccess) {
      dispatch(updateStateOpenToastMessage({ message: 'Sửa danh mục thành công', isError: false }))
      dispatch(resetCategory())
      history.push(URL_PATH.ADMIN.CATEGORY.MANAGEMENT)
    }
  }, [updateCategorySuccess])

  const handleParentCategory = (event: SelectChangeEvent) => {
    setParentCategory(event.target.value)
    setValue('parentCategory', event.target.value)
  }

  useEffect(() => {
    if (updateCategoryErrorMessage) {
      dispatch(updateStateOpenToastMessage({ message: updateCategoryErrorMessage, isError: true }))
    }
  }, [updateCategoryErrorMessage])

  return (
    <>
      {loading && <Loading />}
      <h3>
        Sửa danh mục
      </h3>
      <div>
        <Form onSubmit={handleSubmit(editCategory)}>
          <Form.Group className="mb-3">
            <Form.Label>Tên danh mục</Form.Label>
            <Form.Control
              type="text"
              id="categoryName"
              {...register('categoryName', {
                required: true,
              })}
              isInvalid={errors.categoryName?.type === 'required'}
            />
            {errors.categoryName?.type === 'required' && (
              <Card.Text as="div" className='error-text'>Tên danh mục không được trống</Card.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Danh mục cha</Form.Label>
            <Form.Select aria-label="Danh mục cha" value={parentCategory}
              {...register('parentCategory', {
                onChange(event) {
                  handleParentCategory(event)
                },
              })}
            >
              <option value="0">Chọn danh mục cha</option>
              {parentCategories && parentCategories?.map((category, i) => (
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

export default CategoryEdit;
