import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Pagination from '@mui/material/Pagination';
import { Truncate } from '@primer/react';
import DialogConfirm from 'app/components/dialog-confirm';
import Loading from 'app/components/loading';
import { URL_PATH } from 'app/config/path';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { ITestDetail } from 'app/shared/model/test';
import { deleteTest, getTests, resetTest, updateStateTest } from 'app/shared/reducers/test';
import { updateStateOpenToastMessage } from 'app/shared/reducers/toast-message';
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment';
import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import './test.scss';
const USER_EDIT_TOKEN = 'user-management-token-user-edit';

export const TestManagement = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(resetTest());
  }, []);
  const [isOpenConfirm, setIsOpenConfirm] = React.useState(false);
  const [dataConfirm, setDataConfirm] = React.useState(null);
  const [deleteTestId, setDeleteTestId] = React.useState('');
  const history = useHistory();
  const loading = useAppSelector(state => state.test.loading);
  const testsData = useAppSelector(state => state.test.testsData);
  const answers = useAppSelector(state => state.answer.answers);
  const pageNum = useAppSelector(state => state.test.pageNum);
  const totalPage = useAppSelector(state => state.test.totalPage);
  const deleteTestSuccess = useAppSelector(state => state.test.deleteTestSuccess);
  const testsErrorMessage = useAppSelector(state => state.test.testsErrorMessage);
  const deleteTestErrorMessage = useAppSelector(state => state.test.deleteTestErrorMessage);
  const videoDetail = useAppSelector(state => state.video.video);

  useEffect(() => {
    if (videoDetail.id === undefined) {
      history.push(URL_PATH.ADMIN.COURSE.MANAGEMENT)
    }
    if (videoDetail.id) {
      dispatch(getTests({ page: 1, id: videoDetail?.id }));
    }
  }, [videoDetail]);

  const handlegetpage = p => {
    setTimeout(() => {
      dispatch(getTests({ page: p, id: videoDetail?.id }));
      return;
    }, 100);
    return;
  };

  const handleChange = (e, p) => {
    handlegetpage(p);
  };

  function handleDeleteTest(id, testName) {
    setIsOpenConfirm(true);
    setDeleteTestId(id);
    const _data = {
      title: 'Xóa danh mục: ' + testName,
      description: 'Bạn thật sự muốn xóa danh mục ' + testName + ' này không?',
      lblCancel: 'Hủy',
      lblOk: 'Đồng ý',
    };
    setDataConfirm(_data);
    return false;
  }

  function handleEditTest(data: ITestDetail) {
    dispatch(updateStateTest(data));
    history.push(URL_PATH.ADMIN.TEST.EDIT);
  }

  async function deleteItem() {
    await dispatch(deleteTest(deleteTestId));
  }

  const handleCallBackConfirm = _res => {
    setIsOpenConfirm(crt => false);
    if (_res) {
      deleteItem();
    }
  };

  useEffect(() => {
    if (deleteTestSuccess) {
      dispatch(updateStateOpenToastMessage({ message: 'Xóa bài test thành công', isError: false }));
      dispatch(getTests({ page: 1, id: videoDetail?.id }));
    }
  }, [deleteTestSuccess]);

  useEffect(() => {
    if (testsErrorMessage) {
      dispatch(updateStateOpenToastMessage({ message: 'không Lấy được danh sách bài test. ' + testsErrorMessage, isError: true }));
    }
  }, [testsErrorMessage]);

  useEffect(() => {
    if (deleteTestErrorMessage) {
      dispatch(updateStateOpenToastMessage({ message: deleteTestErrorMessage, isError: true }));
    }
  }, [deleteTestErrorMessage]);

  return (
    <div>
      {loading && <Loading />}
      <h3>Danh sách bài test</h3>
      <Link to={`${URL_PATH.ADMIN.TEST.CREATE}`}>
        <Button id="addBtn" style={{ marginLeft: "-3px", backgroundColor: "rgb(5 123 7)", color: "white" }} title="Thêm">
          <FontAwesomeIcon icon="plus" />
        </Button>
      </Link>
      <hr />
      <Table hover responsive striped>
        <thead>
          <tr>
            <th>No</th>
            <th>Name Video</th>
            <th>Câu hỏi</th>
            <th>Đáp án đúng</th>
            <th>Câu trả lời 1</th>
            <th>Câu trả lời 2</th>
            <th>Câu trả lời 3</th>
            <th>Câu trả lời 4</th>
            <th>Người tạo</th>
            <th>Ngày tạo</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {testsData && testsData?.map((test, i) => (
            <tr key={`user-${i}`}>
              <th scope="row">{(i + 1) + (pageNum - 1) * 10}</th>
              <td>
                <Truncate maxWidth={150} title={test.video_name}>
                  {test.video_name}
                </Truncate>
              </td>
              <td>
                <Truncate maxWidth={100} title={test.test_content}>
                  {test.test_content}
                </Truncate>
              </td>
              <td>
                <Truncate maxWidth={100} title={test?.answers[0].answer_content}>
                  {test?.answers[0].answer_content}
                </Truncate>
              </td>
              <td>
                <Truncate maxWidth={100} title={test?.answers[1].answer_content}>
                  {test?.answers[1].answer_content}
                </Truncate>
              </td>
              <td>
                <Truncate maxWidth={100} title={test?.answers[2].answer_content}>
                  {test?.answers[2].answer_content}
                </Truncate>
              </td>
              <td>
                <Truncate maxWidth={100} title={test?.answers[3].answer_content}>
                  {test?.answers[3].answer_content}
                </Truncate>
              </td>
              <td>{test.created_by}</td>
              <td>{moment(test.created_at).utc().format('DD-MM-YYYY h:mm:ss')}</td>
              <td>
                <Button size='small' id="editBtn" style={{ marginLeft: "-3px", backgroundColor: "#ffe200" }}
                  onClick={() => handleEditTest(test)} title="Chỉnh sửa">
                  <FontAwesomeIcon icon="user-edit" />
                </Button>
                <Button size='small' id="delBtn" style={{ marginLeft: "10px", backgroundColor: "#ff3333", color: "white" }}
                  onClick={() => handleDeleteTest(test.id, test.test_content)} title="Xóa">
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
        style={{ float: "right" }}
      />
    </div>
  );
};

export default TestManagement;
