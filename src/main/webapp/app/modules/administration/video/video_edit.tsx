/* eslint-disable @typescript-eslint/no-shadow */
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { createVideo, getVideos, resetVideo, showCourseName, updateVideo } from 'app/shared/reducers/video';
import { updateStateOpenToastMessage } from 'app/shared/reducers/toast-message';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import Loading from 'app/components/loading';
import { URL_PATH } from 'app/config/path';
import { IUpdateVideo } from 'app/shared/model/video';
import { ICreateVideo } from './video_create';
import { SelectChangeEvent } from '@mui/material';

export const VideoEdit = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const loading = useAppSelector(state => state.video.loading);

  useEffect(() => {
    dispatch(getVideos());
  }, []);
  const updateVideoSuccess = useAppSelector(state => state.video.updateVideoSuccess);
  const getCourseNames = useAppSelector(state => state.video.getCourseNames);
  const videosDetail = useAppSelector(state => state.video.video);
  const [link_video, setLink_video] = useState('');
  const [course_id, setcourse_id] = useState('');

  useEffect(() => {
    dispatch(showCourseName());
  }, []);
  useEffect(() => {
    // kiểm tra nếu người dùng đứng ở trang chỉnh sửa mà ctrl + f5 thì sẽ đá về lại trang quản lý vì Course bị undefined
    // => hk có data để chỉnh sửa
    if (videosDetail === undefined) {
      history.push(URL_PATH.ADMIN.VIDEO.MANAGEMENT);
    }
  }, [videosDetail]);

  useEffect(() => {
    setValue('name', videosDetail?.name);
    setLink_video(String(videosDetail?.link_video));
    setcourse_id(String(videosDetail?.course_id));
    setValue('finished', 0);
    console.log(setLink_video)
    return
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
    link_video: number;
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
    setcourse_id(event.target.value);
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
              value={course_id}
              {...register('course_id', {
                onChange(event) {
                  handleSubject(event);
                },
              })}
            >
              {getCourseNames &&
                getCourseNames?.map((getCourseName, i) => (
                  <option value={`${getCourseName.id}`} key={getCourseName.id}>
                    {getCourseName.name}
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

export default VideoEdit;
