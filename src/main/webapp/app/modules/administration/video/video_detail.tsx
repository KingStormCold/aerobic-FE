/* eslint-disable @typescript-eslint/no-shadow */
import Loading from 'app/components/loading';
import { URL_PATH } from 'app/config/path';
import { useAppDispatch, useAppSelector } from 'app/config/store';
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

  useEffect(() => {
    dispatch(showCourseName());
  }, []);
  useEffect(() => {
    // kiểm tra nếu người dùng đứng ở trang chỉnh sửa mà ctrl + f5 thì sẽ đá về lại trang quản lý vì Course bị undefined
    // => hk có data để chỉnh sửa
    if (videoDetail.id === undefined) {
      history.push(URL_PATH.ADMIN.VIDEO.MANAGEMENT);
    }
  }, [videoDetail]);

  const handleAddQuiz = data => {
    history.push(URL_PATH.ADMIN.TEST.MANAGEMENT)
  };

  return (
    <>
      {loading && <Loading />}
      <h3>Sửa Video</h3>
      <div>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="name">Tên video</Form.Label>
          <Form.Control
            type="text"
            id="name"
            disabled
            value={videoDetail?.name}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="link_video">Link video</Form.Label>
          <Form.Control
            type="text"
            id="link_video"
            disabled
            value={videoDetail?.link_video}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="course_id">
          <Form.Label>Tên khóa học</Form.Label>
          <Form.Select
            aria-label="Tên khóa học"
            value={coursesDetail?.id}
            disabled
          >
            <option value={`${coursesDetail?.id}`}>
              {coursesDetail?.name}
            </option>
          </Form.Select>
        </Form.Group>
        <Button type="submit" variant="success" className="btn-right" onClick={handleAddQuiz}>
          Thêm câu hỏi
        </Button>
        <br />
        <br />
      </div>
    </>
  );
};

export default VideoDetail;
