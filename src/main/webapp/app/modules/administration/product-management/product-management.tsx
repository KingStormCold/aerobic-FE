import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Pagination from '@mui/material/Pagination';
import { Truncate } from '@primer/react';
import DialogConfirm from 'app/components/dialog-confirm';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { changeLink, changeName, resetMenuLink } from 'app/shared/reducers/menu';

import { getProducts, resetStatus } from 'app/shared/reducers/product';
import { PRODUCT_MANAGEMENT_LINK, PRODUCT_MANAGEMENT_LINK_NAME } from 'app/shared/util/menu-link';
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

import { Alert, Button, Table } from 'reactstrap';
import { delProduct } from './../../../shared/reducers/product';
import './product-management.scss';
import { draftToHtml } from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';
import draftToHtmlPuri from "draftjs-to-html";

export const ProductManagement = (props: RouteComponentProps<{ productId: string }>) => {
  const dispatch = useAppDispatch();
  const [isOpenConfirm, setIsOpenConfirm] = React.useState(false);
  const [dataConfirm, setDataConfirm] = React.useState(null);
  const [acceptLeave, setAcceptLeave] = React.useState(false);

  const [deleteProductId, setDeleteProductId] = React.useState('');
  const [isOpenSuccessMess, setIsOpenSuccessMess] = React.useState(false);

  const page = {
    page: 0,
    size: 10,
    sort: 'createdDate'
  }

  const handlegetpage = (p) => {
    setTimeout(() => {
      page.page = p;
      dispatch(getProducts(page));
      return;
    }, 100);
    return;
  };

  const handleChange = (e, p) => {
    handlegetpage(p - 1)
  };

  useEffect(() => {
    dispatch(resetMenuLink());
    dispatch(changeName(PRODUCT_MANAGEMENT_LINK_NAME));
    dispatch(changeLink(PRODUCT_MANAGEMENT_LINK));
    dispatch(getProducts(page));
  }, [])

  let pageSize = 1;
  let pageNum = 1;

  const products = useAppSelector(state => state.productManagement.data);
  const pagination = useAppSelector(state => state.productManagement.pagination);
  const updateSuccess = useAppSelector(state => state.productManagement.updateSuccess);
  const delSuccess = useAppSelector(state => state.productManagement.delSuccess);

  if (pagination) {
    pageSize = pagination.total_page
    pageNum = pagination.page_num
  }


  function handleDelProduct(product) {
    const { product_name } = product
    const { product_id } = product

    setIsOpenConfirm(true);
    setDeleteProductId(product_id)
    const _data = {
      title: "Xóa sản phẩm: " + product_name,
      description: "Bạn thật sự muốn xóa sản phẩm " + product_name + " này không?",
      lblCancel: "Hủy",
      lblOk: "Đồng ý",
    };
    setDataConfirm(_data);
    return false;
  }

  const handleCallBackConfirm = _res => {
    setIsOpenConfirm(crt => false);
    if (_res) {
      setAcceptLeave(crt => true);

      dispatch(delProduct(deleteProductId));
    }
  };

  useEffect(() => {
    dispatch(getProducts(page));

    setTimeout(() => {
      dispatch(resetStatus())
    }, 3000);
  }, [delSuccess])

  return (
    <div>
      <Link to="/admin/product-management/add">
        <Button id="addBtn" style={{ marginLeft: "-3px", backgroundColor: "rgb(5 123 7)", color: "white" }} title="Thêm">
          <FontAwesomeIcon icon="plus" />
        </Button>
      </Link>
      <hr />
      <Table hover responsive striped>
        <thead>
          <tr>
            <th>No</th>
            <th>Tên sản phẩm</th>
            <th>Tên danh mục</th>
            <th>Người tạo</th>
            <th>Ngày tạo</th>
            <th>Người sửa</th>
            <th>Ngày sửa</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product, i) =>
          (
            <tr id={product.product_id} key={`user-${i}`}>
              <th scope="row">{(i + 1) + pageNum * 10}</th>
              <td>
                <Truncate maxWidth={150} title={product.product_name}>
                  {product.product_name}
                </Truncate>
              </td>
              <td>
                <Truncate maxWidth={150} title={product.category_name}>
                  {product.category_name}
                </Truncate>
              </td>
              <td>{product.created_by}</td>
              <td>{product.created_date}</td>
              <td>{product.updated_by}</td>
              <td>{product.updated_date}</td>
              <td>
                <Link to={`/admin/product-management/${product.product_id}/edit`} >
                  <Button size='small' id="editBtn" style={{ marginLeft: "-3px", backgroundColor: "#ffe200" }}>
                    <FontAwesomeIcon icon="user-edit" />
                  </Button>
                </Link>

                <Button id="delBtn" style={{ marginLeft: "10px", backgroundColor: "#ff3333", color: "white" }}
                  onClick={() => handleDelProduct(product)} title="Xóa">

                  <FontAwesomeIcon icon="trash" />
                </Button>

                <Link to={`/admin/product-management/${product.product_id}/detail`} >
                  <Button size='small' id="editBtn" style={{ marginLeft: "10px", backgroundColor: "rgb(75 113 162)", color: "white" }} title="Chi tiết" >
                    <FontAwesomeIcon icon="info" />
                  </Button>
                </Link>
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

      <div className="alert-bottom-right">
        <Alert isOpen={delSuccess} color="success">Bạn đã xoá thành công</Alert>
      </div>
    </div>
  );
};

export default ProductManagement;
