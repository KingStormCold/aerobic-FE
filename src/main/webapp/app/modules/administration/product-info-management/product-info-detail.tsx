import AlertMessage from 'app/components/alertMessage';
import { getProductInfo } from 'app/shared/reducers/productInfo';
import { getProductInfoDetail, getProductInfoDetails } from 'app/shared/reducers/productInfoDetail';
import { createPromotion, delPromotion, getPromotion, reset, resetStatus, updatePromotion } from 'app/shared/reducers/promotion';
import { PRODUCT_DETAIL_MANAGEMENT_LINK_NAME, PRODUCT_INFO_DETAIL_LINK, PRODUCT_INFO_DETAIL_LINK_NAME, PRODUCT_INFO_DETAIL_MANAGEMENT_LINK, PRODUCT_INFO_DETAIL_MANAGEMENT_LINK_NAME, PRODUCT_INFO_MANAGEMENT_LINK, PRODUCT_INFO_MANAGEMENT_LINK_NAME, PRODUCT_MANAGEMENT_LINK, PRODUCT_MANAGEMENT_LINK_NAME } from 'app/shared/util/menu-link';
import React, { useEffect, useState } from 'react';
import { ValidatedField, ValidatedForm } from 'react-jhipster';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { Alert, Button, Col, ListGroup, ListGroupItem, Row } from 'reactstrap';
import DialogConfirm from '../../../components/dialog-confirm';
import DialogForm from '../../../components/dialog-form';
import DialogInfo from '../../../components/dialog-info';
import { useAppDispatch, useAppSelector } from '../../../config/store';
import { changeLink, changeLink2, changeLink4, changeName, changeName2, changeName4, resetMenuLink } from '../../../shared/reducers/menu';
import { updatePreferential } from '../../../shared/reducers/preferential';
import { getProduct } from '../../../shared/reducers/product';
import { updateUserHandle } from '../../../shared/reducers/user';
import './product-management.scss';
import { PRODUCT_DETAIL_MANAGEMENT_LINK } from './../../../shared/util/menu-link';
import { changeLink3 } from 'app/shared/reducers/menu';
import { changeName3 } from './../../../shared/reducers/menu';

