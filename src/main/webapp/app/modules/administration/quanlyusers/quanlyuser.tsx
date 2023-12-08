import React, { useEffect } from 'react';
import './quanlyuser.scss';
import { Table, Input, Button } from 'reactstrap';
import { useAppDispatch } from 'app/config/store';
import { getUsers, delUser } from 'app/shared/reducers/user';
import { useAppSelector } from 'app/config/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "bootstrap/dist/css/bootstrap.min.css";
import Pagination from '@mui/material/Pagination';
import DialogConfirm from 'app/components/dialog-confirm';
import { RouteComponentProps, Link, useHistory } from 'react-router-dom';
import { Truncate } from '@primer/react';
import { changeName, resetMenuLink } from 'app/shared/reducers/menu';
import { Storage } from 'react-jhipster';

const USER_EDIT_TOKEN = "user-management-token-user-edit";

export const QuanLyUsers = (props: RouteComponentProps) => {
  const dispatch = useAppDispatch();
  const [isOpenConfirm, setIsOpenConfirm] = React.useState(false);
  const [dataConfirm, setDataConfirm] = React.useState(null);
  const [acceptLeave, setAcceptLeave] = React.useState(false);
  const [deleteUserName, setDeleteUserName] = React.useState('');
  const history = useHistory();

  const page = {
    page: 0,
    size: 10,
    sort: 'createdDate'
  }

  const handlegetpage = (p) => {
    setTimeout(() => {
      page.page = p;
      dispatch(getUsers(page));
      return;
    }, 100);
    return;
  };

  const handleChange = (e, p) => {
    handlegetpage(p - 1)
  };

  useEffect(() => {
    dispatch(resetMenuLink());
    dispatch(changeName("Quản lý người dùng"));
    // dispatch(setName("hello"));
    dispatch(getUsers(page));
  }, [])

  let pageSize = 1;
  let pageNum = 1;

  const users = useAppSelector(state => state.userManagement.data);
  const pagination = useAppSelector(state => state.userManagement.pagination);
  if (users === undefined) {
    dispatch(getUsers(page));
  }
  if (pagination) {
    pageSize = pagination.total_page
    pageNum = pagination.page_num
  }

  function handleDelUser(userName) {
    setIsOpenConfirm(true);
    setDeleteUserName(userName);
    const _data = {
      title: "Xóa người dùng: " + userName,
      description: "Bạn thật sự muốn xóa người dùng " + userName + " này không?",
      lblCancel: "Hủy",
      lblOk: "Đồng ý",
    };
    setDataConfirm(_data);
    return false;
  }

  function handleEditUser(userName) {
    Storage.session.set(USER_EDIT_TOKEN, userName);
    history.push("/admin/user-management/edit")
  }

  const handleCallBackConfirm = _res => {
    setIsOpenConfirm(crt => false);
    if (_res) {
      setAcceptLeave(crt => true);
      dispatch(delUser(deleteUserName));
    }
  };


  return (
    <div>
      <Link to="/admin/user-management/add">
        <Button id="addBtn" style={{ marginLeft: "-3px", backgroundColor: "rgb(5 123 7)", color: "white" }} title="Thêm">
          <FontAwesomeIcon icon="plus" />
        </Button>
      </Link>
      <hr />
      <Table hover responsive striped>
        <thead>
          <tr>
            <th>No</th>
            <th>User</th>
            <th>Full name</th>
            <th>Nguời tạo</th>
            <th>Ngày tạo</th>
            <th>Người sửa</th>
            <th>Ngày sửa</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, i) => (
            <tr id={user.user_name} key={`user-${i}`}>
              <th scope="row">{(i + 1) + pageNum * 10}</th>
              <td>
                <Truncate maxWidth={100} title={user.user_name}>
                  {user.user_name}
                </Truncate>
              </td>
              <td>
                <Truncate maxWidth={100} title={user.full_name}>
                  {user.full_name}
                </Truncate>
              </td>
              <td>{user.created_by}</td>
              <td>{user.created_date}</td>
              <td>{user.updated_by}</td>
              <td>{user.updated_date}</td>
              <td>
              {
                user.user_name === 'admin' ?
                <></>
                :
                <>
                  {/* <Link to={`/admin/user-management/edit`} > */}
                    <Button size='small' id="editBtn" style={{ marginLeft: "-3px", backgroundColor: "#ffe200" }}
                    onClick={() => handleEditUser(user.user_name)}>
                      <FontAwesomeIcon icon="user-edit" />
                    </Button>
                  {/* </Link> */}
                  <Button size='small' id="delBtn" style={{ marginLeft: "10px", backgroundColor: "#ff3333", color: "white" }}
                    onClick={() => handleDelUser(user.user_name)} title="Xóa">
                    <FontAwesomeIcon icon="trash" />
                  </Button>
                </>
              }
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {isOpenConfirm && <DialogConfirm data={dataConfirm} callBack={handleCallBackConfirm} />}
      <Pagination
        count={pageSize}
        size="large"
        page={pageNum + 1}
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
        style={{ float: "right" }}
      />
    </div>
  );
};

export default QuanLyUsers;
