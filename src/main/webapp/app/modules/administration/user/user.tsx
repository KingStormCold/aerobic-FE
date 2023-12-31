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
import './user_edit.scss';
import { updateStateTitle } from 'app/shared/reducers/category-show';
import { Chip } from '@mui/material';
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
  const users = useAppSelector(state => state.user.users);
  const pageNum = useAppSelector(state => state.user.pageNum);
  const totalPage = useAppSelector(state => state.user.totalPage);
  const deleteUserSuccess = useAppSelector(state => state.user.deleteUserSuccess);
  const UsersErrorMessage = useAppSelector(state => state.user.usersErrorMessage);
  const deleteUserErrorMessage = useAppSelector(state => state.user.deleteUserErrorMessage);

  useEffect(() => {
    dispatch(updateStateTitle("User"))
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
      title: "Delete: " + UserName,
      description: "You really want to delete " + UserName + "?",
      lblCancel: "Cancel",
      lblOk: "Agree"
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
      dispatch(updateStateOpenToastMessage({ message: 'User deleted successfully', isError: false }))
      dispatch(getUsers(1));
    }
  }, [deleteUserSuccess])

  useEffect(() => {
    if (UsersErrorMessage) {
      dispatch(updateStateOpenToastMessage({ message: 'Get a list of users. ' + UsersErrorMessage, isError: true }))
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
      <h3>List of categories</h3>
      <Link to={`${URL_PATH.ADMIN.USER.CREATE}`}>
        <Button id="addBtn" style={{ marginLeft: "-3px", backgroundColor: "rgb(5 123 7)", color: "white" }} title="Thêm" className='btn-right'>
          <FontAwesomeIcon icon="plus" />
        </Button>
      </Link>
      <Table hover responsive striped>
        <thead>
          <tr>
            <th>No</th>
            <th>Email</th>
            <th>Fullname</th>
            <th>Status</th>
            <th>Phone number</th>
            <th>Created by</th>
            <th>Created date</th>
            <th>Modified by</th>
            <th>Modified date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users && users?.map((user, i) => (
            <tr key={`user-${i}`}>
              <th scope="row">{(i + 1) + (pageNum - 1) * 10}</th>
              <td>
                <Truncate maxWidth={100} title={user.email}>
                  {user.email}
                </Truncate>
              </td>
              <td>
                <Truncate maxWidth={100} title={user.fullname}>
                  {user.fullname}
                </Truncate>
              </td>
              <td>
                {user.status === 1 ?
                  <Chip sx={{ fontSize: '12px !important' }} label="Active" color="success" variant="filled" />
                  :
                  <Chip sx={{ fontSize: '12px !important' }} label="Stop" color="error" variant="filled" />
                }
              </td>
              <td>
                <Truncate maxWidth={100} title={user.phone}>
                  {user.phone}
                </Truncate>
              </td>
              <td>{user.created_by}</td>
              <td>{moment(user.created_at).utc().format('DD-MM-YYYY h:mm:ss')}</td>
              <td>{user.updated_by}</td>
              <td>{moment(user.updated_at).utc().format('DD-MM-YYYY h:mm:ss')}</td>
              <td>
                {user.email === 'admin@gmail.com' ? <></> : <><Button size='small' id="editBtn" style={{ marginLeft: "-3px", backgroundColor: "#ffe200" }}
                  onClick={() => handleEditUser(user)} title="Edit">
                  <FontAwesomeIcon icon="user-edit" />
                </Button>
                  {/* </Link> */}
                  <Button size='small' id="delBtn" style={{ marginLeft: "10px", backgroundColor: "#ff3333", color: "white" }}
                    onClick={() => handleDeleteUser(user.id, user.email)} title="Delete">
                    <FontAwesomeIcon icon="trash" />
                  </Button></>}
                {/* <Link to={`/admin/user-management/edit`} > */}

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
