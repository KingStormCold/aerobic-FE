import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './product-detail.scss';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getProductDetailProduct, getProductDetailSpecification, resetStateChange, resetProductInfo } from 'app/shared/reducers/product-detail';
import draftToHtmlPuri from "draftjs-to-html";
import React, { Suspense, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import ProductDetailPromotion from './product-detail-promotion';
import ProductDetailPreferential from './product-detail-preferential';
import ProductDetailProductInfo from './product-detail-product-info';
import ProductDetailProductInfoDetail from './product-detail-product-info-detail';
import ProductDetailSpecifications from './product-detail-specifications';
import ProductDetailInsurance from './product-detail-insurance';
import ProductDetailBuySale from './product-detail-buy-sale';
import ProductDetailBuySaleButton from './product-detail-buy-sale-button';
import DialogShowSpec from './dialog-specification';
import { Link } from 'react-router-dom';
import { Storage } from 'react-jhipster';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const PATH_CATEGORY_KEY = 'product_detail_path_category_key'
const DATA_PRODUCT_ID = 'product_detail_data_product_id_key'

const DialogConfirmPayment = props => {
    const [open, setOpen] = React.useState(true);
    const handleClose = _state => {
      setOpen(false);
      if (typeof props.callBack === 'function') {
        props.callBack(!!_state);
      }
    };
  
    return (
      <div>
        <Dialog open={open} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" maxWidth='sm' fullWidth={true}>
          <DialogTitle id="alert-dialog-title" style={{fontWeight: '700'}}>Tính năng mới</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description" style={{color: 'black'}}>Từ giờ bạn đã có thể đặt hàng online bằng cách bấm vào: </DialogContentText>
            <br/>
            <DialogContentText id="alert-dialog-description" style={{color: 'black'}}><img style={{width: '100%'}} src='content/images/cart_online.JPG'/></DialogContentText>
            <br/>
            <DialogContentText id="alert-dialog-description" style={{color: 'black'}}>Hệ thống cửa hàng Mr.Bang xin cảm ơn quý khách.</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="primary" color="primary" onClick={e => handleClose(true)} autoFocus>
              ĐÓNG
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

const ProductDetail = (props: RouteComponentProps<{ productId: string }>) => {

    const [productName, setProductName] = useState('');
    const [productPrefixName, setProductPrefixName] = useState('');
    const [productSubName, setProductSubName] = useState('');
    const [productState, setProductState] = useState(Object);
    const [productImage, setProductImage] = useState('');
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const [height, setHeight] = useState(0);
    const [displayReadmore, setDisplayReadmore] = useState(false);
    let storeData = null;
    const MAX_HEIGHT_CSS = "780px"
    const MAX_HEIGHT = 780

    const productId = Storage.local.get(DATA_PRODUCT_ID);

    const product = useAppSelector(state => state.productDetailClient.product);
    const productInfoNow = useAppSelector(state => state.productDetailClient.productInfoNow);
    const productInfoDetailNow = useAppSelector(state => state.productDetailClient.productInfoDetailNow);
    const specificationsData = useAppSelector(state => state.productDetailClient.specificationsData);
    const categoryNow = useAppSelector(state => state.menuClient.categoryNow);
    const [convertedShortDescription, setConvertedShortDescription] = useState(null);
    const [isOpenConfirm, setIsOpenConfirm] = React.useState(true);

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getProductDetailProduct(productId))
    }, [])

    if (Storage.local.get(PATH_CATEGORY_KEY) != null) {
        storeData = Storage.local.get(PATH_CATEGORY_KEY)
    } else {
        storeData = categoryNow
    }
    Storage.local.remove(PATH_CATEGORY_KEY);
    if (categoryNow == null) {
        Storage.local.set(PATH_CATEGORY_KEY, storeData);
    } else {
        Storage.local.set(PATH_CATEGORY_KEY, categoryNow);
    }

    useEffect(() => {
        if (product?.product_name != null) {
            setProductPrefixName(product.product_name)
            // setProductName(productDefaultName + " " + productInfoNow?.product_info_name)
        }
        setHeight(document.getElementById("content").clientHeight)
    }, [product])

    const contentProduct = draftToHtmlPuri(
        (product != null && product?.content !== null && product?.content !== "") ? JSON.parse(product?.content) : ''
    );

    useEffect(() => {
        if (productInfoNow?.product_info_name != null) {
            setProductSubName(productInfoNow?.product_info_name)
        }
    }, [productInfoNow])

    useEffect(() => {
        setProductName(productPrefixName)
    }, [productPrefixName])

    useEffect(() => {
        window.scrollTo(0, 0)
        setProductState(product)
    }, [product])

    useEffect(() => {
        if (productInfoDetailNow === null && product !== null) {
            setProductImage(product?.image)
        } else if (productInfoDetailNow !== null && product !== null) {
            setProductImage(productInfoDetailNow?.images)
        }
        if (productState !== null && productState?.sort_description !== undefined && productState?.sort_description !== "" ) {
            setConvertedShortDescription(draftToHtmlPuri(JSON.parse(productState.sort_description)));
        }
    }, [productInfoDetailNow, product])

    useEffect(() => {
        if (height > MAX_HEIGHT) { setDisplayReadmore(true) }
        else { setDisplayReadmore(false) }
    }, [height])

    function handleSpecClick() {
        setIsOpenPopup(true)
        return false;
    }

    const handleCallBackShowSpecification = _res => {
        setIsOpenPopup(crt => false);
    };

    function handlePayment(orderProduct) {
        setIsOpenConfirm(true);
        return false;
    }

    return (
        <div className='product-detail'>
            {isOpenConfirm && <DialogConfirmPayment callBack={handlePayment} />}
            <div className='product-detail-link-path'>
                <Link className='product-link-cate' to={`/product-list/${storeData?.cateId}`}>
                    {storeData?.cateName}
                </Link>
                <div className='product-link-steperate'>/</div>
                <div className='product-link-product-name'>{productPrefixName}</div>
            </div>
            <div className='product-detail-container'>
                <div className='product-detail-container-row' >
                    <div className='product-detail-container-col-left' >
                        <Row className='product-detail-container-col-row-left'>
                            <div className='product-left-content-contain'>
                                <div className='product-left-img'>
                                    <img className='img-detail' src={productImage}></img>
                                </div>
                                <div className='prodetail-short-desc'>
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: convertedShortDescription
                                        }}
                                    />
                                </div>
                            </div>
                            <div className='product-middle-content-contain'>
                                <h3>
                                    {productName} {productSubName}
                                </h3>
                                <img className='img-detail-middle' src={productImage}></img>
                                <ProductDetailProductInfo productId={productId} />
                                <ProductDetailProductInfoDetail />
                                <div className='product-info-detail-buy-sale'>
                                    <ProductDetailBuySale product={productState} />
                                    <ProductDetailBuySaleButton product={productState} productTitle ={productName + " " + productSubName} price ={productInfoDetailNow}/>
                                </div>
                                <ProductDetailPromotion />
                            </div>
                        </Row>
                    </div>
                    <div className='product-detail-container-col-right'>
                        {/* <ProductDetailInsurance /> */}
                        <ProductDetailPreferential productId={productId} />
                        {/* <ProductDetailPromotion/> */}
                    </div>
                </div>
                {
                    specificationsData ? 
                        <div className='product-detail-container-middle-responsive'>
                            <ProductDetailPreferential productId={productId} />
                            {/* <ProductDetailInsurance /> */}
                            <Button className='product-detail-container-middle-responsive-button' onClick={handleSpecClick} >Thông số kỹ thuật</Button> : <></>   
                            {/* <div className='product-detail-container-middle-responsive-specification'>
                                <ProductDetailSpecifications productId = {productId} />
                            </div> */}
                        </div>
                    :
                        <></>
                }
                <div id="content" className='product-detail-container-content-row' >
                    <Col xs="9" className='product-detail-content-col-left'>
                        <div className='product-detail-content-col-right-data' >
                            <div id="content" style={displayReadmore ? { maxHeight: MAX_HEIGHT_CSS, overflow: "hidden" } : {}}
                                dangerouslySetInnerHTML={{
                                    __html: contentProduct
                                }}
                            />
                                {displayReadmore
                                    ?
                                    <div className="readmore-button"> 
                                        <span onClick={() => setDisplayReadmore(!displayReadmore)} >Đọc tiếp bài viết <ExpandMoreIcon /></span>
                                    </div>
                                    : height > MAX_HEIGHT
                                        ? 
                                        <div className="readmore-button"> 
                                            <span onClick={() => setDisplayReadmore(!displayReadmore)} >Rút gọn bài viết <ExpandLessIcon /> </span>
                                        </div>
                                        : ""}
                        </div>
                    </Col>

                    <ProductDetailSpecifications productId={productId} />
                </div>
            </div>
            {(isOpenPopup) && <DialogShowSpec callBack={handleCallBackShowSpecification} specification={specificationsData} />}
        </div>
    )
};

export default ProductDetail;
