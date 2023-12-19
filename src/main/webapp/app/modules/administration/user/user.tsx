import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Pagination from '@mui/material/Pagination';
import { Truncate } from '@primer/react';
import DialogConfirm from 'app/components/dialog-confirm';
import Loading from 'app/components/loading';
import { URL_PATH } from 'app/config/path';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { IUser } from 'app/shared/model/user';
import { deleteUser, getUsers, resetUser, updateStateUser } from 'app/shared/reducers/user';
import { updateStateOpenToastMessage } from 'app/shared/reducers/toast-message';
import "bootstrap/dist/css/bootstrap.min.css";
import moment from 'moment';
import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import './User.scss';
const USER_EDIT_TOKEN = "user-management-token-user-edit";

export const UserManagement = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(resetUser())
  }, [])
  const [isOpenConfirm, setIsOpenConfirm] = React.useState(false);
  const [dataConfirm, setDataConfirm] = React.useState(null);
  const [deleteUserId, setDeleteUserId] = React.useState('');
  const history = useHistory();
  const loading = useAppSelector(state => state.user.loading);
  const Users = useAppSelector(state => state.user.users);
  const pageNum = useAppSelector(state => state.user.pageNum);
  const totalPage = useAppSelector(state => state.user.totalPage);
  const deleteUserSuccess = useAppSelector(state => state.user.deleteUserSuccess);
  const UsersErrorMessage = useAppSelector(state => state.user.usersErrorMessage);
  const deleteUserErrorMessage = useAppSelector(state => state.user.deleteUserErrorMessage);

  useEffect(() => {
    dispatch(getUsers(1));
  }, [])

  const handlegetpage = (p) => {
    setTimeout(() => {
      dispatch(getUsers(p));
      return;
    }, 100);
    return;
  };

  const handleChange = (e, p) => {
    handlegetpage(p)
  };

  function handleDeleteUser(id, UserName) {
    setIsOpenConfirm(true);
    setDeleteUserId(id);
    const _data = {
      title: "Xóa: " + UserName,
      description: "Bạn thật sự muốn xóa  " + UserName + " này không?",
      lblCancel: "Hủy",
      lblOk: "Đồng ý",
    };
    setDataConfirm(_data);
    return false;
  }

  function handleEditUser(data: IUser) {
    dispatch(updateStateUser(data))
    history.push(URL_PATH.ADMIN.USER.EDIT)
  }

  async function deleteItem() {
    await dispatch(deleteUser(deleteUserId))
  }

  const handleCallBackConfirm = _res => {
    setIsOpenConfirm(crt => false);
    if (_res) {
      deleteItem()
    }
  };

  useEffect(() => {
    if (deleteUserSuccess) {
      console.log('vao');
      console.log('deleteUserSuccess', deleteUserSuccess)
      dispatch(updateStateOpenToastMessage({ message: 'Xóa User thành công', isError: false }))
      dispatch(getUsers(1));
    }
  }, [deleteUserSuccess])

  useEffect(() => {
    if (UsersErrorMessage) {
      dispatch(updateStateOpenToastMessage({ message: 'Lấy được danh sách Users ' + UsersErrorMessage, isError: true }))
    }
  }, [UsersErrorMessage])

  useEffect(() => {
    if (deleteUserErrorMessage) {
      dispatch(updateStateOpenToastMessage({ message: deleteUserErrorMessage, isError: true }))
    }
  }, [deleteUserErrorMessage])

  return (
    <div>
      {loading && <Loading />}
      <h3>Danh sách danh mục</h3>
      <Link to={`${URL_PATH.ADMIN.USER.CREATE}`}>
        <Button id="addBtn" style={{ marginLeft: "-3px", backgroundColor: "rgb(5 123 7)", color: "white" }} title="Thêm">
          <FontAwesomeIcon icon="plus" />
        </Button>
      </Link>
      <hr />
      <Table hover responsive striped>
        <thead>
          <tr>
            <th>No</th>
            <th>Email</th>
            <th>Fullname</th>
            <th>Status</th>
            <th>Phone</th>
            <th>Nguời tạo</th>
            <th>Ngày tạo</th>
            <th>Người sửa</th>
            <th>Ngày sửa</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Users && Users?.map((User, i) => (
            <tr key={`user-${i}`}>
              <th scope="row">{(i + 1) + (pageNum - 1) * 10}</th>
              <td>
                <Truncate maxWidth={100} title={User.email}>
                  {User.email}
                </Truncate>
              </td>
              <td>
                <Truncate maxWidth={100} title={User.fullname}>
                  {User.fullname}
                </Truncate>
              </td>
              <td>
                <Truncate maxWidth={100} title={User.status}>
                  {User.status}
                </Truncate>
              </td>
              <td>
                <Truncate maxWidth={100} title={User.phone}>
                  {User.phone}
                </Truncate>
              </td>
              <td>{User.created_by}</td>
              <td>{moment(User.created_at).utc().format('DD-MM-YYYY h:mm:ss')}</td>
              <td>{User.updated_by}</td>
              <td>{moment(User.updated_at).utc().format('DD-MM-YYYY h:mm:ss')}</td>
              <td>
                {/* <Link to={`/admin/user-management/edit`} > */}
                <Button size='small' id="editBtn" style={{ marginLeft: "-3px", backgroundColor: "#ffe200" }}
                  onClick={() => handleEditUser(User)} title="Chỉnh sửa">
                  <FontAwesomeIcon icon="user-edit" />
                </Button>
                {/* </Link> */}
                <Button size='small' id="delBtn" style={{ marginLeft: "10px", backgroundColor: "#ff3333", color: "white" }}
                  onClick={() => handleDeleteUser(User.id, User.fullname)} title="Xóa">
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

export default UserManagement;
