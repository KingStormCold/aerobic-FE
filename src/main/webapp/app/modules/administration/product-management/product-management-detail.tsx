import React, { useEffect, useState } from 'react';
import { Link, RouteComponentProps, useHistory } from 'react-router-dom';
import { Alert, Button, Col, ListGroup, ListGroupItem, Row } from 'reactstrap';
import DialogForm from '../../../components/dialog-form';
import { updateUserHandle } from '../../../shared/reducers/user';
import DialogConfirm from './../../../components/dialog-confirm';
import DialogInfo from './../../../components/dialog-info';
import { useAppDispatch, useAppSelector } from './../../../config/store';
import { changeLink, changeLink2, changeName, resetMenuLink, changeName2 } from './../../../shared/reducers/menu';
import { createPreferential, delPreferential, getPreferential, reset, resetStatus, updatePreferential } from './../../../shared/reducers/preferential';
import './product-management.scss';
import { getProduct } from './../../../shared/reducers/product';
import { addSpecifications, getSpecifications, resetSpecifiaction } from 'app/shared/reducers/specification';
import DialogShowSpec from 'app/components/dialog-show-spec';
import DialogAddSpec from 'app/components/dialog-add-spec';
import ProductForm from 'app/components/product-form';
import { getCategory } from 'app/shared/reducers/category';
import { PRODUCT_DETAIL_MANAGEMENT_LINK, PRODUCT_DETAIL_MANAGEMENT_LINK_NAME } from './../../../shared/util/menu-link';
import { PRODUCT_MANAGEMENT_LINK, PRODUCT_MANAGEMENT_LINK_NAME } from 'app/shared/util/menu-link';

