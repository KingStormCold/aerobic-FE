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

  useEffect(() => {
    dispatch(showSubject());
  }, []);
  useEffect(() => {
    // kiểm tra nếu người dùng đứng ở trang chỉnh sửa mà ctrl + f5 thì sẽ đá về lại trang quản lý vì Course bị undefined
    // => hk có data để chỉnh sửa
    if (coursesDetail === undefined) {
      history.push(URL_PATH.ADMIN.COURSE.MANAGEMENT);
    }
  }, [coursesDetail]);

  useEffect(() => {
    setValue('name', coursesDetail?.name);
    setValue('subject_id', coursesDetail?.subject_id);
    setSubjectId(String(coursesDetail?.subject_id));
    setValue('description', coursesDetail?.description);
    setValue('level', coursesDetail?.level);
    setValue('price', coursesDetail?.price);
    setValue('promotional_price', coursesDetail?.promotional_price);
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
    subject_id: number;
    description: string;
    level: number;
    price: number;
    promotional_price: number;
  }>();

  const editCourse = data => {
    const requestBody = {
      name: data?.name,
      subject_id: data?.subject_id,
      description: data?.description,
      level: data?.level,
      price: data?.price,
      promotional_price: data?.promotional_price,
      id: 1,
    } as ICreateCourse;
    dispatch(updateCourse({ id: coursesDetail?.id, requestBody }));
  };

  const handleSubject = (event: SelectChangeEvent) => {
    setValue('subject_id', Number(event.target.value));
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
            <Form.Label htmlFor="promotional_price">Giá khuyến mãi</Form.Label>
            <Form.Control
              type="text"
              id="promotional_price"
              {...register('promotional_price', {
                validate: {
                  levelGreaterThan: value => value >= 0,
                },
              })}
              isInvalid={errors.promotional_price?.type === 'levelGreaterThan'}
            />
            {errors.promotional_price?.type === 'levelGreaterThan' && (
              <Card.Text as="div" className="error-text">
                Giá khuyến mãi phải lớn hơn 0
              </Card.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Môn học</Form.Label>
            <Form.Select
              aria-label="Môn học"
              value={subjectId}
              {...register('subject_id', {
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
        </Form>
      </div>
    </>
  );
};

export default CourseEdit;