export const ProductInfoDetail = (props: RouteComponentProps<{ productId: string, productInfoId: string }>) => {

  const allowedExtensions = ["csv"];
  const [isEnableChangePW, setIsEnableChangePW] = useState(false);
  const [dataConfirm, setDataConfirm] = React.useState({});
  const [isOpenPopup, setIsOpenPopup] = React.useState(false);
  const [displayProductId, setDisplayProductId] = React.useState(props.match.params.productId);
  const [acceptLeave, setAcceptLeave] = React.useState(false);
  const [typePopup, setTypePopup] = React.useState('');
  const [inputContent, setInputContent] = React.useState('');
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [isEdit, setIsEdit] = React.useState(false);
  const [isNew, setIsNew] = React.useState(false);
  const [csvfileCheck, setCsvFileCheck] = React.useState('');
  const [totalDetails, setTotalDetails] = React.useState(0);
  const [editorSaveState, setEditorSaveState] = React.useState("");

  const dispatch = useAppDispatch();
  const history = useHistory();
  const PROMOTION_NAME = "khuyến mãi";

  const productInfoId = props.match.params.productInfoId

  useEffect(() => {
    dispatch(getProduct(displayProductId));
  }, [displayProductId]);

  useEffect(() => {
    dispatch(getProduct(displayProductId));
    dispatch(getProductInfo(productInfoId));
    dispatch(getPromotion(productInfoId));
  }, [productInfoId]);

  const loading = useAppSelector(state => state.promotionManagement.loading);
  const updateSuccess = useAppSelector(state => state.promotionManagement.updateSuccess);
  const successMessage = useAppSelector(state => state.promotionManagement.successMessage);
  const delSuccess = useAppSelector(state => state.promotionManagement.delSuccess);
  const preferential = useAppSelector(state => state.preferentialManagement.preferentail);
  const getSuccess = useAppSelector(state => state.promotionManagement.getSuccess);
  const isError = useAppSelector(state => state.promotionManagement.isError);
  const product = useAppSelector(state => state.productManagement.product);
  const category = useAppSelector(state => state.categoryManagement.category);
  const productInfo = useAppSelector(state => state.productInfoManagement.productInfo);
  const promotion = useAppSelector(state => state.promotionManagement.promotion);

  useEffect(() => {
    if (isError) setIsNew(true)
    else setIsNew(false)
  }, [isError])

  const page = {
    productId: displayProductId,
    productInfoId: props.match.params.productInfoId,
    page: 0,
    sort: 'createdDate'
  }

  useEffect(() => {
    dispatch(resetMenuLink());
    dispatch(changeLink(PRODUCT_MANAGEMENT_LINK));
    dispatch(changeName(PRODUCT_MANAGEMENT_LINK_NAME));

    dispatch(changeLink2(PRODUCT_DETAIL_MANAGEMENT_LINK(displayProductId)));
    dispatch(changeName2(PRODUCT_DETAIL_MANAGEMENT_LINK_NAME(product.product_name)));

    dispatch(changeLink3(PRODUCT_INFO_MANAGEMENT_LINK(displayProductId)));
    dispatch(changeName3(PRODUCT_INFO_MANAGEMENT_LINK_NAME(product.product_name)));

    dispatch(changeLink4(PRODUCT_INFO_DETAIL_LINK(displayProductId, productInfoId)));
    dispatch(changeName4(PRODUCT_INFO_DETAIL_LINK_NAME(productInfo.product_info_name)));

    dispatch(getProductInfoDetails(page));

    setEditorSaveState(promotion.content)
  }, [product, productInfo])

  const productInfoDetails = useAppSelector(state => state.productInfoDetailManagement.data);

  // COUNT TOTAL PRODUCT
  useEffect(() => {
    const totalArr = []
    productInfoDetails.map((productInfoDetail) => totalArr.push(Number(productInfoDetail.total)))
    const sumTotal = totalArr.reduce((total, currentTotal) => total + currentTotal, 0)
    setTotalDetails(sumTotal)
  }, [productInfoDetails])


  if (updateSuccess) {
    setTimeout(() => {
      dispatch(updateUserHandle(false));
    }, 1000);
  }

  function handleDisplayPopupInfo(type) {
    setTypePopup("info")
    setIsOpenPopup(true)
    const _data = {
      title: "Nội dung " + type,
      description: promotion.content,
      lblCancel: "Đóng",
    };
    setDataConfirm(_data);
    return false;
  }

  function handleDisplayPopupForm(type, editForm) {
    setIsEdit(editForm)
    setTypePopup("edit")
    setIsOpenPopup(true)
    const _data = {
      title: (editForm ? "Chỉnh sửa " : "Thêm ") + "nội dung " + type,
      description: promotion.content,
      lblOk: "Lưu",
      lblCancel: "Đóng",
    };
    setDataConfirm(_data);
    return false;
  }

  function handleDisplayPopupDelete(type) {
    setTypePopup("delete")
    setIsOpenPopup(true)
    const _data = {
      title: "Xóa nội dung " + type,
      description: "Bạn thật sự muốn xóa ưu đãi này không?",
      lblCancel: "Hủy",
      lblOk: "Đồng ý",
    };
    setDataConfirm(_data);
    return false;
  }

  const handleCallBackConfirm = _res => {
    setIsOpenPopup(crt => false);
    if (_res) {
      setAcceptLeave(crt => true);
      dispatch(resetStatus())
      if (typePopup === "edit") savePromotion()
      if (typePopup === "delete") confirmDelPromotion()

      dispatch(getPromotion(props.match.params.productInfoId));

      // auto hidden alert after 1s
      setTimeout(() => {
        dispatch(resetStatus())
      }, 1000);
    }
  };

  const savePromotion = () => {
    const values = {
      promotion_id: promotion.promotion_id,
      content: editorSaveState,
      product_info_id: props.match.params.productInfoId,
    }

    isEdit
      ? (dispatch(updatePromotion(values)))
      : dispatch(createPromotion(values))
    setIsNew(false)
  };

  const confirmDelPromotion = () => {
    dispatch(delPromotion(promotion.promotion_id))
    setIsNew(true)
    dispatch(reset())
  }

  useEffect(() => {
    if (successMessage || getSuccess || delSuccess) dispatch(getPromotion(props.match.params.productInfoId))
  }, [successMessage, getSuccess, delSuccess])
  const saveProductInfo = () => {
  }

  useEffect(() => {
    if (promotion?.content === null) {
      setIsNew(true);
    }
    else {
      setIsNew(false);
    }
  }, [promotion])

  const handleMessage = () => {
    dispatch(resetStatus());
  }

  return (
    <div className="product-management-detail-container">
      <Row className="justify-content-center mt-4">
        <Col md="6">
          <h1>
            Chi tiết sản phẩm
          </h1>

          <ValidatedForm onSubmit={saveProductInfo} defaultValues={productInfo}>
            <span className='form-group'>Tên thông tin chi tiết sản phẩm</span>
            <span className="required-mark">*</span>
            <ValidatedField
              type="text"
              disabled
              name="product_info_name"
            />

            {/* <span className='form-group'>Giá </span>
            <ValidatedField
              type="number"
              disabled
              name="price"
            />

            <span className='form-group'>Giá gốc</span>
            <ValidatedField
              type="number"
              disabled
              name="original_price"
            /> */}

            <span className='form-group'>Số lượng</span>
            <ValidatedField
              type="number"
              disabled
              name="total"
              value={totalDetails}
            />
          </ValidatedForm>

          <ListGroup>
            <ListGroupItem>
              <div className='product-management-detail-content'>
                Danh sách màu sản phẩm
              </div>
              <div className='product-management-detail-buttons'>
                <Button
                  className='product-management-detail-button'
                  color='info'
                  onClick={() => history.push(`/admin/product-info-detail-management/${displayProductId}/${productInfo.product_info_id}`)}>
                  Chi tiết
                </Button>
              </div>
            </ListGroupItem>

            <ListGroupItem>
              <div className='product-management-detail-content'>
                Khuyến mãi
              </div>
              <div className='product-management-detail-buttons'>
                {isNew
                  ? <Button className='product-management-detail-button' color='success' onClick={() => handleDisplayPopupForm(PROMOTION_NAME, false)}>
                    Thêm
                  </Button>
                  : <>
                    <Button className='product-management-detail-button' color='info' onClick={() => handleDisplayPopupInfo(PROMOTION_NAME)}>
                      Hiển thị
                    </Button>
                    <Button className='product-management-detail-button' color='warning' onClick={() => handleDisplayPopupForm(PROMOTION_NAME, true)}>
                      Sửa
                    </Button>
                    <Button className='product-management-detail-button' color='danger' onClick={() => handleDisplayPopupDelete(PROMOTION_NAME)}>
                      Xoá
                    </Button>
                  </>
                }
              </div>
            </ListGroupItem>
          </ListGroup>
        </Col>
      </Row>

      {(isOpenPopup && typePopup === "info") && <DialogInfo data={dataConfirm} callBack={handleCallBackConfirm} />}
      {(isOpenPopup && typePopup === "edit") && <DialogForm data={dataConfirm} callBack={handleCallBackConfirm} setContent={setInputContent} isEdit={isEdit} content={promotion.content} setEditorSaveState={setEditorSaveState} />}
      {(isOpenPopup && typePopup === "delete") && <DialogConfirm data={dataConfirm} callBack={handleCallBackConfirm} />}

      <div className="alert-bottom-right">
        <AlertMessage type="UPDATE" isOpen={successMessage} onHandleMessage={handleMessage} timeOut="1000" />
        <AlertMessage type="DELETE" isOpen={delSuccess} onHandleMessage={handleMessage} timeOut="1000" />
      </div>
      <br />
      <br />
      <br />
    </div >
  );
};

export default ProductInfoDetail;
