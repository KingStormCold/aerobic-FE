import Loading from 'app/components/loading';
import { URL_PATH } from 'app/config/path';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { createCourse, showSubject } from 'app/shared/reducers/course';
import { updateStateOpenToastMessage } from 'app/shared/reducers/toast-message';
import { EditorState } from 'draft-js';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { numberWithCommas } from 'app/shared/util/string-utils';
import { REX } from 'app/config/constants';

export interface ICreateCourse {
  name: string;
  subject_id: number;
  description: string;
  level: number;
  price: number;
  promotional_price: number;
  status: number
}

const CourseCreate = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const loading = useAppSelector(state => state.course.loading);
  const courses = useAppSelector(state => state.course.courses);
  const createCourseSuccess = useAppSelector(state => state.course.createCourseSuccess);
  const coursesErrorMessage = useAppSelector(state => state.course.coursesErrorMessage);
  const createCourseErrorMessage = useAppSelector(state => state.course.createCourseErrorMessage);
  const subject = useAppSelector(state => state.subject.subject);
  const [editorStateShortDescription, setEditorStateShortDescription] = useState(EditorState.createEmpty());
  const [priceCourse, setPriceCourse] = useState('');
  const [promotionalPrice, setPromotionalPrice] = useState('');

  useEffect(() => {
    if (subject.id === undefined) {
      history.push(URL_PATH.ADMIN.SUBJECT.MANAGEMENT)
    }
    if (subject.id) {
      setValue('price', '');
      setValue('promotionalPrice', '');
      setValue('subjectId', subject.id);
    }
  }, [subject]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<{
    name: string;
    subjectId: number;
    description: string;
    level: number;
    price: string;
    promotionalPrice: string;
    status: number;
  }>();

  const addCourse = data => {
    const price = data?.price.replaceAll('.', '')
    const promotionPrice = data?.promotionalPrice.replaceAll('.', '')
    const requestBody: ICreateCourse = {
      name: data.name,
      subject_id: data.subjectId,
      description: data.description,
      level: data.level,
      price,
      promotional_price: Number(promotionPrice),
      status: data?.status ? 1 : 0,
    };
    dispatch(createCourse(requestBody));
  };

  useEffect(() => {
    if (createCourseSuccess) {
      dispatch(
        updateStateOpenToastMessage({
          message: 'Course added successfully',
          isError: false,
        })
      );
      history.push(URL_PATH.ADMIN.COURSE.MANAGEMENT);
    }
  }, [createCourseSuccess, dispatch, history]);

  useEffect(() => {
    if (createCourseErrorMessage) {
      dispatch(
        updateStateOpenToastMessage({
          message: createCourseErrorMessage,
          isError: true,
        })
      );
    }
  }, [createCourseErrorMessage, dispatch]);

  const onEditorShortDescriptionStateChange = editorStateSD => {
    setEditorStateShortDescription(editorStateSD);
  };

  const [errorPrice, setErrorPrice] = useState('');
  const handlePriceCourse = (e) => {
    const value = e.target.value
    if (value !== '' && value !== '0') {
      const valueReplace = value.replaceAll('.', '')
      if (!REX.number.test(valueReplace)) {
        setErrorPrice('Price is not empty')
      } else {
        const convertMoney = numberWithCommas(valueReplace)
        setErrorPrice('')
        setValue('price', convertMoney)
        setPriceCourse(convertMoney);
      }
    } else {
      setErrorPrice('')
      setValue('price', '')
      setPriceCourse('')
    }
  }

  const [errorPromotionalPrice, setErrorPromotionalPrice] = useState('');
  const handlePromotionalPrice = (e) => {
    const value = e.target.value
    if (value !== '' && value !== '0') {
      const valueReplace = value.replaceAll('.', '')
      if (!REX.number.test(valueReplace)) {
        setErrorPromotionalPrice('Promotion price is not empty')
      } else {
        const convertMoney = numberWithCommas(valueReplace)
        setErrorPromotionalPrice('')
        setValue('promotionalPrice', convertMoney)
        setPromotionalPrice(convertMoney);
      }
    } else {
      setErrorPromotionalPrice('')
      setValue('promotionalPrice', '')
      setPromotionalPrice('')
    }
  }

  const handleBack = () => {
    history.push(URL_PATH.ADMIN.COURSE.MANAGEMENT);
  }

  return (
    <>
      {loading && <Loading />}
      <h3>Add Course</h3>
      <div>
        <Form onSubmit={handleSubmit(addCourse)}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="name">Course Name</Form.Label>
            <Form.Control
              type="text"
              id="name"
              {...register('name', {
                required: true,
                maxLength: 100,
              })}
              isInvalid={errors.name?.type === 'required' || errors.name?.type === 'maxLength'}
            />
            {errors.name?.type === 'required' && (
              <Card.Text as="div" className="error-text">
                Course name is not empty
              </Card.Text>
            )}
            {errors.name?.type === 'maxLength' && (
              <Card.Text as="div" className="error-text">
                Course name must not exceed 100 characters
              </Card.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="description">Course Description</Form.Label>
            <Form.Control
              type="text"
              id="description"
              {...register('description', { required: true })}
              isInvalid={errors.description?.type === 'required'}
            />
            {errors.description?.type === 'required' && (
              <Card.Text as="div" className='error-text'>Course description is not empty</Card.Text>
            )}
          </Form.Group>
          {/* <Form.Group className="mb-3">
            <Form.Label htmlFor="description">Mô tả khóa học</Form.Label>
            <Editor
              // {...register('description', { required: true })}
              editorState={editorStateShortDescription}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={onEditorShortDescriptionStateChange}
            />
            {errors.description?.type === 'required' && (
              <Card.Text as="div" className="error-text">
                Mô tả khóa học không được trống
              </Card.Text>
            )}
          </Form.Group> */}
          <Form.Group className="mb-3">
            <Form.Label htmlFor="level">Level</Form.Label>
            <Form.Control
              type="text"
              id="level"
              {...register('level', {
                required: true,
                validate: {
                  levelGreaterThan: value => value > 0,
                },
              })}
              isInvalid={errors.level?.type === 'required' || errors.level?.type === 'levelGreaterThan'}
            />
            {errors.level?.type === 'required' && (
              <Card.Text as="div" className="error-text">
                Level is not empty
              </Card.Text>
            )}
            {errors.level?.type === 'levelGreaterThan' && (
              <Card.Text as="div" className="error-text">
                Level must be greater than 0
              </Card.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="price">Price</Form.Label>
            <Form.Control
              type="text"
              id="price"
              value={priceCourse}
              {...register('price', {
                required: true,
                onChange(event) {
                  handlePriceCourse(event)
                },
              })}
              isInvalid={errors.price?.type === 'required' || errorPrice !== ''}
            />
            {errors.price?.type === 'required' && (
              <Card.Text as="div" className="error-text">
                Price is not empty
              </Card.Text>
            )}
            {errorPrice && (
              <Card.Text as="div" className="error-text">
                {errorPrice}
              </Card.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="promotionalPrice">Promotion price</Form.Label>
            <Form.Control
              type="text"
              id="promotionalPrice"
              value={promotionalPrice}
              {...register('promotionalPrice', {
                onChange(event) {
                  handlePromotionalPrice(event)
                },
              })}
              isInvalid={errorPromotionalPrice !== ''}
            />
            {errorPromotionalPrice && (
              <Card.Text as="div" className="error-text">
                {errorPromotionalPrice}
              </Card.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check
              type="switch"
              label="Active"
              {...register('status')}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="parentcourse">
            <Form.Label>Subject</Form.Label>
            <Form.Select
              aria-label="Môn học"
              {...register('subjectId', { required: true })}
              isInvalid={errors.subjectId?.type === 'required'}
            >
              <option value={`${subject.id}`}>
                {subject.name}
              </option>
            </Form.Select>
            {errors.subjectId?.type === 'required' && (
              <Card.Text as="div" className="error-text">
                Please select a subject
              </Card.Text>
            )}
          </Form.Group>
          <Button type="submit" variant="success" className="btn-right">
            Add
          </Button>
          <Button color='dark' variant="dark" className="btn-right mr-10" onClick={handleBack}>
            Back
          </Button>
          <br />
          <br />
        </Form>
      </div>
    </>
  );
};

export default CourseCreate;
