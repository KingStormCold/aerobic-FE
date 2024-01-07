import React, { useEffect, useState, useRef } from 'react';
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
import ReactPlayer from 'react-player'

export interface ICreateVideo {
  id: number;
  name: string;
  link_video: string;
  finished: string;
  free: number;
  course_id: number;
  full_time: number;
}

const VideoCreate = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const loading = useAppSelector(state => state.video.loading);
  const createVideoSuccess = useAppSelector(state => state.video.createVideoSuccess);
  const createVideoErrorMessage = useAppSelector(state => state.video.createVideoErrorMessage);
  const coursesDetail = useAppSelector(state => state.course.course);
  const [linkVideo, setLinkVideo] = useState('')
  const [fullTimeVideo, setFullTimeVideo] = useState(0)
  const [errorVideo, setErrorVideo] = useState('')
  const player = useRef<ReactPlayer>(null)

  useEffect(() => {
    if (coursesDetail.id === undefined) {
      history.push(URL_PATH.ADMIN.COURSE.MANAGEMENT)
    }
    if (coursesDetail.id) {
      dispatch(showCourseName());
      setValue('finished', '0');
      setValue('course_id', coursesDetail?.id)
    }
  }, [coursesDetail]);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<{
    name: string;
    link_video: string;
    finished: string;
    course_id: number;
    free?: boolean
  }>();

  const addVideo = data => {
    const duration = player.current.getDuration()
    if (errorVideo || duration === null) {
      setErrorVideo('Incorrect video link')
      return
    }
    let free = 0;
    if (coursesDetail?.level === 1) {
      free = data?.free ? 1 : 0
    }
    const requestBody: ICreateVideo = {
      name: data.name,
      link_video: data.link_video,
      finished: data.finished,
      course_id: data.course_id,
      free,
      id: 1,
      full_time: fullTimeVideo
    };
    dispatch(createVideo(requestBody));
  };

  useEffect(() => {
    if (createVideoSuccess) {
      dispatch(
        updateStateOpenToastMessage({
          message: 'Video added successfully',
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

  const handleBack = () => {
    history.push(URL_PATH.ADMIN.VIDEO.MANAGEMENT);
  }

  return (
    <>
      {loading && <Loading />}
      <h3>Add Video</h3>
      <div>
        <Form onSubmit={handleSubmit(addVideo)}>
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
                Video name must not exceed 100 characters
              </Card.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="name">Video link</Form.Label>
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
          <Form.Group className="mb-3" controlId="parentcourse">
            <Form.Label>Course</Form.Label>
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
                Please select a course
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

export default VideoCreate;
