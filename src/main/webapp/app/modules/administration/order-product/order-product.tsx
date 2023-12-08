
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, Pagination, Switch } from '@mui/material';
import { Truncate } from '@primer/react';
import DialogConfirm from 'app/components/dialog-confirm';
import Loading from 'app/components/loading';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { changeName, resetMenuLink } from 'app/shared/reducers/menu';
import { deleteOrderProduct, getOrderProductList, paidOrderProduct, resetStatus } from 'app/shared/reducers/order-product';
import { numberWithCommas } from 'app/shared/util/string-utils';
import React, { useEffect } from 'react';
import { Alert, Button, Table } from 'reactstrap';

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
          <DialogTitle id="alert-dialog-title" style={{fontWeight: '700'}}>{props?.data?.title || ''}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description" style={{color: 'black'}}>Tên sản phẩm: {props?.data?.productName}</DialogContentText>
            <DialogContentText id="alert-dialog-description" style={{color: 'black'}}>Khách hàng: {props?.data?.fullName}</DialogContentText>
            <DialogContentText id="alert-dialog-description" style={{color: 'black'}}>Số điện thoại: {props?.data?.phoneNumber}</DialogContentText>
            <DialogContentText id="alert-dialog-description" style={{color: 'black'}}>Địa chỉ: {props?.data?.address}</DialogContentText>
            <DialogContentText id="alert-dialog-description" style={{color: 'black'}}>Email: {props?.data?.email}</DialogContentText>
            <DialogContentText id="alert-dialog-description" style={{color: 'black'}}>Tổng tiền sản phẩm: {numberWithCommas(props?.data?.totalMoneyProduct)} ₫</DialogContentText>
            <DialogContentText id="alert-dialog-description" style={{color: 'black'}}>Số tiền cần thanh toán: {numberWithCommas(props?.data?.totalAmount)} ₫</DialogContentText>
            {(props?.data?.buyBy !== '' && props?.data?.buyBy !== null) && 
                <>
                    <DialogContentText id="alert-dialog-description" style={{color: 'black'}}>Hình thức thanh toán: {numberWithCommas(props?.data?.buyBy)} </DialogContentText>
                    <DialogContentText id="alert-dialog-description" style={{color: 'black'}}>Tổng số tháng vay: {numberWithCommas(props?.data?.tenor)} </DialogContentText>
                    <DialogContentText id="alert-dialog-description" style={{color: 'black'}}>Số tiền trả mỗi tháng: {numberWithCommas(props?.data?.payMonth)} ₫</DialogContentText>
                </>
            }
            
            <br/>
            <DialogContentText id="alert-dialog-description" style={{color: 'black'}}>Bấm <strong>&quot;Đồng ý&rdquo;</strong> để thanh toán được đơn hàng</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="error" onClick={e => handleClose(false)}>
              {props?.data?.lblCancel}
            </Button>
            <Button variant="primary" color="primary" onClick={e => handleClose(true)} autoFocus>
              {props?.data?.lblOk}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

