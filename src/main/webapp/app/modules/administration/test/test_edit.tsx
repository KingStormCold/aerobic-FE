import { SelectChangeEvent } from '@mui/material';
import Loading from 'app/components/loading';
import { URL_PATH } from 'app/config/path';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { IUpdateTest } from 'app/shared/model/test';
import { showVideoName, resetTest, updateTest } from 'app/shared/reducers/test';
import { resetToastMessage, updateStateOpenToastMessage } from 'app/shared/reducers/toast-message';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import './test_edit.scss';

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
    // kiểm tra nếu người dùng đứng ở trang chỉnh sửa mà ctrl + f5 thì sẽ đá về lại trang quản lý vì test bị undefined
    // => hk có data để chỉnh sửa
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
    }
  }, [testDetail]);
  useEffect(() => {
    if (updateTestSuccess) {
      dispatch(updateStateOpenToastMessage({ message: 'Sửa bài test thành công', isError: false }));
      dispatch(resetTest());
      history.push(URL_PATH.ADMIN.TEST.MANAGEMENT);
    }
  }, [updateTestSuccess]);

  useEffect(() => {
    if (updateTestErrorMessage) {
      dispatch(updateStateOpenToastMessage({ message: updateTestErrorMessage, isError: true }));
    }
  }, [updateTestErrorMessage]);

  return (
    <>
      {loading && <Loading />}
      <h3>Sửa bài test</h3>
      <div>
        <Form onSubmit={handleSubmit(editTest)}>
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
                Câu hỏi không được trống
              </Card.Text>
            )}
            {errors.test_content?.type === 'maxLength' && (
              <Card.Text as="div" className="error-text">
                Câu hỏi không được quá 100 ký tự
              </Card.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="name">Câu trả lời 1</Form.Label>
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
                Câu trả lời 1 không được trống
              </Card.Text>
            )}
            {errors.answer_1?.type === 'maxLength' && (
              <Card.Text as="div" className="error-text">
                Câu trả lời 1 được quá 255 ký tự
              </Card.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="name">Câu trả lời 2</Form.Label>
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
                Câu trả lời 2 không được trống
              </Card.Text>
            )}
            {errors.answer_2?.type === 'maxLength' && (
              <Card.Text as="div" className="error-text">
                Câu trả lời 2 được quá 255 ký tự
              </Card.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="name">Câu trả lời 3</Form.Label>
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
                Câu trả lời 3 không được trống
              </Card.Text>
            )}
            {errors.answer_3?.type === 'maxLength' && (
              <Card.Text as="div" className="error-text">
                Câu trả lời 3 được quá 255 ký tự
              </Card.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="name">Câu trả lời 4</Form.Label>
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
                Câu trả lời 4 không được trống
              </Card.Text>
            )}
            {errors.answer_4?.type === 'maxLength' && (
              <Card.Text as="div" className="error-text">
                Câu trả lời 4 được quá 255 ký tự
              </Card.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="name">Đáp án đúng</Form.Label>
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
                đáp án không được trống
              </Card.Text>
            )}
            {errors.serial_answer?.type === 'maxLength' && (
              <Card.Text as="div" className="error-text">
                đáp án không được quá 255 ký tự
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
                Vui lòng chọn video
              </Card.Text>
            )}
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

export default TestEdit;
