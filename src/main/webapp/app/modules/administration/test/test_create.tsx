import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { ICreateTest, IVideoNameDetail } from 'app/shared/model/test';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { createTest, getTests, showVideoName, resetTest } from 'app/shared/reducers/test';
import { resetToastMessage, updateStateOpenToastMessage } from 'app/shared/reducers/toast-message';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import Loading from 'app/components/loading';
import { URL_PATH } from 'app/config/path';

const TestCreate = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const loading = useAppSelector(state => state.test.loading);
  useEffect(() => {
    dispatch(showVideoName());
  }, []);

  const createTestSuccess = useAppSelector(state => state.test.createTestSuccess);
  const createTestErrorMessage = useAppSelector(state => state.test.createTestErrorMessage);
  const getVideoNames = useAppSelector(state => state.test.getVideoNames);
  const videoDetail = useAppSelector(state => state.video.video);

  useEffect(() => {
    if (videoDetail.id === undefined) {
      history.push(URL_PATH.ADMIN.TEST.MANAGEMENT)
    }
    if (videoDetail.id) {
      setValue('video_id', String(videoDetail.id))
    }
  }, [videoDetail]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<{
    test_content: string,
    serial_answer: number,
    video_id: string,
    answer_1: string,
    answer_2: string,
    answer_3: string,
    answer_4: string,
  }>();

  const addTest = data => {
    const requestBody: ICreateTest = {
      test_content: data.test_content,
      serial_answer: data.serial_answer,
      video_id: data.video_id,
      answer_1: data.answer_1,
      answer_2: data.answer_2,
      answer_3: data.answer_3,
      answer_4: data.answer_4,
    };
    dispatch(createTest(requestBody));
  };

  useEffect(() => {
    if (createTestSuccess) {
      dispatch(
        updateStateOpenToastMessage({
          message: 'Add successful videos',
          isError: false,
        })
      );
      history.push(URL_PATH.ADMIN.TEST.MANAGEMENT);
    }
  }, [createTestSuccess, dispatch, history]);

  useEffect(() => {
    if (createTestErrorMessage) {
      dispatch(
        updateStateOpenToastMessage({
          message: createTestErrorMessage,
          isError: true,
        })
      );
    }
  }, [createTestErrorMessage, dispatch]);

  const handleBack = () => {
    history.push(URL_PATH.ADMIN.TEST.MANAGEMENT);
  }

  return (
    <>
      {loading && <Loading />}
      <h3>Thêm bài test</h3>
      <div>
        <Form onSubmit={handleSubmit(addTest)}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="name">câu hỏi</Form.Label>
            <Form.Control
              type="text"
              id="name"
              {...register('test_content', {
                required: true,
                maxLength: 100,
              })}
              isInvalid={errors.test_content?.type === 'required' || errors.test_content?.type === 'maxLength'}
            />
            {errors.test_content?.type === 'required' && (
              <Card.Text as="div" className="error-text">
                The question should not be blank
              </Card.Text>
            )}
            {errors.test_content?.type === 'maxLength' && (
              <Card.Text as="div" className="error-text">
                Questions should be no more than 100 characters
              </Card.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="name">Answer 1</Form.Label>
            <Form.Control
              type="text"
              id="answer_1"
              {...register('answer_1', {
                required: true,
                maxLength: 255,
              })}
              isInvalid={errors.answer_1?.type === 'required' || errors.answer_1?.type === 'maxLength'}
            />
            {errors.answer_1?.type === 'required' && (
              <Card.Text as="div" className="error-text">
                Answer 1 must not be blank
              </Card.Text>
            )}
            {errors.answer_1?.type === 'maxLength' && (
              <Card.Text as="div" className="error-text">
                Answer 1 is more than 255 characters
              </Card.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="name">Answer 2</Form.Label>
            <Form.Control
              type="text"
              id="answer_2"
              {...register('answer_2', {
                required: true,
                maxLength: 255,
              })}
              isInvalid={errors.answer_2?.type === 'required' || errors.answer_2?.type === 'maxLength'}
            />
            {errors.answer_2?.type === 'required' && (
              <Card.Text as="div" className="error-text">
                Answer 2 cant be blank
              </Card.Text>
            )}
            {errors.answer_2?.type === 'maxLength' && (
              <Card.Text as="div" className="error-text">
                Answer 2 is more than 255 characters
              </Card.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="name">Answer 3</Form.Label>
            <Form.Control
              type="text"
              id="answer_3"
              {...register('answer_3', {
                required: true,
                maxLength: 255,
              })}
              isInvalid={errors.answer_3?.type === 'required' || errors.answer_3?.type === 'maxLength'}
            />
            {errors.answer_3?.type === 'required' && (
              <Card.Text as="div" className="error-text">
                Answer 3 should not be blank
              </Card.Text>
            )}
            {errors.answer_3?.type === 'maxLength' && (
              <Card.Text as="div" className="error-text">
                Answer 3 is more than 255 characters
              </Card.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="name">Answer 4</Form.Label>
            <Form.Control
              type="text"
              id="answer_4"
              {...register('answer_4', {
                required: true,
                maxLength: 255,
              })}
              isInvalid={errors.answer_4?.type === 'required' || errors.answer_4?.type === 'maxLength'}
            />
            {errors.answer_4?.type === 'required' && (
              <Card.Text as="div" className="error-text">
                Answer 4 must not be blank
              </Card.Text>
            )}
            {errors.answer_4?.type === 'maxLength' && (
              <Card.Text as="div" className="error-text">
                Answer 4 is more than 255 characters
              </Card.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="name">Correct answer</Form.Label>
            <Form.Control
              type="text"
              id="serial_answer"
              {...register('serial_answer', {
                required: true,
                maxLength: 255,
              })}
              isInvalid={errors.serial_answer?.type === 'required' || errors.serial_answer?.type === 'maxLength'}
            />
            {errors.serial_answer?.type === 'required' && (
              <Card.Text as="div" className="error-text">
                The answer must not be blank
              </Card.Text>
            )}
            {errors.serial_answer?.type === 'maxLength' && (
              <Card.Text as="div" className="error-text">
                Answers must not exceed 255 characters
              </Card.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="parentcourse">
            <Form.Label>Video</Form.Label>
            <Form.Select
              aria-label="Video"
              {...register('video_id', { required: true })}
              isInvalid={errors.video_id?.type === 'required'}
            >
              <option value={`${videoDetail?.id}`} >
                {videoDetail?.name}
              </option>
            </Form.Select>
            {errors.video_id?.type === 'required' && (
              <Card.Text as="div" className="error-text">
                Please select video
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

export default TestCreate;
