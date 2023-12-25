import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { createVideo, videosPage, showCourseName } from 'app/shared/reducers/video';
import { resetToastMessage, updateStateOpenToastMessage } from 'app/shared/reducers/toast-message';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import Loading from 'app/components/loading';
import { URL_PATH } from 'app/config/path';
import './video_create.scss';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState } from 'draft-js';

export interface ICreateVideo {
  id: number;
  name: string;
  link_video: string;
  finished: string;
  course_id: number;
}

const VideoCreate = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const loading = useAppSelector(state => state.video.loading);
  const createVideoSuccess = useAppSelector(state => state.video.createVideoSuccess);
  const createVideoErrorMessage = useAppSelector(state => state.video.createVideoErrorMessage);
  const getCourseNames = useAppSelector(state => state.video.getCourseNames);
  const coursesDetail = useAppSelector(state => state.course.course);

  useEffect(() => {
    if (coursesDetail.id === undefined) {
      history.push(URL_PATH.ADMIN.COURSE.MANAGEMENT)
    }
    if (coursesDetail.id) {
      dispatch(showCourseName());
      setValue('finished', '0');
      setValue('course_id', coursesDetail?.id)
    }
  }, []);

  useEffect(() => {
    if (getCourseNames?.length > 0) {
      setValue('course_id', getCourseNames[0].id);
    }
  }, [getCourseNames]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<{
    name: string;
    link_video: string;
    finished: string;
    course_id: number;
  }>();

  const addVideo = data => {
    const requestBody: ICreateVideo = {
      name: data.name,
      link_video: data.link_video,
      finished: data.finished,
      course_id: data.course_id,
      id: 1,
    };
    dispatch(createVideo(requestBody));
  };

  useEffect(() => {
    if (createVideoSuccess) {
      dispatch(
        updateStateOpenToastMessage({
          message: 'Thêm video thành công',
          isError: false,
        })
      );
      history.push(URL_PATH.ADMIN.VIDEO.MANAGEMENT);
    }
  }, [createVideoSuccess, dispatch, history]);

  useEffect(() => {
    if (createVideoErrorMessage) {
      dispatch(
        updateStateOpenToastMessage({
          message: createVideoErrorMessage,
          isError: true,
        })
      );
    }
  }, [createVideoErrorMessage, dispatch]);

  return (
    <>
      {loading && <Loading />}
      <h3>Thêm Video</h3>
      <div>
        <Form onSubmit={handleSubmit(addVideo)}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="name">Tên video</Form.Label>
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
            <Form.Label htmlFor="name">link_video</Form.Label>
            <Form.Control
              type="text"
              id="link_video"
              {...register('link_video', {
                required: true,
                maxLength: 255,
              })}
              isInvalid={errors.link_video?.type === 'required' || errors.link_video?.type === 'maxLength'}
            />
            {errors.link_video?.type === 'required' && (
              <Card.Text as="div" className="error-text">
                link video không được trống
              </Card.Text>
            )}
            {errors.link_video?.type === 'maxLength' && (
              <Card.Text as="div" className="error-text">
                link video không được quá 255 ký tự
              </Card.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="parentcourse">
            <Form.Label>Khóa học</Form.Label>
            <Form.Select
              aria-label="Môn học"
              {...register('course_id', { required: true })}
              isInvalid={errors.course_id?.type === 'required'}
            >
              <option value={`${coursesDetail?.id}`}>
                {coursesDetail?.name}
              </option>
            </Form.Select>
            {errors.course_id?.type === 'required' && (
              <Card.Text as="div" className="error-text">
                Vui lòng chọn khóa học
              </Card.Text>
            )}
          </Form.Group>
          <Button type="submit" variant="success" className="btn-right">
            Thêm
          </Button>
          <br />
          <br />
        </Form>
      </div>
    </>
  );
};

export default VideoCreate;
