/* eslint-disable @typescript-eslint/no-shadow */
import Loading from 'app/components/loading';
import { URL_PATH } from 'app/config/path';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { updateStateTitle } from 'app/shared/reducers/category-show';
import { getVideos, showCourseName } from 'app/shared/reducers/video';
import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useHistory } from 'react-router-dom';

export const VideoDetail = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const loading = useAppSelector(state => state.video.loading);

  useEffect(() => {
    dispatch(getVideos());
  }, []);
  const videoDetail = useAppSelector(state => state.video.video);
  const coursesDetail = useAppSelector(state => state.course.course);
  const title = useAppSelector(state => state.categoryShow.title);

  useEffect(() => {
    dispatch(showCourseName());
  }, []);
  useEffect(() => {

    if (videoDetail.id === undefined) {
      history.push(URL_PATH.ADMIN.VIDEO.MANAGEMENT);
    }
    if (videoDetail.id) {
      dispatch(updateStateTitle(title + " > " + videoDetail?.name))
    }
  }, [videoDetail]);

  const handleAddQuiz = data => {
    history.push(URL_PATH.ADMIN.TEST.MANAGEMENT)
  };

  const handleBack = () => {
    history.push(URL_PATH.ADMIN.VIDEO.MANAGEMENT);
  }

  return (
    <>
      {loading && <Loading />}
      <h3>Detail Video</h3>
      <div>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="name">Video name</Form.Label>
          <Form.Control
            type="text"
            id="name"
            disabled
            value={videoDetail?.name}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="link_video">Video link</Form.Label>
          <Form.Control
            type="text"
            id="link_video"
            disabled
            value={videoDetail?.link_video}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="course_id">
          <Form.Label>Course Name</Form.Label>
          <Form.Select
            aria-label="Course Name"
            value={coursesDetail?.id}
            disabled
          >
            <option value={`${coursesDetail?.id}`}>
              {coursesDetail?.name}
            </option>
          </Form.Select>
        </Form.Group>
        <Button type="submit" variant="success" className="btn-right" onClick={handleAddQuiz}>
          Add questions
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

export default VideoDetail;
