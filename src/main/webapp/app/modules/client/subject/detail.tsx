import Loading from 'app/components/loading';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import React, { useEffect, useState } from 'react';
import Image from 'react-bootstrap/Image';
import './detail.scss';
import { URL_PATH } from 'app/config/path';
import { courseClient } from 'app/shared/reducers/subject';
import { Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { paymentCourse } from 'app/shared/reducers/course';
import { updateStateOpenToastMessage } from 'app/shared/reducers/toast-message';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { numberWithCommas } from 'app/shared/util/string-utils';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const Detail = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.subject.loading);
  const subjectDetailClient = useAppSelector(state => state.subject.subjectDetailClient);
  const courseDetailClients = useAppSelector(state => state.subject.courseDetailClient);
  const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);
  const paymentCourseSuccess = useAppSelector(state => state.course.paymentCourseSuccess);
  const paymentCourseErrorMessage = useAppSelector(state => state.course.paymentCourseErrorMessage);
  const [open, setOpen] = React.useState(false);
  const [courseId, setCourseId] = React.useState('');
  const [subjectId, setSubjectId] = React.useState('');
  const [subjectFull, setSubjectFull] = React.useState(0);
  const [courseName, setCourseName] = React.useState('');
  const [coursePrice, setCoursePrice] = React.useState(0);

  const handleClose = () => {
    setOpen(false);
  };

  const handleBuy = () => {
    dispatch(paymentCourse({ course_id: Number(courseId), subject_id: Number(subjectId), subject_full: subjectFull }));
  };

  useEffect(() => {
    if (paymentCourseSuccess) {
      dispatch(updateStateOpenToastMessage({ message: 'Bạn đã mua khóa học thành công', isError: false }));
      setOpen(false);
    }
  }, [paymentCourseSuccess]);

  useEffect(() => {
    if (paymentCourseErrorMessage) {
      dispatch(updateStateOpenToastMessage({ message: paymentCourseErrorMessage, isError: true }));
      setOpen(false);
    }
  }, [paymentCourseErrorMessage]);

  useEffect(() => {
    if (subjectDetailClient && subjectDetailClient.subject_id) {
      dispatch(courseClient(subjectDetailClient.subject_id));
    }
  }, [subjectDetailClient]);

  const handlePayment = (course, subject, name, price) => {
    if (!isAuthenticated) {
      dispatch(updateStateOpenToastMessage({ message: 'Bạn vui lòng đăng nhập để có thể mua khóa học này', isError: true }));
      history.push(URL_PATH.LOGIN);
    } else {
      setCourseId(course);
      setSubjectId(subject);
      setSubjectFull(course === 0 ? 1 : 0);
      setCourseName(name);
      setCoursePrice(price);
      setOpen(true);
    }
  };

  return (
    <>
      {loading && <Loading />}
      <div className="container">
        <h3 className="heading">Khóa học online tại nhà - {subjectDetailClient?.subject_name}</h3>
        <div className="image-container">
          <Image className="image-thumbnail" src={subjectDetailClient?.subject_image} thumbnail />
        </div>
        <p className="subheading">{subjectDetailClient?.subject_content}</p>

        <div className="container2">
          <div className="table-container">
            <div className="header">
              <p className="heading">Tên khóa học</p>
              <p className="heading">Giá</p>
              <p className="heading">Giá khuyến mãi</p>
              <p className="heading">Số tiền cần thanh toán</p>
              <p className="heading"></p>
            </div>
            <div className="body ">
              {courseDetailClients &&
                courseDetailClients.map(course => (
                  <div className="row" key={course.course_id}>
                    <p className="heading">{course.course_name}</p>
                    <p className="heading">{course.price}</p>
                    <p className="heading">{course.promotional_price}</p>
                    <p className="heading">{course.price - course.promotional_price}</p>
                    <p>
                      <Button
                        type="submit"
                        variant="success"
                        className="btn-right"
                        onClick={e =>
                          handlePayment(
                            course.course_id,
                            subjectDetailClient.subject_id,
                            course.course_name,
                            course.price - course.promotional_price
                          )
                        }
                      >
                        Đăng ký
                      </Button>
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <React.Fragment>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>
            Bạn có đống ý mua khóa {courseName} này với giá {numberWithCommas(coursePrice)} đ ?
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleClose}>Hủy</Button>
            <Button onClick={handleBuy}>Mua</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </>
  );
};

export default Detail;
