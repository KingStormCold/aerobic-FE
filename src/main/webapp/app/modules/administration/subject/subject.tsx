import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Pagination from '@mui/material/Pagination';
import { Truncate } from '@primer/react';
import DialogConfirm from 'app/components/dialog-confirm';
import Loading from 'app/components/loading';
import { URL_PATH } from 'app/config/path';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { ISubjectDetail } from 'app/shared/model/subject';
import { updateStateTitle } from 'app/shared/reducers/category-show';
import { deleteSubject, getSubjects, resetSubject, updateStateSubject } from 'app/shared/reducers/subject';
import { updateStateOpenToastMessage } from 'app/shared/reducers/toast-message';
import { numberWithCommas } from 'app/shared/util/string-utils';
import "bootstrap/dist/css/bootstrap.min.css";
import moment from 'moment';
import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Table } from 'reactstrap';

const USER_EDIT_TOKEN = "user-management-token-user-edit";

export const SubjectManagement = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(resetSubject())
  }, [])

  const [isOpenConfirm, setIsOpenConfirm] = React.useState(false);
  const [dataConfirm, setDataConfirm] = React.useState(null);
  const [deleteSubjectId, setDeleteSubjectId] = React.useState('');
  const history = useHistory();
  const loading = useAppSelector(state => state.subject.loading);
  const subjects = useAppSelector(state => state.subject.subjects);
  const pageNum = useAppSelector(state => state.subject.pageNum);
  const totalPage = useAppSelector(state => state.subject.totalPage);
  const deleteSubjectSuccess = useAppSelector(state => state.subject.deleteSubjectSuccess);
  const subjectsErrorMessage = useAppSelector(state => state.subject.subjectsErrorMessage);
  const deleteSubjectErrorMessage = useAppSelector(state => state.subject.deleteSubjectErrorMessage);
  useEffect(() => {
    dispatch(updateStateTitle("Môn học"))
    dispatch(getSubjects(1));
  }, [])

  const handlegetpage = (p) => {
    setTimeout(() => {
      dispatch(getSubjects(p));
      return;
    }, 100);
    return;
  };

  const handleChange = (e, p) => {
    handlegetpage(p)
  };

  function handleDeleteSubject(id, subjectName) {
    setIsOpenConfirm(true);
    setDeleteSubjectId(id);
    const _data = {
      title: "Xóa môn học: " + subjectName,
      description: "Bạn thật sự muốn xóa môn học " + subjectName + " này không?",
      lblCancel: "Hủy",
      lblOk: "Đồng ý",
    };
    setDataConfirm(_data);
    return false;
  }

  function handleDetailSubject(data: ISubjectDetail) {
    dispatch(updateStateSubject(data))
    history.push(URL_PATH.ADMIN.SUBJECT.DETAIL)
  }

  function handleEditSubject(data: ISubjectDetail) {
    dispatch(updateStateSubject(data))
    history.push(URL_PATH.ADMIN.SUBJECT.EDIT)
  }

  async function deleteItem() {
    await dispatch(deleteSubject(deleteSubjectId))
  }

  const handleCallBackConfirm = _res => {
    setIsOpenConfirm(crt => false);
    if (_res) {
      deleteItem()
    }
  };

  useEffect(() => {
    if (deleteSubjectSuccess) {
      dispatch(updateStateOpenToastMessage({ message: 'Xóa môn học thành công', isError: false }))
      dispatch(getSubjects(1));
    }
  }, [deleteSubjectSuccess])

  useEffect(() => {
    if (subjectsErrorMessage) {
      dispatch(updateStateOpenToastMessage({ message: 'Lấy được danh sách môn học. ' + subjectsErrorMessage, isError: true }))
    }
  }, [subjectsErrorMessage])

  useEffect(() => {
    if (deleteSubjectErrorMessage) {
      dispatch(updateStateOpenToastMessage({ message: deleteSubjectErrorMessage, isError: true }))
    }
  }, [deleteSubjectErrorMessage])

  return (
    <div>
      {loading && <Loading />}
      <h3>Danh sách môn học</h3>
      <Link to={`${URL_PATH.ADMIN.SUBJECT.CREATE}`}>
        <Button id="addBtn" style={{ marginLeft: "-3px", backgroundColor: "rgb(5 123 7)", color: "white" }} title="Thêm" className='btn-right'>
          <FontAwesomeIcon icon="plus" />
        </Button>
      </Link>
      <Table hover responsive striped>
        <thead>
          <tr>
            <th>No</th>
            <th>Tên</th>
            <th>Giá khuyến mãi</th>
            <th>Danh mục</th>
            <th>Nguời tạo</th>
            <th>Ngày tạo</th>
            <th>Người sửa</th>
            <th>Ngày sửa</th>
            <th className='w-155'>Action</th>
          </tr>
        </thead>
        <tbody>
          {subjects && subjects?.map((subject, i) => (
            <tr key={`user-${i}`}>
              <th scope="row">{(i + 1) + (pageNum - 1) * 10}</th>
              <td>
                <Truncate maxWidth={100} title={subject.name}>
                  {subject.name}
                </Truncate>
              </td>
              <td>
                <Truncate maxWidth={100} title={String(subject.promotional_price)}>
                  {String(subject.promotional_price !== 0 ? numberWithCommas(subject.promotional_price) : 0)}đ
                </Truncate>
              </td>
              <td>
                <Truncate maxWidth={100} title={String(subject.category_name)}>
                  {String(subject.category_name)}
                </Truncate>
              </td>
              <td>{subject.created_by}</td>
              <td>{moment(subject.created_at).utc().format('DD-MM-YYYY h:mm:ss')}</td>
              <td>{subject.updated_by}</td>
              <td>{moment(subject.updated_at).utc().format('DD-MM-YYYY h:mm:ss')}</td>
              <td className='w-155'>
                <Button size='small' id="editBtn" style={{ marginLeft: "-3px", backgroundColor: "rgb(189 188 182)" }}
                  onClick={() => handleDetailSubject(subject)} title="Chi tiết">
                  <FontAwesomeIcon icon="info" />
                </Button>
                <Button size='small' id="editBtn" style={{ marginLeft: "10px", backgroundColor: "#ffe200" }}
                  onClick={() => handleEditSubject(subject)} title="Chỉnh sửa">
                  <FontAwesomeIcon icon="user-edit" />
                </Button>
                {/* </Link> */}
                <Button size='small' id="delBtn" style={{ marginLeft: "10px", backgroundColor: "#ff3333", color: "white" }}
                  onClick={() => handleDeleteSubject(subject.id, subject.category_name)} title="Xóa">
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

export default SubjectManagement;
