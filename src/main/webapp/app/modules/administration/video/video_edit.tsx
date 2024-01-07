/* eslint-disable @typescript-eslint/no-shadow */
import { SelectChangeEvent } from '@mui/material';
import Loading from 'app/components/loading';
import { URL_PATH } from 'app/config/path';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { updateStateOpenToastMessage } from 'app/shared/reducers/toast-message';
import { getVideos, resetVideo, showCourseName, updateVideo } from 'app/shared/reducers/video';
import React, { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { ICreateVideo } from './video_create';
import { updateStateTitle } from 'app/shared/reducers/category-show';
import ReactPlayer from 'react-player'

export const VideoEdit = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const loading = useAppSelector(state => state.video.loading);

  useEffect(() => {
    dispatch(getVideos());
  }, []);
  const updateVideoSuccess = useAppSelector(state => state.video.updateVideoSuccess);
  const videoDetail = useAppSelector(state => state.video.video);
  const coursesDetail = useAppSelector(state => state.course.course);
  const title = useAppSelector(state => state.categoryShow.title);
  const player = useRef<ReactPlayer>(null)
  const [linkVideo, setLinkVideo] = useState('')
  const [fullTimeVideo, setFullTimeVideo] = useState(0)
  const [errorVideo, setErrorVideo] = useState('')

  useEffect(() => {
    dispatch(showCourseName());
  }, []);
  useEffect(() => {

    if (videoDetail.id === undefined) {
      history.push(URL_PATH.ADMIN.VIDEO.MANAGEMENT);
    }
    if (videoDetail.id) {
      setValue('name', videoDetail?.name);
      setValue('finished', 0);
      setValue('link_video', videoDetail?.link_video)
      setValue('course_id', String(videoDetail?.course_id))
      if (coursesDetail?.level === 1) {
        setValue('free', videoDetail?.free === 1 ? true : false)
      }
      dispatch(updateStateTitle(title + " > " + videoDetail?.name))
      setLinkVideo(videoDetail?.link_video)
    }
  }, [videoDetail]);

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
    free?: boolean
  }>();

  const editVideo = data => {
    const duration = player.current.getDuration()
    if (errorVideo || duration === null) {
      setErrorVideo('Incorrect video link')
      return
    }
    let free = 0;
    if (coursesDetail?.level === 1) {
      free = data?.free ? 1 : 0
    }
    const requestBody = {
      name: data?.name,
      link_video: data?.link_video,
      course_id: data?.course_id,
      free,
      finished: data?.finished,
      full_time: fullTimeVideo
    } as ICreateVideo;
    dispatch(updateVideo({ id: videoDetail?.id, requestBody }));
  };

  const handleSubject = (event: SelectChangeEvent) => {
    setValue('course_id', event.target.value);
  };

  useEffect(() => {
    if (updateVideoSuccess) {
      dispatch(updateStateOpenToastMessage({ message: 'Video updated successfully', isError: false }));
      dispatch(resetVideo());
      history.push(URL_PATH.ADMIN.VIDEO.MANAGEMENT);
    }
  }, [updateVideoSuccess]);

  const handleBack = () => {
    history.push(URL_PATH.ADMIN.VIDEO.MANAGEMENT);
  }

  const handleDuration = (duration) => {
    if (duration) {
      const fullTimeNumber = duration / 60
      const fullTimeString = String(fullTimeNumber).split('.')
      setFullTimeVideo(Number(fullTimeString[0]))
      setErrorVideo('')
    } else {
      setFullTimeVideo(0)
      setErrorVideo('Incorrect video link')
    }
  };

  const handleLinkVideo = (e) => {
    setLinkVideo(e.target.value);
  }

  return (
    <>
      {loading && <Loading />}
      <h3>Update Video</h3>
      <div>
        <Form onSubmit={handleSubmit(editVideo)}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="name">Video name</Form.Label>
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
                Video name is not empty
              </Card.Text>
            )}
            {errors.name?.type === 'maxLength' && (
              <Card.Text as="div" className="error-text">
                Video name cant be more than 100 characters
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
                onChange(event) {
                  handleLinkVideo(event)
                },
              })}
              isInvalid={errors.link_video?.type === 'required' || errors.link_video?.type === 'maxLength'}
            />
            {errors.link_video?.type === 'required' && (
              <Card.Text as="div" className="error-text">
                Video link is not empty
              </Card.Text>
            )}
            {errorVideo && (
              <Card.Text as="div" className="error-text">
                {errorVideo}
              </Card.Text>
            )}
          </Form.Group>
          {linkVideo &&
            <Form.Group className="mb-3">
              <Form.Label htmlFor="name">Preview</Form.Label>
              <ReactPlayer width={'100%'} height={'100%'}
                url={linkVideo}
                onDuration={handleDuration}
                controls
                ref={player}
                config={{
                  file: {
                    attributes: {
                      controlsList: 'nodownload',
                    },
                  },
                }}
              />
            </Form.Group>
          }
          {coursesDetail?.level === 1 &&
            <Form.Group className="mb-3">
              <Form.Check
                type="switch"
                label="Free"
                {...register('free')}
              />
            </Form.Group>
          }
          <Form.Group className="mb-3" controlId="course_id">
            <Form.Label>Course Name</Form.Label>
            <Form.Select
              aria-label="Course Name"
              value={videoDetail?.course_id}
              {...register('course_id', {
              })}
            >
              <option value={`${coursesDetail?.id}`}>
                {coursesDetail?.name}
              </option>
            </Form.Select>
          </Form.Group>
          <Button type="submit" variant="success" className="btn-right">
            Edit
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

export default VideoEdit;
