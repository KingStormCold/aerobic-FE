import moment from 'moment';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Table } from 'reactstrap';
import Pagination from '@mui/material/Pagination';
import Loading from 'app/components/loading';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import { historyPayment, resetCourse } from 'app/shared/reducers/course';
import { URL_PATH } from 'app/config/path';
import { Button } from 'reactstrap';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { styled } from '@mui/material/styles';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/joy/Typography';
import { numberWithCommas } from 'app/shared/util/string-utils';
import MyCourse from '../client/my-course/my_course';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export const HistoryPayment = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const loading = useAppSelector(state => state.category.loading);
  const historyPayments = useAppSelector(state => state.course.historyPayments);
  const pageNum = useAppSelector(state => state.course.pageNum);
  const totalPage = useAppSelector(state => state.course.totalPage);

  useEffect(() => {
    dispatch(resetCourse());
  }, []);

  useEffect(() => {
    dispatch(historyPayment(1));
  }, []);

  const handlegetpage = p => {
    setTimeout(() => {
      dispatch(historyPayment(p));
    }, 100);
  };

  const handleChange = (e, p) => {
    handlegetpage(p);
  };

  const onClick = () => {
    // history.push(URL_PATH.LOGIN);
  };

  return (
    <div style={{ padding: ' 30px 0 30px 0' }}>
      {loading && <Loading />}
      <Typography
        color="warning"
        sx={{
          backgroundColor: 'rgb(231 159 55 / 30%)',
          textAlign: 'center',
          fontSize: '24px',
          fontWeight: '700',
          height: '50px',
          paddingTop: '10px',
        }}
      >
        Transaction history
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{ backgroundColor: '#4b71a2 !important', fontSize: '20px' }}>Course Name</StyledTableCell>
              <StyledTableCell sx={{ backgroundColor: '#4b71a2 !important', fontSize: '20px' }} align="center">
                Price
              </StyledTableCell>
              <StyledTableCell sx={{ backgroundColor: '#4b71a2 !important', fontSize: '20px' }} align="center">
                Created Date
              </StyledTableCell>
              <StyledTableCell sx={{ backgroundColor: '#4b71a2 !important', fontSize: '20px' }} align="center"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {historyPayments &&
              historyPayments.map(payment => (
                <StyledTableRow key={payment.name}>
                  <StyledTableCell component="th" scope="row" sx={{ fontSize: '16px' }}>
                    {payment.name}
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ borderLeft: '1px solid #d7d4d4 !important', fontSize: '16px' }}>
                    {numberWithCommas(payment.price)}đ
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ borderLeft: '1px solid #d7d4d4 !important', fontSize: '16px' }}>
                    {moment(payment.created_at).utc().format('DD-MM-YYYY h:mm:ss')}
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ borderLeft: '1px solid #d7d4d4 !important', fontSize: '16px' }}>
                    <Button color="success" className="btn-right">
                      Detail
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
        <Pagination
          count={totalPage}
          size="large"
          page={pageNum}
          variant="outlined"
          shape="rounded"
          onChange={handleChange}
          style={{ float: 'right' }}
        />
      </TableContainer>
    </div>
  );
};

export default HistoryPayment;
