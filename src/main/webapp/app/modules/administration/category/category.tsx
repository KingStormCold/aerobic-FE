import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Pagination from '@mui/material/Pagination';
import { Truncate } from '@primer/react';
import DialogConfirm from 'app/components/dialog-confirm';
import Loading from 'app/components/loading';
import { URL_PATH } from 'app/config/path';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { ICategoryDetail } from 'app/shared/model/category';
import { deleteCategory, getCategories, resetCategory, updateStateCategory } from 'app/shared/reducers/category';
import { updateStateOpenToastMessage } from 'app/shared/reducers/toast-message';
import "bootstrap/dist/css/bootstrap.min.css";
import moment from 'moment';
import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { updateStateTitle } from 'app/shared/reducers/category-show';
import Chip from '@mui/material/Chip';
const USER_EDIT_TOKEN = "user-management-token-user-edit";

export const CategoryManagement = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(resetCategory())
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
    dispatch(updateStateTitle("Category"))
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

  function handleDeleteCategory(id, categoryName, parentId) {
    setIsOpenConfirm(true);
    setDeleteCategoryId(id);
    const _data = {
      title: "Delete a category: " + categoryName,
      description: parentId === "" ? "If you delete the parent category, all child categories will be deleted " : "You really want to delete a category " + categoryName + "?",
      lblCancel: "Cancel",
      lblOk: "Agree",
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
      dispatch(updateStateOpenToastMessage({ message: 'Category deleted successfully', isError: false }))
      dispatch(getCategories(1));
    }
  }, [deleteCategorySuccess])

  useEffect(() => {
    if (categoriesErrorMessage) {
      dispatch(updateStateOpenToastMessage({ message: 'Get the category list. ' + categoriesErrorMessage, isError: true }))
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
      <h3>List of categories</h3>
      <Link to={`${URL_PATH.ADMIN.CATEGORY.CREATE}`}>
        <Button id="addBtn" style={{ marginLeft: "-3px", backgroundColor: "rgb(5 123 7)", color: "white" }} title="Thêm" className='btn-right'>
          <FontAwesomeIcon icon="plus" />
        </Button>
      </Link>
      <Table hover responsive striped>
        <thead>
          <tr>
            <th>No</th>
            <th>Parent category</th>
            <th>Category name</th>
            <th>Status</th>
            <th>Created by</th>
            <th>Created date</th>
            <th>Modified by</th>
            <th>Modified date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories && categories?.map((category, i) => (
            <tr key={`user-${i}`}>
              <th scope="row">{(i + 1) + (pageNum - 1) * 10}</th>
              <td>
                <Truncate maxWidth={100} title={category.parent_name}>
                  {category.parent_name}
                </Truncate>
              </td>
              <td>
                <Truncate maxWidth={100} title={category.name}>
                  {category.name}
                </Truncate>
              </td>

              <td>
                {category.status === 1 ?
                  <Chip sx={{ fontSize: '12px !important' }} label="Active" color="success" variant="filled" />
                  :
                  <Chip sx={{ fontSize: '12px !important' }} label="Stop" color="error" variant="filled" />
                }
              </td>
              <td>{category.created_by}</td>
              <td>{moment(category.created_at).utc().format('DD-MM-YYYY h:mm:ss')}</td>
              <td>{category.updated_by}</td>
              <td>{moment(category.updated_at).utc().format('DD-MM-YYYY h:mm:ss')}</td>
              <td>
                {/* <Link to={`/admin/user-management/edit`} > */}
                <Button size='small' id="editBtn" style={{ marginLeft: "-3px", backgroundColor: "#ffe200" }}
                  onClick={() => handleEditCategory(category)} title="Edit">
                  <FontAwesomeIcon icon="user-edit" />
                </Button>
                {/* </Link> */}
                <Button size='small' id="delBtn" style={{ marginLeft: "10px", backgroundColor: "#ff3333", color: "white" }}
                  onClick={() => handleDeleteCategory(category.id, category.name, category.parent_id)} title="Delete">
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
