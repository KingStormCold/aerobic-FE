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
import './course_create.scss';
import { numberWithCommas } from 'app/shared/util/string-utils';
import { REX } from 'app/config/constants';

export interface ICreateCourse {
  name: string;
  subject_id: number;
  description: string;
  level: number;
  price: number;
  promotional_price: number;
}

const CourseCreate = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const loading = useAppSelector(state => state.course.loading);
  const courses = useAppSelector(state => state.course.courses);
  const createCourseSuccess = useAppSelector(state => state.course.createCourseSuccess);
  const coursesErrorMessage = useAppSelector(state => state.course.coursesErrorMessage);
  const createCourseErrorMessage = useAppSelector(state => state.course.createCourseErrorMessage);
  const subjects = useAppSelector(state => state.course.subjects);
  const [editorStateShortDescription, setEditorStateShortDescription] = useState(EditorState.createEmpty());
  const [priceCourse, setPriceCourse] = useState('');
  const [promotionalPrice, setPromotionalPrice] = useState('');
  useEffect(() => {
    dispatch(showSubject());
    setValue('price', '');
    setValue('promotionalPrice', '');
  }, []);

  useEffect(() => {
    if (subjects.length > 0) {
      setValue('subjectId', subjects[0].id);
    }
  }, [subjects]);

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
  }>();

  const addCourse = data => {
    const price = data?.price.replaceAll('.', '')
    const promotionPrice = data?.promotionalPrice.replaceAll('.', '')
    const requestBody: ICreateCourse = {
      name: data.name,
      subject_id: data.subject_id,
      description: data.description,
      level: data.level,
      price,
      promotional_price: promotionPrice,
    };
    dispatch(createCourse(requestBody));
  };

  useEffect(() => {
    if (createCourseSuccess) {
      dispatch(
        updateStateOpenToastMessage({
          message: 'Thêm khóa học thành công',
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
        setErrorPrice('Giá phải là số')
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
        setErrorPromotionalPrice('Giá khuyến mãi phải là số')
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

  return (
    <>
      {loading && <Loading />}
      <h3>Thêm khóa học</h3>
      <div>
        <Form onSubmit={handleSubmit(addCourse)}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="name">Tên khóa học</Form.Label>
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
                Tên khóa học không được trống
              </Card.Text>
            )}
            {errors.name?.type === 'maxLength' && (
              <Card.Text as="div" className="error-text">
                Tên khóa học không được quá 100 ký tự
              </Card.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="description">Mô tả khóa học</Form.Label>
            <Form.Control
              type="text"
              id="description"
              {...register('description', { required: true })}
              isInvalid={errors.description?.type === 'required'}
            />
            {errors.description?.type === 'required' && (
              <Card.Text as="div" className='error-text'>Mô tả khóa học không được trống</Card.Text>
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
            <Form.Label htmlFor="level">Cấp độ</Form.Label>
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
                Cấp độ không được trống
              </Card.Text>
            )}
            {errors.level?.type === 'levelGreaterThan' && (
              <Card.Text as="div" className="error-text">
                Cấp độ phải lớn hơn 0
              </Card.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="price">Giá</Form.Label>
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
                Giá không được trống
              </Card.Text>
            )}
            {errorPrice && (
              <Card.Text as="div" className="error-text">
                {errorPrice}
              </Card.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="promotionalPrice">Giá khuyến mãi</Form.Label>
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
          <Form.Group className="mb-3" controlId="parentcourse">
            <Form.Label>Môn học</Form.Label>
            <Form.Select
              aria-label="Môn học"
              {...register('subjectId', { required: true })}
              isInvalid={errors.subjectId?.type === 'required'}
            >
              {subjects &&
                subjects?.map((subject, i) => (
                  <option value={`${subject.id}`} key={subject.id}>
                    {subject.name}
                  </option>
                ))}
            </Form.Select>
            {errors.subjectId?.type === 'required' && (
              <Card.Text as="div" className="error-text">
                Vui lòng chọn môn học
              </Card.Text>
            )}
          </Form.Group>
          <Button type="submit" variant="success" className="btn-right">
            Thêm
          </Button>
        </Form>
      </div>
    </>
  );
};

export default CourseCreate;
