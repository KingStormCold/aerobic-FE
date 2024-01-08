import Loading from 'app/components/loading';
import { URL_PATH } from 'app/config/path';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { ICreateCategory } from 'app/shared/model/category';
import { createCategory, getParentCategories, resetCategory } from 'app/shared/reducers/category';
import { resetToastMessage, updateStateOpenToastMessage } from 'app/shared/reducers/toast-message';
import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { updateStateTitle } from 'app/shared/reducers/category-show';

export const CategoryCreate = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const loading = useAppSelector(state => state.category.loading);
  useEffect(() => {
    dispatch(getParentCategories())
  }, [])
  const parentCategories = useAppSelector(state => state.category.parentCategories);
  const createCategorySuccess = useAppSelector(state => state.category.createCategorySuccess);
  const parentCategoriesErrorMessage = useAppSelector(state => state.category.parentCategoriesErrorMessage);
  const createCategoryErrorMessage = useAppSelector(state => state.category.createCategoryErrorMessage);
  const title = useAppSelector(state => state.categoryShow.title);

  useEffect(() => {
    if (title === '') {
      dispatch(updateStateTitle("Directory"))
    }
  }, [title])

  useEffect(() => {
    if (parentCategoriesErrorMessage) {
      dispatch(updateStateOpenToastMessage({ message: 'Get the subcategory list. ' + parentCategoriesErrorMessage, isError: true }))
    }
  }, [parentCategoriesErrorMessage])

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors }
  } = useForm<{
    categoryName: string;
    parentCategory: string;
    status: number
  }>();

  const addCategory = (data) => {
    const requestBody = {
      category_name: data?.categoryName,
      status: data?.status ? 1 : 0,
    } as ICreateCategory
    if (data?.parentCategory !== "0") {
      requestBody.parent_id = data?.parentCategory
    }
    dispatch(createCategory(requestBody))
  }

  useEffect(() => {
    if (createCategorySuccess) {
      dispatch(updateStateOpenToastMessage({ message: 'Category added successfully', isError: false }))
      dispatch(resetCategory())
      history.push(URL_PATH.ADMIN.CATEGORY.MANAGEMENT)
    }
  }, [createCategorySuccess])

  useEffect(() => {
    if (createCategoryErrorMessage) {
      dispatch(updateStateOpenToastMessage({ message: createCategoryErrorMessage, isError: true }))
    }
  }, [createCategoryErrorMessage])

  return (
    <>
      {loading && <Loading />}
      <h3>
        Add a category
      </h3>
      <div>
        <Form onSubmit={handleSubmit(addCategory)}>
          <Form.Group className="mb-3">
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type="text"
              id="categoryName"
              {...register('categoryName', {
                required: true,
              })}
              isInvalid={errors.categoryName?.type === 'required'}
            />
            {errors.categoryName?.type === 'required' && (
              <Card.Text as="div" className='error-text'>Category is not empty</Card.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Parent category</Form.Label>
            <Form.Select aria-label="Parent category"
              {...register('parentCategory', {
              })}
            >
              <option value="0">Select parent category</option>
              {parentCategories && parentCategories?.map((category, i) => (
                <option value={`${category.id}`} key={category.id}>{category.name}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check
              type="switch"
              label="Active"
              {...register('status')}
            />
          </Form.Group>
          <Button type='submit' variant="success" className='btn-right'>Add</Button>
        </Form>

      </div>
    </>

  );
};

export default CategoryCreate;
