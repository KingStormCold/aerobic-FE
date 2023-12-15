import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Pagination from '@mui/material/Pagination';
import { Truncate } from '@primer/react';
import DialogConfirm from 'app/components/dialog-confirm';
import Loading from 'app/components/loading';
import { URL_PATH } from 'app/config/path';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { ICategoryDetail } from 'app/shared/model/category';
import { deleteCategory, getCategories, resetCategory, updateStateCategory } from 'app/shared/reducers/category';
import { resetToastMessage, updateStateOpenToastMessage } from 'app/shared/reducers/toast-message';
import "bootstrap/dist/css/bootstrap.min.css";
import moment from 'moment';
import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import './category.scss';
const USER_EDIT_TOKEN = "user-management-token-user-edit";

export const CategoryManagement = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(resetCategory())
    dispatch(resetToastMessage())
  }, [])
  const [isOpenConfirm, setIsOpenConfirm] = React.useState(false);
  const [dataConfirm, setDataConfirm] = React.useState(null);
  const [deleteCategoryId, setDeleteCategoryId] = React.useState('');
  const history = useHistory();
  const loading = useAppSelector(state => state.category.loading);
  const categories = useAppSelector(state => state.category.categories);
  const pageNum = useAppSelector(state => state.category.pageNum);
  const totalPage = useAppSelector(state => state.category.totalPage);
  const deleteCategorySuccess = useAppSelector(state => state.category.deleteCategorySuccess);
  const categoriesErrorMessage = useAppSelector(state => state.category.categoriesErrorMessage);
  const deleteCategoryErrorMessage = useAppSelector(state => state.category.deleteCategoryErrorMessage);

  useEffect(() => {
    dispatch(getCategories(1));
  }, [])

  const handlegetpage = (p) => {
    setTimeout(() => {
      dispatch(getCategories(p));
      return;
    }, 100);
    return;
  };

  const handleChange = (e, p) => {
    handlegetpage(p)
  };

  function handleDeleteCategory(id, categoryName) {
    setIsOpenConfirm(true);
    setDeleteCategoryId(id);
    const _data = {
      title: "Xóa danh mục: " + categoryName,
      description: "Bạn thật sự muốn xóa danh mục " + categoryName + " này không?",
      lblCancel: "Hủy",
      lblOk: "Đồng ý",
    };
    setDataConfirm(_data);
    return false;
  }

  function handleEditCategory(data: ICategoryDetail) {
    dispatch(updateStateCategory(data))
    history.push(URL_PATH.ADMIN.CATEGORY.EDIT)
  }

  async function deleteItem() {
    await dispatch(deleteCategory(deleteCategoryId))
  }

  const handleCallBackConfirm = _res => {
    setIsOpenConfirm(crt => false);
    if (_res) {
      deleteItem()
    }
  };

  useEffect(() => {
    if (deleteCategorySuccess) {
      dispatch(updateStateOpenToastMessage({ message: 'Xóa danh mục thành công', isError: false }))
      dispatch(getCategories(1));
    }
  }, [deleteCategorySuccess])

  useEffect(() => {
    if (categoriesErrorMessage) {
      dispatch(updateStateOpenToastMessage({ message: 'Lấy được danh sách danh mục. ' + categoriesErrorMessage, isError: true }))
    }
  }, [categoriesErrorMessage])

  useEffect(() => {
    if (deleteCategoryErrorMessage) {
      dispatch(updateStateOpenToastMessage({ message: deleteCategoryErrorMessage, isError: true }))
    }
  }, [deleteCategoryErrorMessage])

  return (
    <div>
      {loading && <Loading />}
      <h3>Danh sách danh mục</h3>
      <Link to={`${URL_PATH.ADMIN.CATEGORY.CREATE}`}>
        <Button id="addBtn" style={{ marginLeft: "-3px", backgroundColor: "rgb(5 123 7)", color: "white" }} title="Thêm">
          <FontAwesomeIcon icon="plus" />
        </Button>
      </Link>
      <hr />
      <Table hover responsive striped>
        <thead>
          <tr>
            <th>No</th>
            <th>Tên danh mục</th>
            <th>Danh mục cha</th>
            <th>Nguời tạo</th>
            <th>Ngày tạo</th>
            <th>Người sửa</th>
            <th>Ngày sửa</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories && categories?.map((category, i) => (
            <tr key={`user-${i}`}>
              <th scope="row">{(i + 1) + (pageNum - 1) * 10}</th>
              <td>
                <Truncate maxWidth={100} title={category.name}>
                  {category.name}
                </Truncate>
              </td>
              <td>
                <Truncate maxWidth={100} title={category.parent_id}>
                  {category.parent_id}
                </Truncate>
              </td>
              <td>{category.created_by}</td>
              <td>{moment(category.created_at).utc().format('DD-MM-YYYY h:mm:ss')}</td>
              <td>{category.updated_by}</td>
              <td>{moment(category.updated_at).utc().format('DD-MM-YYYY h:mm:ss')}</td>
              <td>
                {/* <Link to={`/admin/user-management/edit`} > */}
                <Button size='small' id="editBtn" style={{ marginLeft: "-3px", backgroundColor: "#ffe200" }}
                  onClick={() => handleEditCategory(category)} title="Chỉnh sửa">
                  <FontAwesomeIcon icon="user-edit" />
                </Button>
                {/* </Link> */}
                <Button size='small' id="delBtn" style={{ marginLeft: "10px", backgroundColor: "#ff3333", color: "white" }}
                  onClick={() => handleDeleteCategory(category.id, category.name)} title="Xóa">
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

export default CategoryManagement;
