import { SelectChangeEvent } from '@mui/material';
import Loading from 'app/components/loading';
import { URL_PATH } from 'app/config/path';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { IUpdateTest } from 'app/shared/model/test';
import { updateStateTitle } from 'app/shared/reducers/category-show';
import { showVideoName, resetTest, updateTest } from 'app/shared/reducers/test';
import { resetToastMessage, updateStateOpenToastMessage } from 'app/shared/reducers/toast-message';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

export const TestEdit = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const loading = useAppSelector(state => state.test.loading);
  useEffect(() => {
    dispatch(showVideoName());
  }, []);
  const tests = useAppSelector(state => state.test.test);
  const updateTestSuccess = useAppSelector(state => state.test.updateTestSuccess);
  const testDetail = useAppSelector(state => state.test.test);
  const parentTestsErrorMessage = useAppSelector(state => state.test.getVideoNames);
  const updateTestErrorMessage = useAppSelector(state => state.test.updateTestErrorMessage);
  const videoDetail = useAppSelector(state => state.video.video);
  const title = useAppSelector(state => state.categoryShow.title);

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
    getValues,
    watch,
    setValue,
    formState: { errors },
  } = useForm<{
    test_content: string,
    serial_answer: number,
    video_id: string,
    answer_id_1: number,
    answer_1: string,
    answer_id_2: number,
    answer_2: string,
    answer_id_3: number,
    answer_3: string,
    answer_id_4: number,
    answer_4: string,
  }>();

  const editTest = data => {
    const requestBody = {
      test_content: data?.test_content,
      serial_answer: data?.serial_answer,
      video_id: data?.video_id,
      answers: [
        {
          id: data?.answer_id_1,
          answer_content: data?.answer_1
        },
        {
          id: data?.answer_id_2,
          answer_content: data?.answer_2
        },
        {
          id: data?.answer_id_3,
          answer_content: data?.answer_3
        },
        {
          id: data?.answer_id_4,
          answer_content: data?.answer_4
        }
      ]
    } as IUpdateTest;
    dispatch(updateTest({ id: testDetail?.id, requestBody }));
  };

  useEffect(() => {

    if (testDetail.id === undefined) {
      history.push(URL_PATH.ADMIN.TEST.MANAGEMENT);
    }
    if (testDetail.id) {
      setValue('test_content', testDetail?.test_content);
      setValue('serial_answer', testDetail?.serial_answer);
      setValue('answer_id_1', testDetail?.answers[0]?.id);
      setValue('answer_1', testDetail?.answers[0]?.answer_content);
      setValue('answer_id_2', testDetail?.answers[1]?.id);
      setValue('answer_2', testDetail?.answers[1]?.answer_content);
      setValue('answer_id_3', testDetail?.answers[2]?.id);
      setValue('answer_3', testDetail?.answers[2]?.answer_content);
      setValue('answer_id_4', testDetail?.answers[3]?.id);
      setValue('answer_4', testDetail?.answers[3]?.answer_content);
      dispatch(updateStateTitle(title + " > " + testDetail?.test_content))
    }
  }, [testDetail]);
  useEffect(() => {
    if (updateTestSuccess) {
      dispatch(updateStateOpenToastMessage({ message: 'Question updated successfully', isError: false }));
      dispatch(resetTest());
      history.push(URL_PATH.ADMIN.TEST.MANAGEMENT);
    }
  }, [updateTestSuccess]);

  useEffect(() => {
    if (updateTestErrorMessage) {
      dispatch(updateStateOpenToastMessage({ message: updateTestErrorMessage, isError: true }));
    }
  }, [updateTestErrorMessage]);

  const handleBack = () => {
    history.push(URL_PATH.ADMIN.TEST.MANAGEMENT);
  }

  return (
    <>
      {loading && <Loading />}
      <h3>Edit Question</h3>
      <div>
        <Form onSubmit={handleSubmit(editTest)}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="name">Question</Form.Label>
            <Form.Control
              type="text"
              id="name"
              {...register('test_content', {
                required: true,
              })}
              isInvalid={errors.test_content?.type === 'required' || errors.test_content?.type === 'maxLength'}
            />
            {errors.test_content?.type === 'required' && (
              <Card.Text as="div" className="error-text">
                Question is not empty
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
                Answer 1 is not empty
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
                Answer 2 is not empty
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
                Answer 3 is not empty
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
                Answer 4 is not empty
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
                Correct answer is not empty
              </Card.Text>
            )}
            {errors.serial_answer?.type === 'maxLength' && (
              <Card.Text as="div" className="error-text">
                Correct answer must not exceed 255 characters
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

export default TestEdit;