export const ProductManagementDetail = (props: RouteComponentProps<{ productId: string }>) => {

  const allowedExtensions = ["csv"];
  const [dataConfirm, setDataConfirm] = React.useState({});
  const [isOpenPopup, setIsOpenPopup] = React.useState(false);
  const [displayProductId, setDisplayProductId] = React.useState(props.match.params.productId);
  const [acceptLeave, setAcceptLeave] = React.useState(false);
  const [typePopup, setTypePopup] = React.useState('');
  const [inputContent, setInputContent] = React.useState('');
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [isEdit, setIsEdit] = React.useState(false);
  const [csvfileCheck, setCsvFileCheck] = React.useState('');
  const [shortDescription, setShortDescription] = useState("");
  const [infoInsurance, setInfoInsurance] = useState("");

  const [editorSaveState, setEditorSaveState] = useState("");

  const dispatch = useAppDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getProduct(displayProductId));
  }, [displayProductId]);

  const updateSuccess = useAppSelector(state => state.preferentialManagement.updateSuccess);
  const successMessage = useAppSelector(state => state.preferentialManagement.successMessage);
  const delSuccess = useAppSelector(state => state.preferentialManagement.delSuccess);
  const preferential = useAppSelector(state => state.preferentialManagement.preferentail);
  const specificationsData = useAppSelector(state => state.specificationsManagement.specificationsData);
  const successAddFile = useAppSelector(state => state.specificationsManagement.successAddFile);
  const falseFileString = useAppSelector(state => state.specificationsManagement.falseFileString);
  const getSuccess = useAppSelector(state => state.preferentialManagement.getSuccess);
  const isError = useAppSelector(state => state.preferentialManagement.isError);
  const product = useAppSelector(state => state.productManagement.product);
  const category = useAppSelector(state => state.categoryManagement.category);
  const [isNew, setIsNew] = useState(preferential.preferential_id === '');

  useEffect(() => {
    // GET LINK MENU
    dispatch(resetMenuLink());
    dispatch(changeLink(PRODUCT_MANAGEMENT_LINK));
    dispatch(changeName(PRODUCT_MANAGEMENT_LINK_NAME));
    dispatch(changeLink2(PRODUCT_DETAIL_MANAGEMENT_LINK(displayProductId)));
    dispatch(changeName2(PRODUCT_DETAIL_MANAGEMENT_LINK_NAME(product.product_name)));

    dispatch(getCategory(product.category_id));
    setShortDescription(product.sort_description);
    setInfoInsurance(product.info_insurance);
    setEditorSaveState(preferential.content);
    dispatch(getSpecifications(displayProductId));
    dispatch(getPreferential(displayProductId));
  }, [product])

  useEffect(() => {
    if (preferential?.preferential_id === null) setIsNew(true);
    else setIsNew(false);
  }, [preferential])

  if (updateSuccess) {
    setTimeout(() => {
      dispatch(updateUserHandle(false));
    }, 1000);
  }

  function handleDisplayPopupAddSpecification(type) {
    setTypePopup("addSpecification")
    setIsOpenPopup(true)
    const _data = {
      title: "Thêm " + type,
      lblCancel: "Đóng",
      lblOk: "Lưu",
    };
    setDataConfirm(_data);
    return false;
  }

  function handleDisplayPopupShowSpecification(type) {
    setTypePopup("showSpecification")
    setIsOpenPopup(true)
    const _data = {
      title: "Nội dung " + type,
      lblCancel: "Đóng",
    };
    setDataConfirm(_data);
    return false;
  }

  function handleDisplayPopupInfo(type) {
    setTypePopup("info")
    setIsOpenPopup(true)
    const _data = {
      title: "Nội dung " + type,
      description: preferential.content,
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
      description: preferential.content,
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
      if (typePopup === "edit") savePreferential()
      if (typePopup === "delete") confirmDelPreferential()

      dispatch(getPreferential(displayProductId))

      // auto hidden alert after 1s
      setTimeout(() => {
        dispatch(resetStatus())
      }, 1000);
    }
  };

  const handleCallBackAddSpecification = _res => {
    setIsOpenPopup(crt => false);
    if (_res) {
      setAcceptLeave(crt => true);
      const fileExtension = selectedFile?.type.split("/")[1];
      if (!allowedExtensions.includes(fileExtension)) {
        setCsvFileCheck("Phải là file CSV");
        setTimeout(() => {
          setCsvFileCheck("");
        }, 3000);
        return;
      }
      saveSpecifications()
      // auto hidden alert after 1s
      setTimeout(() => {
        dispatch(resetSpecifiaction())
      }, 3000);
    }
  };

  const saveSpecifications = () => {
    const values = {
      product_id: displayProductId,
      selected_file: selectedFile,
    }

    dispatch(addSpecifications(values));
  }

  const savePreferential = () => {
    const values = {
      preferential_id: preferential.preferential_id,
      content: editorSaveState,
      product_id: displayProductId,
    }

    isEdit
      ? (dispatch(updatePreferential(values)))
      : dispatch(createPreferential(values))
    setIsNew(false)
  };

  const confirmDelPreferential = () => {
    dispatch(delPreferential(preferential.preferential_id))
    setIsNew(true)
    dispatch(reset())
  }

  useEffect(() => {
    if (successMessage || getSuccess || delSuccess) dispatch(getPreferential(displayProductId))
  }, [successMessage, getSuccess, delSuccess])

  useEffect(() => {
    dispatch(getSpecifications(displayProductId))
  }, [successAddFile])

  return (
    <div className="product-management-detail-container">
      <Row className="justify-content-center mt-4">
        <Col md="6">
          <h1>
            Chi tiết sản phẩm
          </h1>

          <ProductForm
            isDetailPage={true}
            product={product}
            categoryName={category.category_name}
            shortDescription={shortDescription}
            setShortDescription={setShortDescription}
            infoInsurance={infoInsurance}
            setInfoInsurance={setInfoInsurance}
          />
          <ListGroup>
            <ListGroupItem>
              <div className='product-management-detail-content'>
                Thông số kĩ thuật
              </div>
              <div className='product-management-detail-buttons'>
                {!specificationsData
                  ?
                  <>
                    <Button className='product-management-detail-button' color='success' onClick={() => handleDisplayPopupAddSpecification("thông số kỹ thuật")}>
                      Thêm
                    </Button>
                  </>
                  :
                  <>
                    <Button className='product-management-detail-button' color='success' onClick={() => handleDisplayPopupAddSpecification("thông số kỹ thuật")}>
                      Thêm
                    </Button>
                    <Button className='product-management-detail-button' color='info' onClick={() => handleDisplayPopupShowSpecification("thông số kỹ thuật")}>
                      Hiển thị
                    </Button>
                  </>
                }
              </div>
            </ListGroupItem>

            <ListGroupItem>
              <div className='product-management-detail-content'>
                Ưu đãi
              </div>
              <div className='product-management-detail-buttons'>

                {(isNew)
                  ? <Button className='product-management-detail-button' color='success' onClick={() => handleDisplayPopupForm("ưu đãi", false)}>
                    Thêm
                  </Button>
                  :
                  <>
                    <Button className='product-management-detail-button' color='info' onClick={() => handleDisplayPopupInfo("ưu đãi")}>
                      Chi tiết
                    </Button>
                    <Button className='product-management-detail-button' color='warning' onClick={() => handleDisplayPopupForm("ưu đãi", true)}>
                      Sửa
                    </Button>
                    <Button className='product-management-detail-button' color='danger' onClick={() => handleDisplayPopupDelete("ưu đãi")}>
                      Xoá
                    </Button>
                  </>
                }
              </div>
            </ListGroupItem>

            <ListGroupItem><div className='product-management-detail-content'>
              Danh sách sản phẩm
            </div>
              <div className='product-management-detail-buttons'>
                <Button className='product-management-detail-button' color='info' onClick={() => history.push(`/admin/product-info-management/${displayProductId}`)}>
                  Chi tiết
                </Button>
              </div>
            </ListGroupItem>
          </ListGroup>
          <br />
        </Col>
      </Row>

      {(isOpenPopup && typePopup === "info") && <DialogInfo data={dataConfirm} callBack={handleCallBackConfirm} />}
      {(isOpenPopup && typePopup === "edit") && <DialogForm data={dataConfirm} callBack={handleCallBackConfirm} setContent={setInputContent} isEdit={isEdit} content={preferential.content} setEditorSaveState={setEditorSaveState} />}
      {(isOpenPopup && typePopup === "delete") && <DialogConfirm data={dataConfirm} callBack={handleCallBackConfirm} />}
      {(isOpenPopup && typePopup === "addSpecification") && <DialogAddSpec data={dataConfirm} callBack={handleCallBackAddSpecification} productId={displayProductId} selectedFile={setSelectedFile} />}
      {(isOpenPopup && typePopup === "showSpecification") && <DialogShowSpec data={dataConfirm} callBack={handleCallBackAddSpecification} productId={displayProductId} specification={specificationsData} />}

      <div className="alert-bottom-right">
        <Alert isOpen={successMessage} color="success">Bạn đã {isEdit ? "cập nhật" : "thêm mới"} thành công</Alert>
        <Alert isOpen={delSuccess} color="success">Bạn đã xoá thành công</Alert>
        <Alert isOpen={successAddFile} color="success">Bạn đã cấu hình thông số thành công</Alert>
        <Alert isOpen={!!csvfileCheck} color="danger">{csvfileCheck}</Alert>
      </div>
      <br />
      <br />
      <br />
    </div >
  );
};

export default ProductManagementDetail;
