import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Pagination from '@mui/material/Pagination';
import { Truncate } from '@primer/react';
import DialogConfirm from 'app/components/dialog-confirm';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { changeLink, changeLink2, changeLink3, changeLink4, changeLink5, changeName, changeName5, resetMenuLink } from 'app/shared/reducers/menu';

import AlertMessage from 'app/components/alertMessage';
import { getProduct } from 'app/shared/reducers/product';
import { getProductInfo, getProductInfos } from 'app/shared/reducers/productInfo';
import { delProductInfoDetail, getProductInfoDetails, resetStatus } from 'app/shared/reducers/productInfoDetail';
import { PRODUCT_DETAIL_MANAGEMENT_LINK_NAME, PRODUCT_INFO_DETAIL_LINK, PRODUCT_INFO_DETAIL_LINK_NAME, PRODUCT_INFO_DETAIL_MANAGEMENT_LINK, PRODUCT_INFO_DETAIL_MANAGEMENT_LINK_NAME, PRODUCT_INFO_MANAGEMENT_LINK_NAME, PRODUCT_MANAGEMENT_LINK, PRODUCT_MANAGEMENT_LINK_NAME } from 'app/shared/util/menu-link';
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { changeName2, changeName3, changeName4 } from './../../../shared/reducers/menu';
import { PRODUCT_DETAIL_MANAGEMENT_LINK, PRODUCT_INFO_MANAGEMENT_LINK } from './../../../shared/util/menu-link';
import './product-info-detail-management.scss';

export const ProductInfoDetailManagement = (props: RouteComponentProps<{ productId: string, productInfoId: string }>) => {
  const dispatch = useAppDispatch();
  const [isOpenConfirm, setIsOpenConfirm] = React.useState(false);
  const [dataConfirm, setDataConfirm] = React.useState(null);
  const [acceptLeave, setAcceptLeave] = React.useState(false);

  const [deleteTarget, setDeleteTarget] = React.useState('');
  const [isOpenSuccessMess, setIsOpenSuccessMess] = React.useState(false);
  const [productIdParam, setproductIdParam] = React.useState(props.match.params.productId);
  const [productInfoIdParam, setproductInfoIdParam] = React.useState(props.match.params.productInfoId);

  const page = {
    productId: productIdParam,
    productInfoId: productInfoIdParam,
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
    dispatch(getProductInfoDetails(page));
    dispatch(getProduct(productIdParam));
    dispatch(getProductInfo(productInfoIdParam));
  }, []);

  const product = useAppSelector(state => state.productManagement.product);
  const productInfo = useAppSelector(state => state.productInfoManagement.productInfo);

  useEffect(() => {
    dispatch(resetMenuLink());
    dispatch(changeLink(PRODUCT_MANAGEMENT_LINK));
    dispatch(changeName(PRODUCT_MANAGEMENT_LINK_NAME));
    dispatch(changeLink2(PRODUCT_DETAIL_MANAGEMENT_LINK(productIdParam)));
    dispatch(changeName2(PRODUCT_DETAIL_MANAGEMENT_LINK_NAME(product.product_name)));
    dispatch(changeLink3(PRODUCT_INFO_MANAGEMENT_LINK(productIdParam)));
    dispatch(changeName3(PRODUCT_INFO_MANAGEMENT_LINK_NAME(product.product_name)));
    dispatch(changeLink4(PRODUCT_INFO_DETAIL_LINK(productIdParam, productInfoIdParam)));
    dispatch(changeName4(PRODUCT_INFO_DETAIL_LINK_NAME(productInfo.product_info_name)));
    dispatch(changeLink5(PRODUCT_INFO_DETAIL_MANAGEMENT_LINK(productIdParam, productInfoIdParam)));
    dispatch(changeName5(PRODUCT_INFO_DETAIL_MANAGEMENT_LINK_NAME(product.product_name)));
  }, [product, productInfo])


  let pageSize = 1;
  let pageNum = 1;

  const productInfoDetails = useAppSelector(state => state.productInfoDetailManagement.data);
  const pagination = useAppSelector(state => state.productInfoDetailManagement.pagination);
  const updateSuccess = useAppSelector(state => state.productInfoDetailManagement.updateSuccess);
  const delSuccess = useAppSelector(state => state.productInfoDetailManagement.delSuccess);

  useEffect(() => {
    dispatch(getProductInfoDetails(page));
  }, [delSuccess])

  if (pagination) {
    pageSize = pagination.total_page
    pageNum = pagination.page_num
  }

  function handleDelProductInfoDetail(productInfoDetail) {
    setIsOpenConfirm(true);
    setDeleteTarget(productInfoDetail.product_info_detail_id)
    const _data = {
      title: "Xóa chi tiết sản phẩm: " + productInfoDetail.name,
      description: "Bạn thật sự muốn xóa chi tiết sản phẩm " + productInfoDetail.name + " này không?",
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
      dispatch(delProductInfoDetail(deleteTarget));
    }
  };

  const handleMessage = () => {
    dispatch(resetStatus());
  }

  return (
    <div>
      <Link to={`/admin/product-info-detail-management/${productIdParam}/${productInfoIdParam}/add`}>
        <Button id="addBtn" style={{ marginLeft: "-3px", backgroundColor: "rgb(5 123 7)", color: "white" }} title="Thêm">
          <FontAwesomeIcon icon="plus" />
        </Button>
      </Link>
      <hr />
      <Table hover responsive striped>
        <thead>
          <tr>
            <th>No</th>
            <th>Tên</th>
            <th>Số lượng</th>
            <th>Người tạo</th>
            <th>Ngày tạo</th>
            <th>Người sửa</th>
            <th>Ngày sửa</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {productInfoDetails?.map((productInfoDetail, i) => (
            <tr id={productInfoDetail.product_info_id} key={`user-${i}`}>
              <th scope="row">{(i + 1) + pageNum * 10}</th>
              <td>
                <Truncate maxWidth={150} title={productInfoDetail.name}>
                  {productInfoDetail.name}
                </Truncate>
              </td>
              <td>
                <Truncate maxWidth={150} title={productInfoDetail.total}>
                  {productInfoDetail.total}
                </Truncate>
              </td>

              <td>{productInfoDetail.created_by}</td>
              <td>{productInfoDetail.created_date}</td>
              <td>{productInfoDetail.updated_by}</td>
              <td>{productInfoDetail.updated_date}</td>
              <td>
                <Link to={`/admin/product-info-detail-management/${productIdParam}/${productInfoIdParam}/${productInfoDetail.product_info_detail_id}/edit`} >
                  <Button size='small' id="editBtn" style={{ marginLeft: "-3px", backgroundColor: "#ffe200" }}>
                    <FontAwesomeIcon icon="user-edit" />
                  </Button>
                </Link>

                <Button id="delBtn" style={{ marginLeft: "10px", backgroundColor: "#ff3333", color: "white" }}
                  onClick={() => handleDelProductInfoDetail(productInfoDetail)} title="Xóa">
                  <FontAwesomeIcon icon="trash" />
                </Button>
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
        <AlertMessage type="DELETE" isOpen={delSuccess} onHandleMessage={handleMessage} timeOut="1000" />
      </div>
    </div>
  );
};

export default ProductInfoDetailManagement;
