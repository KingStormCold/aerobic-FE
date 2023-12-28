/* eslint-disable @typescript-eslint/no-shadow */
import Loading from 'app/components/loading';
import { URL_PATH } from 'app/config/path';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getCourse, showSubject } from 'app/shared/reducers/course';
import { numberWithCommas } from 'app/shared/util/string-utils';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useHistory } from 'react-router-dom';
import './course_edit.scss';
import { updateStateTitle } from 'app/shared/reducers/category-show';

export const CourseDetail = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const loading = useAppSelector(state => state.course.loading);
  useEffect(() => {
    dispatch(getCourse());
  }, []);
  const coursesDetail = useAppSelector(state => state.course.course);
  const [subjectId, setSubjectId] = useState('');
  const [priceCourse, setPriceCourse] = useState('');
  const [promotionalPrice, setPromotionalPrice] = useState('');
  const title = useAppSelector(state => state.categoryShow.title);

  useEffect(() => {
    dispatch(showSubject());
  }, []);
  useEffect(() => {
    // kiểm tra nếu người dùng đứng ở trang chỉnh sửa mà ctrl + f5 thì sẽ đá về lại trang quản lý vì Course bị undefined
    // => hk có data để chỉnh sửa
    if (coursesDetail.id === undefined) {
      history.push(URL_PATH.ADMIN.COURSE.MANAGEMENT);
    }
    if (coursesDetail.id) {
      setSubjectId(String(coursesDetail?.subject_id));
      const price = numberWithCommas(coursesDetail?.price);
      setPriceCourse(price);
      const promotionPrice = numberWithCommas(coursesDetail?.promotional_price);
      setPromotionalPrice(promotionPrice)
      dispatch(updateStateTitle(title + " > " + coursesDetail?.name))
    }

  }, [coursesDetail]);

  const handleAddVideo = () => {
    history.push(URL_PATH.ADMIN.VIDEO.MANAGEMENT);
  };

  const handleBack = () => {
    history.push(URL_PATH.ADMIN.COURSE.MANAGEMENT);
  }

  return (
    <>
      {loading && <Loading />}
      <h3>Chi tiết khóa học</h3>
      <div>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="name">Tên khóa học</Form.Label>
          <Form.Control
            type="text"
            id="name"
            disabled
            value={coursesDetail?.name}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="description">Mô tả khóa học</Form.Label>
          <Form.Control
            type="text"
            id="description"
            disabled
            value={coursesDetail?.description}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="level">Cấp độ</Form.Label>
          <Form.Control
            type="text"
            id="level"
            disabled
            value={coursesDetail?.level}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="price">Giá</Form.Label>
          <Form.Control
            type="text"
            id="price"
            disabled
            value={priceCourse}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="promotionalPrice">Giá khuyến mãi</Form.Label>
          <Form.Control
            type="text"
            id="promotionalPrice"
            value={promotionalPrice}
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Môn học</Form.Label>
          <Form.Select
            aria-label="Môn học"
            value={subjectId}
            disabled
          >
            <option value={coursesDetail?.subject_id}>{coursesDetail?.subject_name}</option>
          </Form.Select>
        </Form.Group>
        <Button type="submit" variant="success" className="btn-right" onClick={handleAddVideo}>
          Thêm Video
        </Button>
        <Button color='dark' variant="dark" className="btn-right mr-10" onClick={handleBack}>
          Quay lại
        </Button>
        <br />
        <br />
      </div>
    </>
  );
};

export default CourseDetail;
