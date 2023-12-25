/* eslint-disable @typescript-eslint/no-shadow */
import { SelectChangeEvent } from '@mui/material';
import Loading from 'app/components/loading';
import { URL_PATH } from 'app/config/path';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import './course_edit.scss';
import course, { getCourse, resetCourse, showSubject, updateCourse } from 'app/shared/reducers/course';
import { ICreateCourse } from './course_create';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { updateStateOpenToastMessage } from 'app/shared/reducers/toast-message';
import { numberWithCommas } from 'app/shared/util/string-utils';
import { REX } from 'app/config/constants';

export const CourseEdit = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const loading = useAppSelector(state => state.course.loading);
  useEffect(() => {
    dispatch(getCourse());
  }, []);
  const courses = useAppSelector(state => state.course.courses);
  const updateCourseSuccess = useAppSelector(state => state.course.updateCourseSuccess);
  const coursesDetail = useAppSelector(state => state.course.course);
  const updateCourseErrorMessage = useAppSelector(state => state.course.updateCourseErrorMessage);
  const [parentCourse, setParentCourse] = useState('');
  const subjects = useAppSelector(state => state.course.subjects);
  const [subjectId, setSubjectId] = useState('');
  const [editorStateShortDescription, setEditorStateShortDescription] = useState(EditorState.createEmpty());
  const [priceCourse, setPriceCourse] = useState('');
  const [promotionalPrice, setPromotionalPrice] = useState('');

  useEffect(() => {
    dispatch(showSubject());
  }, []);
  useEffect(() => {
    // kiểm tra nếu người dùng đứng ở trang chỉnh sửa mà ctrl + f5 thì sẽ đá về lại trang quản lý vì Course bị undefined
    // => hk có data để chỉnh sửa
    if (coursesDetail.id === undefined) {
      history.push(URL_PATH.ADMIN.COURSE.MANAGEMENT);
    }
    if (coursesDetail.id) {
      setValue('name', coursesDetail?.name);
      setValue('subjectId', coursesDetail?.subject_id);
      setSubjectId(String(coursesDetail?.subject_id));
      setValue('description', coursesDetail?.description);
      setValue('level', coursesDetail?.level);
      const price = numberWithCommas(coursesDetail?.price);
      setValue('price', price);
      setPriceCourse(price);
      const promotionPrice = numberWithCommas(coursesDetail?.promotional_price);
      setValue('promotionalPrice', promotionPrice);
      setPromotionalPrice(promotionPrice)
    }

  }, [coursesDetail]);

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setValue,
    formState: { errors },
  } = useForm<{
    id: number;
    name: string;
    subjectId: number;
    description: string;
    level: number;
    price: string;
    promotionalPrice: string;
  }>();

  const editCourse = data => {
    const price = data?.price.replaceAll('.', '')
    const promotionPrice = data?.promotionalPrice.replaceAll('.', '')
    const requestBody = {
      name: data?.name,
      subject_id: data?.subjectId,
      description: data?.description,
      level: data?.level,
      price,
      promotional_price: Number(promotionPrice),

    } as ICreateCourse;
    dispatch(updateCourse({ id: coursesDetail?.id, requestBody }));
  };

  const handleSubject = (event: SelectChangeEvent) => {
    setValue('subjectId', Number(event.target.value));
    setSubjectId(event.target.value);
  };

  useEffect(() => {
    if (updateCourseSuccess) {
      dispatch(updateStateOpenToastMessage({ message: 'Sửa khóa học thành công', isError: false }));
      dispatch(resetCourse());
      history.push(URL_PATH.ADMIN.COURSE.MANAGEMENT);
    }
  }, [updateCourseSuccess]);

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
      <h3>Sửa khóa học</h3>
      <div>
        <Form onSubmit={handleSubmit(editCourse)}>
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
          <Form.Group className="mb-3">
            <Form.Label>Môn học</Form.Label>
            <Form.Select
              aria-label="Môn học"
              value={subjectId}
              {...register('subjectId', {
                onChange(event) {
                  handleSubject(event);
                },
              })}
            >
              {subjects &&
                subjects?.map((subject, i) => (
                  <option value={`${subject.id}`} key={subject.id}>
                    {subject.name}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>
          <Button type="submit" variant="success" className="btn-right">
            Chỉnh sửa
          </Button>
          <br />
          <br />
        </Form>
      </div>
    </>
  );
};

export default CourseEdit;