export const OrderProductManagement = () => {
    const dispatch = useAppDispatch();
    const [isOpenConfirm, setIsOpenConfirm] = React.useState(false);
    const [isOpenConfirmDelete, setIsOpenConfirmDelete] = React.useState(false);
    const [dataConfirm, setDataConfirm] = React.useState(null);
    const [orderId, setOrderId] = React.useState('');
    const [orderStatus, setOrderStatus] = React.useState(true);
    const [acceptLeave, setAcceptLeave] = React.useState(false);

    const handlegetpage = (p) => {
        setTimeout(() => {
            const orderProduct = {
                page: p,
                size: 10,
                paid: orderStatus
            }
            dispatch(getOrderProductList(orderProduct))
            return;
        }, 100);
        return;
    };

    const handleChange = (e, p) => {
        handlegetpage(p - 1)
    };

    let pageSize = 1;
    let pageNum = 1;

    const orderProducts = useAppSelector(state => state.orderProductManagement.orderProductList);
    const pagination = useAppSelector(state => state.orderProductManagement.pagination);
    const paidSuccess = useAppSelector(state => state.orderProductManagement.paidSuccess);
    const paidFail = useAppSelector(state => state.orderProductManagement.paidFail);
    const deleteFail = useAppSelector(state => state.orderProductManagement.deleteFail);
    const deleteSuccess = useAppSelector(state => state.orderProductManagement.deleteSuccess);
    const loading = useAppSelector(state => state.orderProductManagement.loading);

    useEffect(() => {
        dispatch(resetMenuLink());
        dispatch(changeName("Danh sách đặt hàng"));
        const orderProduct = {
            page: 0,
            size: 10,
            paid: orderStatus
        }
        dispatch(getOrderProductList(orderProduct))
    }, [])

    useEffect(() => {
        const orderProduct = {
            page: 0,
            size: 10,
            paid: orderStatus
        }
        dispatch(getOrderProductList(orderProduct))
    }, [paidSuccess])

    useEffect(() => {
        const orderProduct = {
            page: 0,
            size: 10,
            paid: orderStatus
        }
        dispatch(getOrderProductList(orderProduct))
        dispatch(resetStatus())
    }, [deleteSuccess])

    useEffect(() => {
        dispatch(resetStatus())
    }, [paidFail, deleteFail])

    if (pagination) {
        pageSize = pagination.total_page
        pageNum = pagination.page_num
    }

    function handleDelete(id) {
        setIsOpenConfirmDelete(true);
        setOrderId(id)
        const _data = {
            title: "Xóa video",
            description: "Bạn thật sự muốn xóa đơn hàng này không?",
            lblCancel: "Hủy",
            lblOk: "Đồng ý",
        };
        setDataConfirm(_data);
        return false;
    }

    function handlePayment(orderProduct) {
        setIsOpenConfirm(true);
        setOrderId(orderProduct.id)
        const _data = {
            title: "Thanh toán đơn hàng",
            productName: orderProduct.productName,
            fullName: orderProduct.fullName,
            phoneNumber: orderProduct.phoneNumber,
            address: orderProduct.address,
            totalAmount: orderProduct.totalAmount,
            email: orderProduct.email,
            totalMoneyProduct: orderProduct.totalMoneyProduct,
            buyBy: orderProduct.buyBy,
            tenor: orderProduct.tenor,
            payMonth: orderProduct.payMonth,
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
            const data = {
                id: orderId,
                paid: true
            }
            dispatch(paidOrderProduct(data));

            // auto hidden alert after 1s
            setTimeout(() => {
                dispatch(resetStatus())
            }, 3000);
        }
    };

    const handleCallBackConfirmDelete = _res => {
        setIsOpenConfirmDelete(crt => false);
        if (_res) {
            setAcceptLeave(crt => true);
            const data = {
                id: orderId,
                delete: true
            }
            dispatch(deleteOrderProduct(data));
            dispatch(resetStatus())
        }
    };

    const handleSwitchStatus = () => {
        setOrderStatus(!orderStatus);
        const orderProduct = {
            page: 0,
            size: 10,
            paid: !orderStatus
        }
        dispatch(getOrderProductList(orderProduct))
    }

    return (
        <div>
            {loading && <Loading/>}
            <hr />
            <FormControlLabel control={<Switch onChange={handleSwitchStatus}/>} label={orderStatus ? "Đã thanh toán" : "Chưa thanh toán"} />
            <Table hover responsive striped>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Tên sản phẩm</th>
                        <th>Khách hàng</th>
                        <th>Số điện thoại</th>
                        <th>Địa chỉ</th>
                        <th>Giá sản phẩm</th>
                        <th>Hình thức</th>
                        <th>Tiền trả trước</th>
                        <th>Số tháng</th>
                        <th>Tiền mỗi tháng</th>
                        <th>Ngày tạo</th>
                        <th>Ngày sửa</th>
                        <th>Tình trạng</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orderProducts?.map((orderProduct, i) => (
                        <tr id={orderProduct.productName} key={`video-${i}`}>
                            <th scope="row">{(i + 1) + pageNum * 10}</th>
                            <td style={{fontWeight: 600 }}>
                                <Truncate maxWidth={100} title={orderProduct.productName}>
                                    {orderProduct.productName}
                                </Truncate>
                            </td>
                            <td>{orderProduct.fullName}</td>
                            <td style={{fontWeight: 600 }}>{orderProduct.phoneNumber}</td>
                            <td>
                                <Truncate maxWidth={100} title={orderProduct.address}>
                                    {orderProduct.address}
                                </Truncate>
                            </td>
                            <td style={{fontWeight: 600 }}>{numberWithCommas(orderProduct.totalMoneyProduct)} ₫</td>
                            <td>{orderProduct.buyBy}</td>
                            <td style={{fontWeight: 600 }}>{numberWithCommas(orderProduct.totalAmount)} ₫</td>
                            <td>{orderProduct.tenor}</td>
                            <td style={{fontWeight: 600 }}>{numberWithCommas(orderProduct.payMonth)} ₫</td>
                            <td>{orderProduct.createdDate}</td>
                            <td style={{fontWeight: 600 }}>{orderProduct.updatedDate}</td>
                            {orderProduct.paid ? 
                                (
                                    orderProduct.delete ? 
                                        (
                                            <td>
                                                <Chip label="Đã hủy" size="small" color="warning"/>
                                            </td>
                                        ) 
                                    :
                                        (
                                            <td>
                                                <Chip label="Đã thanh toán" size="small" color="success"/>
                                            </td>
                                        ) 
                                )
                                : 
                                <td>
                                    <Chip label="Chưa thanh toán" size="small" color="error" onClick={() => handlePayment(orderProduct)} />
                                </td>
                            }
                            <td>
                                {!orderProduct.paid && 
                                    <Button size='small' id="delBtn" style={{ marginLeft: "10px", backgroundColor: "#ff3333", color: "white" }}
                                        onClick={() => handleDelete(orderProduct.id)}
                                        title="Xóa">
                                        <FontAwesomeIcon icon="trash" />
                                    </Button>
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {isOpenConfirm && <DialogConfirmPayment data={dataConfirm} callBack={handleCallBackConfirm} />}
            {isOpenConfirmDelete && <DialogConfirm data={dataConfirm} callBack={handleCallBackConfirmDelete} />}
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
                <Alert isOpen={paidSuccess} color="success">Thanh toán thành công</Alert>
            </div>
            <div className="alert-bottom-right">
                <Alert isOpen={paidFail} color="danger">Thanh toán thất bại</Alert>
            </div>
            <div className="alert-bottom-right">
                <Alert isOpen={deleteSuccess} color="success">Xóa thành công</Alert>
            </div>
            <div className="alert-bottom-right">
                <Alert isOpen={deleteFail} color="danger">Xóa thất bại</Alert>
            </div>
        </div>
    );
};

export default OrderProductManagement;