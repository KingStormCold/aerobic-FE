import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { createCourse, getCourse, showSubject } from 'app/shared/reducers/course';
import { resetToastMessage, updateStateOpenToastMessage } from 'app/shared/reducers/toast-message';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import Loading from 'app/components/loading';
import { URL_PATH } from 'app/config/path';
import './course_create.scss';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState } from 'draft-js';

export interface ICreateCourse {
  id: number;
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

  useEffect(() => {
    dispatch(showSubject());
    setValue('price', 200000);
    setValue('promotionalPrice', 0);
  }, []);

  useEffect(() => {
    if (subjects.length > 0) {
      setValue('subject_id', subjects[0].id);
    }
  }, [subjects]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<{
    name: string;
    subject_id: number;
    description: string;
    level: number;
    price: number;
    promotionalPrice: number;
  }>();

  const addCourse = data => {
    const requestBody: ICreateCourse = {
      name: data.name,
      subject_id: data.subject_id,
      description: 'data.description',
      level: data.level,
      price: data.price,
      promotional_price: data.promotionalPrice,
      id: 1,
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
          {/* <Form.Group className="mb-3">
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
          </Form.Group> */}
          <Form.Group className="mb-3">
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
          </Form.Group>
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
              {...register('price', {
                required: true,
                validate: {
                  priceGreaterThan: value => value > 0,
                },
              })}
              isInvalid={errors.price?.type === 'required' || errors.price?.type === 'priceGreaterThan'}
            />
            {errors.price?.type === 'required' && (
              <Card.Text as="div" className="error-text">
                Giá không được trống
              </Card.Text>
            )}
            {errors.price?.type === 'priceGreaterThan' && (
              <Card.Text as="div" className="error-text">
                Giá phải lớn hơn 0
              </Card.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="promotionalPrice">Giá khuyến mãi</Form.Label>
            <Form.Control
              type="text"
              id="promotionalPrice"
              {...register('promotionalPrice', {
                validate: {
                  levelGreaterThan: value => value >= 0,
                },
              })}
              isInvalid={errors.promotionalPrice?.type === 'levelGreaterThan'}
            />
            {errors.promotionalPrice?.type === 'levelGreaterThan' && (
              <Card.Text as="div" className="error-text">
                Giá khuyến mãi phải lớn hơn 0
              </Card.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="parentcourse">
            <Form.Label>Môn học</Form.Label>
            <Form.Select
              aria-label="Môn học"
              {...register('subject_id', { required: true })}
              isInvalid={errors.subject_id?.type === 'required'}
            >
              {subjects &&
                subjects?.map((subject, i) => (
                  <option value={`${subject.id}`} key={subject.id}>
                    {subject.name}
                  </option>
                ))}
            </Form.Select>
            {errors.subject_id?.type === 'required' && (
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
