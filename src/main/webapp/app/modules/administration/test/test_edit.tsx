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
  const [parentTest, setParentTest] = useState('');

 
  

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setValue,
    formState: { errors },
  } = useForm<{
    contentName: string;
    serialAnswer: number;
  }>();

  const editTest = data => {
    const requestBody = {
      test_content: data?.contentName,
      serial_answer: data?.serialAnswer,
    } as IUpdateTest;
    dispatch(updateTest({ id: testDetail?.id, requestBody }));
  };
  
  useEffect(() => {
    // kiểm tra nếu người dùng đứng ở trang chỉnh sửa mà ctrl + f5 thì sẽ đá về lại trang quản lý vì test bị undefined
    // => hk có data để chỉnh sửa
    if (testDetail.id === undefined) {
      history.push(URL_PATH.ADMIN.TEST.MANAGEMENT);
    }
    if (testDetail) {
      setValue('contentName', testDetail?.test_content);
      setValue('serialAnswer', testDetail?.serial_answer);
      setParentTest(testDetail?.test_content);
    
    }
  }, [testDetail]);
  useEffect(() => {
    if (updateTestSuccess) {
      dispatch(updateStateOpenToastMessage({ message: 'Sửa bài test thành công', isError: false }));
      dispatch(resetTest());
      history.push(URL_PATH.ADMIN.TEST.MANAGEMENT);
    }
  }, [updateTestSuccess]);

  // const handleParentTest = (event: SelectChangeEvent) => {
  //   setParentTest(event.target.value)
  //   setValue('parentTest', event.target.value)
  // }
  

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
            <Form.Label>Câu hỏi</Form.Label>
            <Form.Control
              type="text"
              id="contentName"
              {...register('contentName', {
                required: true,
              })}
              isInvalid={errors.contentName?.type === 'required'}
            />
            {errors.contentName?.type === 'required' && (
              <Card.Text as="div" className="error-text">
                Bài test không được trống
              </Card.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Đáp án</Form.Label>
            <Form.Control
              type="text"
              id="serialAnswer"
              {...register('serialAnswer', {
                required: 'đáp án không được trống',
                
              })}
              isInvalid={errors.serialAnswer?.type === 'required'}
            />
            {errors.serialAnswer?.type === 'required' && (
              <Card.Text as="div" className="error-text">
                Bài test không được trống
              </Card.Text>
            )}
          </Form.Group>
          <Button type="submit" variant="success" className="btn-right">
            Chỉnh sửa
          </Button>
        </Form>
      </div>
    </>
  );
};

export default TestEdit;
