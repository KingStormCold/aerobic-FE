import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Pagination from '@mui/material/Pagination';
import { Truncate } from '@primer/react';
import DialogConfirm from 'app/components/dialog-confirm';
import Loading from 'app/components/loading';
import { URL_PATH } from 'app/config/path';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { IPaymentDetail, IPayment } from 'app/shared/model/payment';
import { resetPayment, getPayments, updateStatePayment} from 'app/shared/reducers/payment';
import "bootstrap/dist/css/bootstrap.min.css";
import moment from 'moment';
import { Button, Table } from 'reactstrap';
import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { updateStateOpenToastMessage } from 'app/shared/reducers/toast-message';
import { numberWithCommas } from 'app/shared/util/string-utils';


export const PaymentManagement = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(resetPayment())
  }, [])
  const history = useHistory();
  const loading = useAppSelector(state => state.payment.loading);
  const payments = useAppSelector(state => state.payment.payments);
  const pageNum = useAppSelector(state => state.payment.pageNum);
  const totalPage = useAppSelector(state => state.payment.totalPage);
  const PaymentsErrorMessage = useAppSelector(state => state.payment.paymentsErrorMessage);
  

  useEffect(() => {
    dispatch(getPayments(1));
  }, [])

  const handlegetpage = (p) => {
    setTimeout(() => {
      dispatch(getPayments(p));
      return;
    }, 100);
    return;
  };

  const handleChange = (e, p) => {
    handlegetpage(p)
  };

  function handleDetailPayment(data: IPaymentDetail) {
    dispatch(updateStatePayment(data))
    history.push(URL_PATH.ADMIN.PAYMENT.DETAIL)
  }

  useEffect(() => {
    if (PaymentsErrorMessage) {
      dispatch(updateStateOpenToastMessage({ message: 'Lấy danh sách thanh toán. ' + PaymentsErrorMessage, isError: true }))
    }
  }, [PaymentsErrorMessage])

  return (
    <div>
      {loading && <Loading />}
      <h3>Danh sách thanh toán</h3>
      <Table hover responsive striped>
        <thead>
          <tr>
            <th>No</th>
            <th>Email</th>
            <th>Tên khóa học</th>
            <th>Môn học</th>
            <th>Giá</th>
            <th>Ngày tạo</th>
          </tr>
        </thead>
        <tbody>
          {payments && payments?.map((payment, i) => (
            <tr key={`payment-${i}`}>
              <th scope="row">{(i + 1) + (pageNum - 1) * 10}</th>
              <td>
                <Truncate maxWidth={100} title={payment.email}>
                  {payment.email}
                </Truncate>
              </td>
              <td>
                <Truncate maxWidth={100} title={''}>
                  {payment.course_name}
                </Truncate>
              </td>
              <td>
                <Truncate maxWidth={100} title={''}>
                  {payment.subject_name}
                </Truncate>
              </td>
              <td>{String(payment.price !== 0 ? numberWithCommas(payment.price) : 0)}đ</td>
              <td>{moment(payment.created_at).utc().format('DD-MM-YYYY h:mm:ss')}</td>

            </tr>
          ))}
        </tbody>
      </Table>
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

export default PaymentManagement;
