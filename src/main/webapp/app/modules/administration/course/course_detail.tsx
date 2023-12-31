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
      <h3>Course details</h3>
      <div>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="name">Course Name</Form.Label>
          <Form.Control
            type="text"
            id="name"
            disabled
            value={coursesDetail?.name}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="description">Course Description</Form.Label>
          <Form.Control
            type="text"
            id="description"
            disabled
            value={coursesDetail?.description}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="level">Level</Form.Label>
          <Form.Control
            type="text"
            id="level"
            disabled
            value={coursesDetail?.level}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="price">Price</Form.Label>
          <Form.Control
            type="text"
            id="price"
            disabled
            value={priceCourse}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="promotionalPrice">Promotion price</Form.Label>
          <Form.Control
            type="text"
            id="promotionalPrice"
            value={promotionalPrice}
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check
            type="switch"
            label="Active"
            disabled
            checked={coursesDetail?.status === 1}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Subject</Form.Label>
          <Form.Select
            aria-label="Môn học"
            value={subjectId}
            disabled
          >
            <option value={coursesDetail?.subject_id}>{coursesDetail?.subject_name}</option>
          </Form.Select>
        </Form.Group>
        <Button type="submit" variant="success" className="btn-right" onClick={handleAddVideo}>
          Add Videos
        </Button>
        <Button color='dark' variant="dark" className="btn-right mr-10" onClick={handleBack}>
          Back
        </Button>
        <br />
        <br />
      </div>
    </>
  );
};

export default CourseDetail;
