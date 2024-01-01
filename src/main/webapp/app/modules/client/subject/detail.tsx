import Loading from 'app/components/loading';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import React, { useEffect } from 'react';
import Image from 'react-bootstrap/Image';
import './detail.scss';
import { URL_PATH } from 'app/config/path';
import { courseClient } from 'app/shared/reducers/subject';
import { Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';

export const Detail = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.subject.loading);
  const subjectDetailClient = useAppSelector(state => state.subject.subjectDetailClient);
  const courseDetailClients = useAppSelector(state => state.subject.courseDetailClient);

  useEffect(() => {
    if (subjectDetailClient && subjectDetailClient.subject_id) {
      dispatch(courseClient(subjectDetailClient.subject_id));
    }
  }, [subjectDetailClient]);

  const handlePayment = courseId => {

    history.push(URL_PATH.LOGOUT);
  };

  const handlePaymentFull = subjectId => {
    
    history.push(URL_PATH.LOGOUT);
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

        <div className="container9">
          <div className="table-container">
            <div className="header">
              <p className="heading">Tên khóa học</p>
              <p className="heading">Giá</p>
              <p className="heading">Giá khuyến mãi</p>
              <p className="heading">Level</p>
              <p className="heading"></p>
            </div>
            <div className="body ">
              {courseDetailClients &&
                courseDetailClients.course &&
                courseDetailClients.course.length > 0 &&
                courseDetailClients.course.map(course => (
                  <div className="row" key={course.course_id}>
                    <p className="heading">{course.course_name}</p>
                    <p className="heading">{course.price}</p>
                    <p className="heading">{course.promotional_price}</p>
                    <p className="heading">{course.level}</p>
                    <p>
                      <Button type="submit" variant="success" className="btn-right" onClick={e => handlePayment(course.course_id)}>
                        Đăng ký
                      </Button>
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div>
          <Button type="submit" className="btn-submit" onClick={e => handlePaymentFull(subjectDetailClient?.subject_id)}>
            Bạn muốn đăng ký full khóa học với nhiều ưu đãi
          </Button>
        </div>
      </div>
    </>
  );
};

export default Detail;
