import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Pagination from '@mui/material/Pagination';
import { Truncate } from '@primer/react';
import DialogConfirm from 'app/components/dialog-confirm';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { changeLink, changeLink2, changeName, changeName2, resetMenuLink, changeLink3 } from 'app/shared/reducers/menu';
import CommentIcon from '@mui/icons-material/Comment';

import { getProduct, getProducts } from 'app/shared/reducers/product';
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

import InfoIcon from '@mui/icons-material/Info';

import { Button, Table, Alert } from 'reactstrap';
import './product-management.scss';
import { delProduct } from '../../../shared/reducers/product';
import { delProductInfo, getProductInfos, reset, resetStatus } from 'app/shared/reducers/productInfo';
import { getPromotion } from 'app/shared/reducers/promotion';
import DialogInfo from 'app/components/dialog-info';
import AlertMessage from 'app/components/alertMessage';
import { PRODUCT_DETAIL_MANAGEMENT_LINK, PRODUCT_DETAIL_MANAGEMENT_LINK_NAME, PRODUCT_INFO_MANAGEMENT_LINK, PRODUCT_INFO_MANAGEMENT_LINK_NAME, PRODUCT_MANAGEMENT_LINK, PRODUCT_MANAGEMENT_LINK_NAME } from './../../../shared/util/menu-link';
import { changeName3 } from './../../../shared/reducers/menu';

export const ProductInfoManagement = (props: RouteComponentProps<{ productId: string }>) => {
  const dispatch = useAppDispatch();
  const [isOpenConfirm, setIsOpenConfirm] = React.useState(false);
  const [dataConfirm, setDataConfirm] = React.useState(null);
  const [acceptLeave, setAcceptLeave] = React.useState(false);
  const [deleteTarget, setDeleteTarget] = React.useState('');
  const [productIdParam, setproductIdParam] = React.useState(props.match.params.productId);

  const page = {
    productId: productIdParam,
    page: 0,
    size: 10,
    sort: 'createdDate'
  }

  const handlegetpage = (p) => {
    setTimeout(() => {
      page.page = p;
      dispatch(getProductInfos(page));
      return;
    }, 100);
    return;
  };

  const handleChange = (e, p) => {
    handlegetpage(p - 1)
  };

  useEffect(() => {
    dispatch(getProductInfos(page));
    dispatch(getProduct(productIdParam));
  }, [])

  const product = useAppSelector(state => state.productManagement.product);

  useEffect(() => {
    dispatch(resetMenuLink())
    dispatch(changeLink(PRODUCT_MANAGEMENT_LINK));
    dispatch(changeName(PRODUCT_MANAGEMENT_LINK_NAME));

    dispatch(changeLink2(PRODUCT_DETAIL_MANAGEMENT_LINK(productIdParam)));
    dispatch(changeName2(PRODUCT_DETAIL_MANAGEMENT_LINK_NAME(product.product_name)));

    dispatch(changeLink3(PRODUCT_INFO_MANAGEMENT_LINK(productIdParam)));
    dispatch(changeName3(PRODUCT_INFO_MANAGEMENT_LINK_NAME(product.product_name)));
  }, [product])


  let pageSize = 1;
  let pageNum = 1;

  const productInfos = useAppSelector(state => state.productInfoManagement.data);
  const pagination = useAppSelector(state => state.productInfoManagement.pagination);
  const updateSuccess = useAppSelector(state => state.productInfoManagement.updateSuccess);
  const delSuccess = useAppSelector(state => state.productInfoManagement.delSuccess);

  useEffect(() => {
    dispatch(getProductInfos(page));
  }, [delSuccess])

  if (pagination) {
    pageSize = pagination.total_page
    pageNum = pagination.page_num
  }

  function handleDelProductInfo(productInfo) {
    setIsOpenConfirm(true);
    setDeleteTarget(productInfo.product_info_id)
    const _data = {
      title: "Xóa sản phẩm: " + productInfo.product_info_name,
      description: "Bạn thật sự muốn xóa sản phẩm " + productInfo.product_info_name + " này không?",
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
      dispatch(delProductInfo(deleteTarget));
    }
  };

  function handleDisplayPopupInfo(promotion) {
    // setTypePopup("info")
    // setIsOpenPopup(!isOpenPopup)
    const _data = {
      title: "Nội dung ",
      description: promotion.content,
      lblCancel: "Đóng",
    };
    setDataConfirm(_data);
    return false;
  }

  const promotion = useAppSelector(state => state.promotionManagement.promotion);

  useEffect(() => {
    if (promotion.promotion_id) {
      handleDisplayPopupInfo(promotion)
    }
  }, [promotion])

  const handleMessage = () => {
    dispatch(resetStatus());
  }

  return (
    <div>
      <Link to={`/admin/product-info-management/${productIdParam}/add`}>
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
            <th>Số lượng</th>
            <th>Người tạo</th>
            <th>Ngày tạo</th>
            <th>Người sửa</th>
            <th>Ngày sửa</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {productInfos?.map((productInfo, i) => (
            <tr id={productInfo.product_info_id} key={`user-${i}`}>
              <th scope="row">{(i + 1) + pageNum * 10}</th>
              <td>
                <Truncate maxWidth={150} title={productInfo.product_info_name}>
                  {productInfo.product_info_name}
                </Truncate>
              </td>
              <td>
                <Truncate maxWidth={150} title={productInfo.total}>
                  {productInfo.total}
                </Truncate>
              </td>

              <td>{productInfo.created_by}</td>
              <td>{productInfo.created_date}</td>
              <td>{productInfo.updated_by}</td>
              <td>{productInfo.updated_date}</td>
              <td>
                <Link to={`/admin/product-info-management/${productIdParam}/${productInfo.product_info_id}/edit`} >
                  <Button size='small' id="editBtn" style={{ marginLeft: "-3px", backgroundColor: "#ffe200" }} title="Sửa">
                    <FontAwesomeIcon icon="user-edit" />
                  </Button>
                </Link>

                <Button id="delBtn" style={{ marginLeft: "10px", backgroundColor: "#ff3333", color: "white" }}
                  onClick={() => handleDelProductInfo(productInfo)} title="Xóa">
                  <FontAwesomeIcon icon="trash" />
                </Button>

                <Link to={`/admin/product-info-detail/${productIdParam}/${productInfo.product_info_id}/detail`} >
                  <Button style={{ width: "40px", marginLeft: "10px", backgroundColor: "rgb(75, 113, 162)", color: "white" }} title="Chi tiết">
                    <FontAwesomeIcon icon="info" />
                  </Button>
                </Link >
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
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
        <AlertMessage type="DELETE" isOpen={delSuccess} onHandleMessage={handleMessage} timeOut="1000" />
      </div>

      {isOpenConfirm && <DialogConfirm data={dataConfirm} callBack={handleCallBackConfirm} />}
    </div>
  );
};

export default ProductInfoManagement;
