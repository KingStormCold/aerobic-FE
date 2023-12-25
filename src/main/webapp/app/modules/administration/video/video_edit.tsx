/* eslint-disable @typescript-eslint/no-shadow */
import { SelectChangeEvent } from '@mui/material';
import Loading from 'app/components/loading';
import { URL_PATH } from 'app/config/path';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { updateStateOpenToastMessage } from 'app/shared/reducers/toast-message';
import { getVideos, resetVideo, showCourseName, updateVideo } from 'app/shared/reducers/video';
import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { ICreateVideo } from './video_create';

export const VideoEdit = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const loading = useAppSelector(state => state.video.loading);

  useEffect(() => {
    dispatch(getVideos());
  }, []);
  const updateVideoSuccess = useAppSelector(state => state.video.updateVideoSuccess);
  const videosDetail = useAppSelector(state => state.video.video);
  const coursesDetail = useAppSelector(state => state.course.course);

  useEffect(() => {
    dispatch(showCourseName());
  }, []);
  useEffect(() => {
    // kiểm tra nếu người dùng đứng ở trang chỉnh sửa mà ctrl + f5 thì sẽ đá về lại trang quản lý vì Course bị undefined
    // => hk có data để chỉnh sửa
    if (videosDetail.id === undefined) {
      history.push(URL_PATH.ADMIN.VIDEO.MANAGEMENT);
    }
    if (videosDetail.id) {
      setValue('name', videosDetail?.name);
      setValue('finished', 0);
      setValue('link_video', videosDetail?.link_video)
      setValue('course_id', String(videosDetail?.course_id))
    }
  }, [videosDetail]);

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
    link_video: string;
    course_id: string;
    finished: number;
  }>();

  const editVideo = data => {
    const requestBody = {
      name: data?.name,
      link_video: data?.link_video,
      course_id: data?.course_id,
      finished: data?.finished,
    } as ICreateVideo;
    dispatch(updateVideo({ id: videosDetail?.id, requestBody }));
  };

  const handleSubject = (event: SelectChangeEvent) => {
    setValue('course_id', event.target.value);
  };

  useEffect(() => {
    if (updateVideoSuccess) {
      dispatch(updateStateOpenToastMessage({ message: 'Sửa Video thành công', isError: false }));
      dispatch(resetVideo());
      history.push(URL_PATH.ADMIN.VIDEO.MANAGEMENT);
    }
  }, [updateVideoSuccess]);

  return (
    <>
      {loading && <Loading />}
      <h3>Sửa Video</h3>
      <div>
        <Form onSubmit={handleSubmit(editVideo)}>
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
                Tên video không được trống
              </Card.Text>
            )}
            {errors.name?.type === 'maxLength' && (
              <Card.Text as="div" className="error-text">
                Tên video không được quá 100 ký tự
              </Card.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="link_video">Link video</Form.Label>
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
                Liên kết video không được trống
              </Card.Text>
            )}
            {errors.link_video?.type === 'maxLength' && (
              <Card.Text as="div" className="error-text">
                Liên kết video không được quá 255 ký tự
              </Card.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="course_id">
            <Form.Label>Tên khóa học</Form.Label>
            <Form.Select
              aria-label="Tên khóa học"
              value={videosDetail?.course_id}
              {...register('course_id', {
              })}
            >
              <option value={`${coursesDetail?.id}`}>
                {coursesDetail?.name}
              </option>
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

export default VideoEdit;
