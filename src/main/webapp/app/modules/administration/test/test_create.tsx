import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { ICreateTest , IVideoNameDetail } from 'app/shared/model/test';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { createTest, getTests, showVideoName, resetTest } from 'app/shared/reducers/test';
import { resetToastMessage, updateStateOpenToastMessage } from 'app/shared/reducers/toast-message';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import Loading from 'app/components/loading';
import { URL_PATH } from 'app/config/path';
import './test_create.scss';
// import { Editor } from 'react-draft-wysiwyg';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import { EditorState } from 'draft-js';


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

 

  useEffect(() => {
    if (getVideoNames?.length > 0) {
      setValue('video_id', getVideoNames[0].name);
    }
  }, [getVideoNames]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<{
    test_content:string,
    serial_answer:number,
    video_id:string
  }>();

  const addTest = data => {
    const requestBody: ICreateTest = {
      test_content: data.test_content,
      serial_answer: data.serial_answer,
      video_id: data.video_id,
    };
    dispatch(createTest(requestBody));
  };

  useEffect(() => {
    if (createTestSuccess) {
      dispatch(
        updateStateOpenToastMessage({
          message: 'Thêm video thành công',
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
            <Form.Label htmlFor="name">đáp án đúng</Form.Label>
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
              {getVideoNames &&
                getVideoNames?.map((getVideoName, i) => (
                  <option value={`${getVideoName.id}`} key={getVideoName.id}>
                    {getVideoName.id}. {getVideoName.name}
                  </option>
                ))}
            </Form.Select>
            {errors.video_id?.type === 'required' && (
              <Card.Text as="div" className="error-text">
                Vui lòng chọn video
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

export default TestCreate;
