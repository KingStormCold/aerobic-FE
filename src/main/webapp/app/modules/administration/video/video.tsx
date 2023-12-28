import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Pagination from '@mui/material/Pagination';
import { Truncate } from '@primer/react';
import DialogConfirm from 'app/components/dialog-confirm';
import Loading from 'app/components/loading';
import { URL_PATH } from 'app/config/path';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { IVideoDetail } from 'app/shared/model/video';
import { deleteVideo, videosPage, resetVideo, updateStateVideo } from 'app/shared/reducers/video';
import { updateStateOpenToastMessage } from 'app/shared/reducers/toast-message';
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment';
import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { updateStateTitle } from 'app/shared/reducers/category-show';
const USER_EDIT_TOKEN = 'user-management-token-user-edit';

export const VideoManagement = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(resetVideo());
  }, []);
  const [isOpenConfirm, setIsOpenConfirm] = React.useState(false);
  const [dataConfirm, setDataConfirm] = React.useState(null);
  const [deleteVideoId, setDeleteVideoId] = React.useState('');
  const history = useHistory();
  const loading = useAppSelector(state => state.video.loading);
  const videos = useAppSelector(state => state.video.videos);
  const pageNum = useAppSelector(state => state.video.pageNum);
  const totalPage = useAppSelector(state => state.video.totalPage);
  const deleteVideoSuccess = useAppSelector(state => state.video.deleteVideoSuccess);
  const videosErrorMessage = useAppSelector(state => state.video.videosErrorMessage);
  const deleteVideoErrorMessage = useAppSelector(state => state.video.deleteVideoErrorMessage);
  const coursesDetail = useAppSelector(state => state.course.course);
  const title = useAppSelector(state => state.categoryShow.title);

  useEffect(() => {
    if (coursesDetail.id === undefined) {
      history.push(URL_PATH.ADMIN.COURSE.MANAGEMENT)
    }
    if (coursesDetail.id) {
      dispatch(videosPage({ page: 1, id: coursesDetail?.id }));
      const splitTitle = title.split(" > Video ")
      dispatch(updateStateTitle(splitTitle[0] + " > Video "))
    }
  }, [coursesDetail]);

  const handlegetpage = (p) => {
    setTimeout(() => {
      dispatch(videosPage({ page: p, id: coursesDetail?.id }));
      return;
    }, 100);
    return;
  };

  const handleChange = (e, p) => {
    handlegetpage(p);
  };

  function handleDeleteVideo(id, videoName) {
    setIsOpenConfirm(true);
    setDeleteVideoId(id);
    const _data = {
      title: 'Xóa video: ' + videoName,
      description: 'Bạn thật sự muốn xóa video ' + videoName + ' này không?',
      lblCancel: 'Hủy',
      lblOk: 'Đồng ý',
    };
    setDataConfirm(_data);
    return false;
  }

  function handleEditVideo(data: IVideoDetail) {
    dispatch(updateStateVideo(data));
    history.push(URL_PATH.ADMIN.VIDEO.EDIT);
  }

  async function deleteItem() {
    await dispatch(deleteVideo(deleteVideoId));
  }

  const handleCallBackConfirm = _res => {
    setIsOpenConfirm(crt => false);
    if (_res) {
      deleteItem();
    }
  };

  useEffect(() => {
    if (deleteVideoSuccess) {
      dispatch(updateStateOpenToastMessage({ message: 'Xóa video thành công', isError: false }));
      dispatch(videosPage({ page: 1, id: coursesDetail.id }));
    }
  }, [deleteVideoSuccess]);

  useEffect(() => {
    if (deleteVideoErrorMessage) {
      dispatch(updateStateOpenToastMessage({ message: deleteVideoErrorMessage, isError: true }));
    }
  }, [deleteVideoErrorMessage]);

  function handleDetailVideo(data: IVideoDetail) {
    dispatch(updateStateVideo(data));
    history.push(URL_PATH.ADMIN.VIDEO.DETAIL)
  }

  return (
    <div>
      {loading && <Loading />}
      <h3>Danh sách video</h3>
      <Link to={`${URL_PATH.ADMIN.COURSE.MANAGEMENT}`}>
        <Button id="addBtn" style={{ marginLeft: "-3px", backgroundColor: "rgb(189, 188, 182)", color: "black" }} title="Quay lại">
          <FontAwesomeIcon icon="chevron-left" />
        </Button>
      </Link>
      <Link to={`${URL_PATH.ADMIN.VIDEO.CREATE}`}>
        <Button id="addBtn" style={{ marginLeft: '-3px', backgroundColor: 'rgb(5 123 7)', color: 'white' }} title="Thêm" className='btn-right'>
          <FontAwesomeIcon icon="plus" />
        </Button>
      </Link>
      <hr />
      <Table hover responsive striped>
        <thead>
          <tr>
            <th>No</th>
            <th>Tên video</th>
            <th>Khóa học</th>
            <th>Link video</th>
            <th>Người tạo</th>
            <th>Ngày tạo</th>
            <th>Người sửa</th>
            <th>Ngày sửa</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {videos &&
            videos?.map((video, i) => (
              <tr key={`video-${i}`}>
                <th scope="row">{i + 1 + (pageNum - 1) * 10}</th>
                <td>
                  <Truncate maxWidth={150} title={video.name}>
                    {video.name}
                  </Truncate>
                </td>
                <td>{video.course_name}</td>
                <td>
                  <Truncate maxWidth={150} title={video.link_video}>
                    {video.link_video}
                  </Truncate>
                </td>
                <td>{video.created_by}</td>
                <td>{moment(video.created_at).utc().format('DD-MM-YYYY h:mm:ss')}</td>
                <td>{video.updated_by}</td>
                <td>{moment(video.updated_at).utc().format('DD-MM-YYYY h:mm:ss')}</td>
                <td>
                  <Button size='small' id="editBtn" style={{ marginLeft: "-3px", backgroundColor: "rgb(189 188 182)" }}
                    onClick={() => handleDetailVideo(video)} title="Chi tiết">
                    <FontAwesomeIcon icon="info" />
                  </Button>
                  <Button
                    size="small"
                    id="editBtn"
                    style={{ marginLeft: "10px", backgroundColor: '#ffe200' }}
                    onClick={() => handleEditVideo(video)}
                    title="Chỉnh sửa"
                  >
                    <FontAwesomeIcon icon="user-edit" />
                  </Button>
                  <Button
                    size="small"
                    id="delBtn"
                    style={{ marginLeft: '10px', backgroundColor: '#ff3333', color: 'white' }}
                    onClick={() => handleDeleteVideo(video.id, video.name)}
                    title="Xóa"
                  >
                    <FontAwesomeIcon icon="trash" />
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      {isOpenConfirm && <DialogConfirm data={dataConfirm} callBack={handleCallBackConfirm} />}
      <Pagination
        count={totalPage}
        size="large"
        page={pageNum}
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
        style={{ float: 'right' }}
      />
    </div>
  );
};

export default VideoManagement;
