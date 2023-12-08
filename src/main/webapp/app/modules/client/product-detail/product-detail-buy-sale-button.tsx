import './product-detail-buy-sale-button.scss';

import CloseIcon from '@mui/icons-material/Close';
import { Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Loading from 'app/components/loading';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getDistrict } from 'app/shared/reducers/district';
import { createOrderProduct, resetStatus } from 'app/shared/reducers/order-product';
import { changeProductInfoDetai, getProductDetailProductDetailInfo } from 'app/shared/reducers/product-detail';
import { getProvince } from 'app/shared/reducers/province';
import { getWard } from 'app/shared/reducers/ward';
import { numberWithCommas } from 'app/shared/util/string-utils';
import $ from 'jquery';
import React, { useEffect } from 'react';
import { ValidatedField } from 'react-jhipster';
import { Alert, Button, Row } from 'reactstrap';

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      <div className='popup-title'>{children}</div>
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

const ProductDetailBuySale = props => {
  const [open, setOpen] = React.useState(true);
  const [stepOne, setStepOne] = React.useState(false);
  const [stepTwo, setStepTwo] = React.useState(false);
  const [isAtStore, setIsAtStore] = React.useState(true);
  const [isAtHome, setIsAtHome] = React.useState(false);
  const [inputFullName, setInputFullName] = React.useState('');
  const [isEmptyFullName, setIsEmptyFullName] = React.useState(false);
  const [inputPhoneNumber, setInputPhoneNumber] = React.useState('');
  const [isEmptyPhoneNumber, setIsEmptyPhoneNumber] = React.useState(false);
  const [errorInputPhoneNumber, setErrorInputPhoneNumber] = React.useState('');
  const [inputEmail, setInputEmail] = React.useState('');
  const [isEmptyEmail, setIsEmptyEmail] = React.useState(false);
  const [errorInputEmail, setErrorInputEmail] = React.useState('');
  const [inputAddress, setInputAddress] = React.useState('');
  const [isEmptyAddress, setIsEmptyAddress] = React.useState(false);
  const [inputDelivery, setInputDelivery] = React.useState('');
  const [inputInstallment, setInputInstallment] = React.useState('');
  const [isInstallment, setIsInstallment] = React.useState(false);
  const [inputInstallmentCredit, setInputInstallmentCredit] = React.useState('');
  const [isInstallmentCredit, setIsInstallmentCredit] = React.useState(false);
  const [priceInstallmentMonth, setPriceInstallmentMonth] = React.useState('');
  const [totalPrice, setTotalPrice] = React.useState('');
  const [totalAmount, setTotalAmount] = React.useState('');
  const [totalMonth, setTotalMonth] = React.useState('');
  const [inputProvince, setInputProvince] = React.useState('0');
  const [isEmptyProvince, setIsEmptyProvince] = React.useState(false);
  const [inputDistrict, setInputDistrict] = React.useState('0');
  const [isEmptyDistrict, setIsEmptyDistrict] = React.useState(false);
  const [inputWard, setInputWard] = React.useState('0');
  const [isEmptyWard, setIsEmptyWard] = React.useState(false);
  const [inputProvinceText, setInputProvinceText] = React.useState('');
  const [inputDistrictText, setInputDistrictText] = React.useState('');
  const [inputWardText, setInputWardText] = React.useState('');
  const locationStore = "77/25 Phạm Đăng Giảng, P.Bình Hưng Hoà, Q. Bình tân"
  const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
  const regexEmail = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const provinceList = useAppSelector(state => state.provinceManagement.provinceList);
  const districtList = useAppSelector(state => state.districtManagement.districtList);
  const wardList = useAppSelector(state => state.wardManagement.wardList);
  const [productTitle, setProductTitle] = React.useState('');
  // const productTitle = props.productTitle + " - Màu " + props?.price?.name;

  const updateSuccess = useAppSelector(state => state.orderProductManagement.updateSuccess);
  const updateFail = useAppSelector(state => state.orderProductManagement.updateFail);
  const productInfoNow = useAppSelector(state => state.productDetailClient.productInfoNow);
  const loading = useAppSelector(state => state.orderProductManagement.loading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProvince());
    dispatch(resetStatus());
  }, []);

  if (inputDelivery === '') {
    setInputDelivery('atStore');
  }

  const handleClose = () => {
    setOpen(false);
    setStepOne(false);
    setStepTwo(false);
    $('.zalo-chat-widget').addClass('z-index-2147483644');
    $('.zalo-chat-widget').removeClass('z-index-0');
  };

  const handleMuaNgay = () => {
    setStepOne(true);
    setOpen(true);
    setIsInstallment(false);
    setIsInstallmentCredit(false);
    setProductTitle(props.productTitle + " - Màu " + props?.price?.name)
    if (inputDelivery === 'atStore') {
      setIsAtStore(true);
      setIsAtHome(false);
    } else {
      setIsAtStore(false);
      setIsAtHome(true);
    }
    setPriceInstallmentMonth("");
    setTotalMonth("0")
    if (props.price && props.price.discount_price !== 0) {
      const discountPrice = props?.price?.buy_now_price - props?.price?.discount_price;
      setTotalPrice(String(discountPrice));
      setTotalAmount(String(discountPrice))
    } else {
        setTotalPrice(String(props?.price?.buy_now_price));
        setTotalAmount(String(props?.price?.buy_now_price))
    }
    $('.zalo-chat-widget').addClass('z-index-0');
    $('.zalo-chat-widget').removeClass('z-index-2147483644');
    $('.fb_dialog').addClass('z-index-0');
    $('.fb_dialog').removeClass('z-index-2147483644');
  };

  const handleTraGop = () => {
    setStepOne(true);
    setOpen(true);
    setIsInstallmentCredit(false);
    setProductTitle(props.productTitle + " - Màu " + props?.price?.name + " - Trả góp")
    setIsInstallment(true);
    setInputInstallment("7")
    if (props.price && props.price.installment_price !== 0) {
      const _totalAmount = props?.price?.buy_now_price - props?.price?.discount_price;
      setTotalAmount(String(_totalAmount))
      const discountPrice = props?.price?.installment_price;
      setTotalPrice(String(discountPrice));
    } else {
      const discountPrice = parseInt(String(((props.price.buy_now_price - props.price.discount_price) * 0.3)), 10);
      setTotalPrice(String(discountPrice));
      const _totalAmount = props?.price?.buy_now_price - props?.price?.discount_price;
      setTotalAmount(String(_totalAmount))
    }
    $('.zalo-chat-widget').addClass('z-index-0');
    $('.zalo-chat-widget').removeClass('z-index-2147483644');
    $('.fb_dialog').addClass('z-index-0');
    $('.fb_dialog').removeClass('z-index-2147483644');
  };

  const hanldeCreditCard = () => {
    setStepOne(true);
    setOpen(true);
    setIsInstallment(false);
    setProductTitle(props.productTitle + " - Màu " + props?.price?.name + " - Trả góp qua thẻ tín dụng")
    setIsInstallmentCredit(true);
    setInputInstallmentCredit("3")
    if (props.price && props.price.discount_price !== 0) {
      setTotalPrice("0");
      const _totalAmount = props?.price?.buy_now_price - props?.price?.discount_price;
      setTotalAmount(String(_totalAmount))
    } else {
      setTotalPrice("0");
      const _totalAmount = props?.price?.buy_now_price - props?.price?.discount_price;
      setTotalAmount(String(_totalAmount))
    }
    $('.zalo-chat-widget').addClass('z-index-0');
    $('.zalo-chat-widget').removeClass('z-index-2147483644');
    $('.fb_dialog').addClass('z-index-0');
    $('.fb_dialog').removeClass('z-index-2147483644');
  };

  const handleAtStore = () => {
    setIsAtStore(true);
    setIsAtHome(false);
    setInputDelivery('atStore');
  };

  const handleAtHome = () => {
    setIsAtStore(false);
    setIsAtHome(true);
    setInputDelivery('atHome');
  };

  const handleInstallment = (value) => {
    setInputInstallment(value.target.value);
  };

  const handleInstallmentCredit = (value) => {
    setInputInstallmentCredit(value.target.value);
  };

  const handleProvinceChange = event => {
    dispatch(getDistrict(event.target.value));
    setInputProvince(event.target.value);
    const index = event.nativeEvent.target.selectedIndex;
    setInputProvinceText(event.nativeEvent.target[index].text);
  };

  const handleDistrictChange = event => {
    dispatch(getWard(event.target.value));
    setInputDistrict(event.target.value);
    const index = event.nativeEvent.target.selectedIndex;
    setInputDistrictText(event.nativeEvent.target[index].text);
  };

  const handleWardChange = event => {
    const index = event.nativeEvent.target.selectedIndex;
    setInputWardText(event.nativeEvent.target[index].text);
    setInputWard(event.target.value);
  };

  const handleInputFullName = event => {
    setInputFullName(event.target.value);
  };

  const handleInputPhoneNumber = event => {
    setInputPhoneNumber(event.target.value);
  };

  const handleInputEmail = event => {
    setInputEmail(event.target.value);
  };
  const handleInputAddress = event => {
    setInputAddress(event.target.value);
  };

  const handleNextOne = () => {
    setIsEmptyFullName(false);
    setIsEmptyPhoneNumber(false);
    setIsEmptyEmail(false);
    setIsEmptyAddress(false);
    setIsEmptyProvince(false);
    setIsEmptyDistrict(false);
    setIsEmptyWard(false);
    if (inputFullName === '') {
      setIsEmptyFullName(true);
      return;
    } else if (inputPhoneNumber === '') {
      setIsEmptyPhoneNumber(true);
      setErrorInputPhoneNumber('Vui lòng nhập số điện thoại');
      return;
    } else if (inputPhoneNumber.length !== 10) {
      setIsEmptyPhoneNumber(true);
      setErrorInputPhoneNumber('Số điện thoại không quá 10 số');
      return;
    } else if (!regexPhoneNumber.test(inputPhoneNumber)) {
      setIsEmptyPhoneNumber(true);
      setErrorInputPhoneNumber('Số điện thoại không hợp lệ');
      return;
    } else if (inputEmail === '') {
      setIsEmptyEmail(true);
      setErrorInputEmail('Vui lòng nhập email');
      return;
    } else if (!regexEmail.test(inputEmail)) {
      setIsEmptyEmail(true);
      setErrorInputEmail('Email không hợp lệ');
      return;
    }
    if (inputDelivery === 'atHome') {
      if (inputProvince === '0') {
        setIsEmptyProvince(true);
        return;
      } else if (inputDistrict === '0') {
        setIsEmptyDistrict(true);
        return;
      } else if (inputWard === '0') {
        setIsEmptyWard(true);
        return;
      } else if (inputAddress === '') {
        setIsEmptyAddress(true);
        return;
      }
    }
    if (isInstallment) {
      if (props.price && props.price.buy_now_price !== 0) {
        const priceByMonth = parseInt(String(((props.price.buy_now_price - props.price.discount_price - props.price.installment_price) / Number(inputInstallment))), 10);
        setPriceInstallmentMonth(String(priceByMonth));
      }
      setTotalMonth(inputInstallment)
    } else if (inputInstallmentCredit) {
      if (props.price && props.price.buy_now_price !== 0) {
        const priceByMonth = parseInt(String(((props.price.buy_now_price - props.price.discount_price) / Number(inputInstallmentCredit))), 10);
        setPriceInstallmentMonth(String(priceByMonth));
      }
      setTotalMonth(inputInstallmentCredit)
    }
    
    setStepOne(false);
    setStepTwo(true);
  };

  const handleDone = () => { 
    let address = "";
    if(inputDelivery === 'atStore') {
        address = locationStore
    } else {
        address = inputAddress + ", " + inputWardText + ", " + inputDistrictText + ", " + inputProvinceText
    }
    let buyBy = ""
    if(isInstallment) {
      buyBy = "Trả góp"
    } else if(isInstallmentCredit) {
      buyBy = "Trả góp qua thẻ"
    }
    const data = {
        product_info_detail_id: props.price.product_info_detail_id,
        product_name: productTitle,
        full_name: inputFullName,
        phone_number: inputPhoneNumber,
        email: inputEmail,
        delivery: inputDelivery,
        address,
        total_amount: Number(totalPrice),
        buy_by: buyBy,
        tenor: totalMonth,
        pay_month: Number(priceInstallmentMonth),
        total_money_product: Number(totalAmount)
    };
    dispatch(createOrderProduct(data))
    setOpen(false);
    setStepOne(false);
    setStepTwo(false);
    $('.zalo-chat-widget').addClass('z-index-2147483644');
    $('.zalo-chat-widget').removeClass('z-index-0');
  }
  if(updateSuccess) {
    setTimeout(() => {
        dispatch(resetStatus());
        dispatch(getProductDetailProductDetailInfo(productInfoNow.product_info_id))
    }, 3000);
  }

  const handleBackStepOne = () => {
    setStepOne(true);
    setStepTwo(false);
  };

  return (
    <>
      {loading && <Loading/>}
      {stepOne && (
        <Dialog fullWidth={true} open={open} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
          <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
            BAN ĐANG ĐẶT MUA SẢN PHẨM: {productTitle}
          </BootstrapDialogTitle>
          <DialogContent className="popup-body">
            <DialogContentText id="alert-dialog-description" className="popup-context">
              <span className="title-group">Thông tin khách hàng</span>
              <span className="required-mark">*</span>
              <div className="group-customer">
                {isEmptyFullName && <Typography sx={{ color: 'red' }}>Vui lòng nhập họ và tên</Typography>}
                <ValidatedField
                  type="text"
                  placeholder="Họ và tên*"
                  name="full_name"
                  onChange={e => handleInputFullName(e)}
                  value={inputFullName}
                  className={isEmptyFullName ? 'is-invalid-input' : ''}
                />

                {isEmptyPhoneNumber && <Typography sx={{ color: 'red' }}>{errorInputPhoneNumber}</Typography>}
                <ValidatedField
                  type="text"
                  placeholder="Số điện thoại*"
                  name="phone_number"
                  onChange={e => handleInputPhoneNumber(e)}
                  value={inputPhoneNumber}
                  className={isEmptyPhoneNumber ? 'is-invalid-input' : ''}
                />
                <div className="form-email">
                  {isEmptyEmail && <Typography sx={{ color: 'red' }}>{errorInputEmail}</Typography>}
                  <ValidatedField
                    type="text"
                    placeholder="Email*"
                    name="email"
                    onChange={e => handleInputEmail(e)}
                    value={inputEmail}
                    className={isEmptyEmail ? 'is-invalid-input' : ''}
                  />
                </div>
              </div>
              {isInstallment && 
                <div className="delivery-address">
                  <div className="delivery-address-title">
                    <span className="title-group">Trả góp với</span>
                    <span className="required-mark">*</span>
                  </div>
                  <div className="delivery-address-option">
                    <div className="delivery-at-store">
                      <ValidatedField
                        id="installment"
                        type="radio"
                        name="installment"
                        check
                        checked={inputInstallment === '7'}
                        label="7 Tháng"
                        onChange={(e) => handleInstallment(e)}
                        value="7"
                      />
                    </div>
                    <div className="delivery-at-home">
                      <ValidatedField
                        id="installment1"
                        type="radio"
                        name="installment"
                        checked={inputInstallment === '9'}
                        label="9 Tháng"
                        check
                        onChange={(e) => handleInstallment(e)}
                        value="9"
                      />
                    </div>
                    <div className="delivery-at-home">
                      <ValidatedField
                        id="installment2"
                        type="radio"
                        name="installment"
                        checked={inputInstallment === '12'}
                        label="12 Tháng"
                        check
                        onChange={(e) => handleInstallment(e)}
                        value="12"
                      />
                    </div>
                  </div>
                </div>
              }
              {isInstallmentCredit && 
                <div className="delivery-address">
                  <div className="delivery-address-title">
                    <span className="title-group">Trả góp bằng thẻ tín dụng</span>
                    <span className="required-mark">*</span>
                  </div>
                  <div className="delivery-address-option">
                    <div className="delivery-at-store">
                      <ValidatedField
                        id="creditCard"
                        type="radio"
                        name="installment"
                        check
                        checked={inputInstallmentCredit === '3'}
                        label="3 Tháng"
                        onChange={(e) => handleInstallmentCredit(e)}
                        value="3"
                      />
                    </div>
                    <div className="delivery-at-home">
                      <ValidatedField
                        id="creditCard1"
                        type="radio"
                        name="installment"
                        checked={inputInstallmentCredit === '6'}
                        label="6 Tháng"
                        check
                        onChange={(e) => handleInstallmentCredit(e)}
                        value="6"
                      />
                    </div>
                    <div className="delivery-at-home">
                      <ValidatedField
                        id="creditCard2"
                        type="radio"
                        name="installment"
                        checked={inputInstallmentCredit === '9'}
                        label="9 Tháng"
                        check
                        onChange={(e) => handleInstallmentCredit(e)}
                        value="9"
                      />
                    </div>
                    <div className="delivery-at-home">
                      <ValidatedField
                        id="creditCard3"
                        type="radio"
                        name="installment"
                        checked={inputInstallmentCredit === '12'}
                        label="12 Tháng"
                        check
                        onChange={(e) => handleInstallmentCredit(e)}
                        value="12"
                      />
                    </div>
                    <div className="delivery-at-home">
                      <ValidatedField
                        id="creditCard4"
                        type="radio"
                        name="installment"
                        checked={inputInstallmentCredit === '18'}
                        label="18 Tháng"
                        check
                        onChange={(e) => handleInstallmentCredit(e)}
                        value="18"
                      />
                    </div>
                  </div>
                </div>
              }
              <div className="delivery-address">
                <div className="delivery-address-title">
                  <span className="title-group">Địa chỉ nhận hàng</span>
                  <span className="required-mark">*</span>
                </div>
                <div className="delivery-address-option">
                  <div className="delivery-at-store">
                    <ValidatedField
                      id="displayInSlider"
                      type="radio"
                      name="display_in_slider"
                      check
                      checked={inputDelivery === 'atStore'}
                      label="Nhận tại cửa hàng"
                      onChange={handleAtStore}
                      value="atStore"
                    />
                  </div>
                  <div className="delivery-at-home">
                    <ValidatedField
                      id="displayInSlider1"
                      type="radio"
                      name="display_in_slider"
                      checked={inputDelivery === 'atHome'}
                      label="Giao tận nhà"
                      check
                      onChange={handleAtHome}
                      value="atHome"
                    />
                  </div>
                </div>
                {isAtStore && (
                  <div className="title-store">
                    <span>{locationStore}</span>
                  </div>
                )}
                {isAtHome && (
                  <div className="group-delivery">
                    {isEmptyProvince && <Typography sx={{ color: 'red' }}>Chọn Thành phố/Tỉnh</Typography>}
                    {isEmptyDistrict && <Typography sx={{ color: 'red' }}>Chọn Quận/Huyện</Typography>}
                    {isEmptyWard && <Typography sx={{ color: 'red' }}>Chọn Phường/Xã</Typography>}
                    <div className="group-one">
                      <div className="form-province">
                        <ValidatedField
                          type="select"
                          name="province_root"
                          value={inputProvince}
                          onChange={handleProvinceChange}
                          className={isEmptyProvince ? 'is-invalid-input font-15' : 'font-15'}
                        >
                          <option selected value="0">
                            Thành phố / Tỉnh
                          </option>
                          {provinceList?.map(province => (
                            <option value={province.provinceId} key={province.provinceId} className="tess">
                              {province.provinceName}
                            </option>
                          ))}
                        </ValidatedField>
                      </div>
                      <div className="form-district">
                        <ValidatedField
                          type="select"
                          name="district_root"
                          className={isEmptyDistrict ? 'is-invalid-input font-15' : 'font-15'}
                          value={inputDistrict}
                          onChange={handleDistrictChange}
                        >
                          <option selected value="0">
                            Quận / Huyện
                          </option>
                          {districtList?.map(district => (
                            <option value={district.districtId} key={district.districtId}>
                              {district.districtName}
                            </option>
                          ))}
                        </ValidatedField>
                      </div>
                      <div className="form-ward">
                        <ValidatedField
                          type="select"
                          name="category_root"
                          className={isEmptyWard ? 'is-invalid-input font-15' : 'font-15'}
                          value={inputWard}
                          onChange={handleWardChange}
                        >
                          <option selected value="0">
                            Phường / Xã
                          </option>
                          {wardList?.map(ward => (
                            <option value={ward.wardId} key={ward.wardId}>
                              {ward.wardName}
                            </option>
                          ))}
                        </ValidatedField>
                      </div>
                    </div>

                    <div className="form-address">
                      {isEmptyAddress && <Typography sx={{ color: 'red' }}>Vui lòng nhập địa chỉ</Typography>}
                      <ValidatedField
                        type="text"
                        placeholder="Địa chỉ*"
                        name=""
                        value={inputAddress}
                        onChange={e => handleInputAddress(e)}
                        className={isEmptyAddress ? 'is-invalid-input' : ''}
                      />
                    </div>
                  </div>
                )}
              </div>
            </DialogContentText>
          </DialogContent>
          <div className="popup-footer">
            <DialogActions>
              <div className="footer-one">
                <span className="text-first">Số tiền cần thanh toán: </span>
                <span className="text-second">{numberWithCommas(totalPrice)} đ</span>
              </div>
            </DialogActions>
            <DialogActions>
              <div className="footer-two">
                <Button variant="primary" color="primary" onClick={e => handleNextOne()}>
                  TIẾP TỤC
                </Button>
              </div>
            </DialogActions>
          </div>
        </Dialog>
      )}

      {stepTwo && (
        <Dialog fullWidth={true} open={open} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
          <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
            BAN ĐANG ĐẶT MUA SẢN PHẨM: {productTitle}
          </BootstrapDialogTitle>
          <DialogContent className="popup-steptwo-body">
            <DialogContentText id="alert-dialog-description" className="popup-step-two-context">
              <div style={{ textAlign: 'center' }}>
                <span className="title-group">Xác nhận thông tin</span>
              </div>
              <div className="group-customer">
                <div className="group-fullname">
                  <span>Họ và tên: </span>
                  <span className="span-value">{inputFullName}</span>
                </div>
                <div className="group-phone">
                  <span>Số điện thoại: </span>
                  <span className="span-value">{inputPhoneNumber}</span>
                </div>
                <div className="group-email">
                  <span>Email: </span>
                  <span className="span-value">{inputEmail}</span>
                </div>
                <div className="group-address">
                  {inputDelivery === 'atHome' && (
                    <>
                      <span>Địa chỉ nhận hàng: </span>
                      <span className="span-value">
                        {inputAddress}, {inputWardText}, {inputDistrictText}, {inputProvinceText}
                      </span>
                    </>
                  )}
                  {inputDelivery === 'atStore' && (
                    <>
                      <span>Địa chỉ nhận hàng: </span>
                      <span className="span-value">Nhận tại cửa hàng</span>
                    </>
                  )}
                  <span></span>
                </div>
                
                {(isInstallment || isInstallmentCredit) &&
                  <>
                    <div className="group-email">
                      <span>Số tiền hàng tháng: </span>
                      <span className="span-value">{numberWithCommas(priceInstallmentMonth)} đ </span>
                      <span style={{color:'red'}}>(Số tiền chỉ mang hình thức tạm tính có thể chênh lệch theo số tiền trả trước, lãi suất và ngân hàng,...)</span>
                    </div>
                    <div className="group-email">
                      <span>Tổng số tháng: </span>
                      <span className="span-value">{totalMonth}</span>
                    </div>
                  </>
                }
                <div className="group-total-money">
                  <span>Tổng tiền sản phẩm: </span>
                  <span className="span-value">{numberWithCommas(totalAmount)} đ</span>
                </div>
              </div>
            </DialogContentText>
          </DialogContent>
          <div className="popup-footer">
            <DialogActions>
              <div className="footer-one">
                <span className="text-first">Số tiền cần thanh toán: </span>
                <span className="text-second">{numberWithCommas(totalPrice)} đ</span>
              </div>
            </DialogActions>
            <DialogActions>
              <div className="footer-two">
                <Button variant="outlined" color="secondary" onClick={e => handleBackStepOne()}>
                  QUAY LẠI
                </Button>
                <Button variant="primary" color="primary" onClick={e => handleDone()}>
                  ĐẶT HÀNG
                </Button>
              </div>
            </DialogActions>
          </div>
        </Dialog>
      )}

      <Row className="product-info-detail-interact-row">
        <div className="product-info-detail-interact-tragop-quathe">
          <Button className="product-info-detail-interact-tragop" onClick={handleTraGop}>TRẢ GÓP</Button>
          <Button className="product-info-detail-interact-quathe" onClick={hanldeCreditCard}>TRẢ GÓP QUA THẺ</Button>
        </div>
        <div className="product-info-detail-interact-buy">
          <Button className="product-info-detail-interact-buy-btn" onClick={handleMuaNgay}>
            MUA NGAY
          </Button>
        </div>
      </Row>
      <div className="alert-bottom-right">
        <Alert isOpen={updateSuccess} color="success">Đặt hàng thành công</Alert>
        <Alert isOpen={updateFail} color="danger">Đặt hàng thất bại. Vui lòng liên hệ <a href='https://www.facebook.com/phukienapplebangstore/' target="_blank" rel="noreferrer noopener" style={{textDecoration: 'underline'}}>fanpage</a> để được hỗ trợ.</Alert>
      </div>
    </>
  );
};

export default ProductDetailBuySale;
