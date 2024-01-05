import Loading from 'app/components/loading';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import React, { useEffect, useState } from 'react';
import Image from 'react-bootstrap/Image';
import './detail.scss';
import { URL_PATH } from 'app/config/path';
import { courseClient, subjectClient } from 'app/shared/reducers/subject';
import { Button, Col } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { paymentCourse, updateStatePaymentCourseSuccess } from 'app/shared/reducers/course';
import { updateStateOpenToastMessage } from 'app/shared/reducers/toast-message';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import draftToHtmlPuri from 'draftjs-to-html';
import Typography from '@mui/joy/Typography';
import { Storage } from 'react-jhipster';
import { CATEGORY_ID } from 'app/config/constants';
import { numberWithCommas } from 'app/shared/util/string-utils';

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

export const Detail = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.subject.loading);
  const subjectDetailClient = useAppSelector(state => state.subject.subjectDetailClient);
  const courseDetailClients = useAppSelector(state => state.subject.courseDetailClient);
  const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);
  const paymentCourseSuccess = useAppSelector(state => state.course.paymentCourseSuccess);
  const paymentCourseErrorMessage = useAppSelector(state => state.course.paymentCourseErrorMessage);
  const [open, setOpen] = React.useState(false);
  const [courseId, setCourseId] = React.useState('');
  const [subjectId, setSubjectId] = React.useState('');
  const [subjectFull, setSubjectFull] = React.useState(0);
  const [courseName, setCourseName] = React.useState('');
  const [coursePrice, setCoursePrice] = React.useState(0);
  const [free, setFree] = React.useState(0);
  const [displayReadmore, setDisplayReadmore] = useState(true);
  const [height, setHeight] = useState(0);
  const MAX_HEIGHT_CSS = '780px';
  const MAX_HEIGHT = 780;
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleClose = () => {
    setOpen(false);
  };

  const handleBuy = () => {
    dispatch(paymentCourse({ course_id: Number(courseId), subject_id: Number(subjectId), subject_full: subjectFull, free: Number(free) })); // Pass free state
  };

  useEffect(() => {
    if (paymentCourseSuccess) {
      dispatch(updateStateOpenToastMessage({ message: 'Bạn đã mua khóa học thành công', isError: false }));
      setOpen(false);
      dispatch(updateStatePaymentCourseSuccess())
      // history.push('/my-course');
    }
  }, [paymentCourseSuccess]);

  useEffect(() => {
    if (paymentCourseErrorMessage) {
      dispatch(updateStateOpenToastMessage({ message: paymentCourseErrorMessage, isError: true }));
      setOpen(false);
      dispatch(updateStatePaymentCourseSuccess())
    }
  }, [paymentCourseErrorMessage]);

  const categoryId = Storage.session.get(CATEGORY_ID);
  useEffect(() => {
    if (categoryId) {
      dispatch(subjectClient(categoryId));
    }
  }, [categoryId])

  useEffect(() => {
    if (subjectDetailClient && subjectDetailClient.subject_id) {
      dispatch(courseClient(subjectDetailClient.subject_id));
    }
    setHeight(document.getElementById('content').clientHeight);
  }, [subjectDetailClient]);

  const handlePayment = (course, subject, name, price, level) => {
    if (!isAuthenticated) {
      dispatch(updateStateOpenToastMessage({ message: 'Bạn vui lòng đăng nhập để có thể mua khóa học này', isError: true }));
      history.push(URL_PATH.LOGIN);
    } else {
      setCourseId(course);
      setSubjectId(subject);
      setSubjectFull(course === 0 ? 1 : 0);
      setCourseName(name);
      setCoursePrice(price);
      if (level === 1) {
        setFree(1);
      } else {
        setFree(0);
      }
      setOpen(true);
    }
  };

  const contentProduct = draftToHtmlPuri(
    subjectDetailClient != null &&
      subjectDetailClient?.subject_content !== null &&
      subjectDetailClient?.subject_content !== undefined &&
      subjectDetailClient?.subject_content !== ''
      ? JSON.parse(subjectDetailClient?.subject_content)
      : ''
  );

  return (
    <>
      {loading && <Loading />}
      <div className="container">
        <h3 className="heading">Khóa học online tại nhà - {subjectDetailClient?.subject_name}</h3>
        <div className="image-container">
          <Image className="image-thumbnail" src={subjectDetailClient?.subject_image} thumbnail />
        </div>
        <div id="content" className="subject-detail-container-content-row">
          <Col className="subject-detail-content-col-left">
            <div className="subject-detail-content-col-right-data">
              <div
                id="content"
                style={displayReadmore ? { maxHeight: MAX_HEIGHT_CSS, overflow: 'hidden' } : {}}
                dangerouslySetInnerHTML={{
                  __html: contentProduct,
                }}
              />
              {displayReadmore ? (
                <div className="readmore-button">
                  <span onClick={() => setDisplayReadmore(!displayReadmore)}>
                    Đọc tiếp bài viết <ExpandMoreIcon />
                  </span>
                </div>
              ) : height > MAX_HEIGHT ? (
                <div className="readmore-button">
                  <span onClick={() => setDisplayReadmore(!displayReadmore)}>
                    Rút gọn bài viết <ExpandLessIcon />{' '}
                  </span>
                </div>
              ) : (
                ''
              )}
            </div>
          </Col>
        </div>
        <Typography
          color="warning"
          sx={{
            backgroundColor: 'rgb(231 159 55 / 20%)',
            textAlign: 'center',
            fontSize: '24px',
            fontWeight: '700',
            height: '50px',
            paddingTop: '10px',
          }}
        >
          ĐĂNG KÝ KHÓA HỌC
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell sx={{ backgroundColor: '#4b71a2 !important', fontSize: '20px' }}>Tên khóa học</StyledTableCell>
                <StyledTableCell sx={{ backgroundColor: '#4b71a2 !important', fontSize: '20px' }} align="center">
                  Giá
                </StyledTableCell>
                <StyledTableCell sx={{ backgroundColor: '#4b71a2 !important', fontSize: '20px' }} align="center">
                  Giá giảm
                </StyledTableCell>
                <StyledTableCell sx={{ backgroundColor: '#4b71a2 !important', fontSize: '20px' }} align="center">
                  Tổng tiền
                </StyledTableCell>
                <StyledTableCell sx={{ backgroundColor: '#4b71a2 !important', fontSize: '20px' }} align="center"></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courseDetailClients &&
                courseDetailClients.map(course => (
                  <StyledTableRow key={course.course_id}>
                    <StyledTableCell component="th" scope="row" sx={{ fontSize: '16px' }}>
                      {course.course_name}
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ borderLeft: '1px solid #d7d4d4 !important', fontSize: '16px' }}>
                      {numberWithCommas(course.price)}đ
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ borderLeft: '1px solid #d7d4d4 !important', fontSize: '16px' }}>
                      {numberWithCommas(course.promotional_price)}đ
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ borderLeft: '1px solid #d7d4d4 !important', fontSize: '16px' }}>
                      {numberWithCommas(course.price - course.promotional_price)}đ
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ borderLeft: '1px solid #d7d4d4 !important', fontSize: '16px' }}>
                      <Button
                        color="success"
                        className="btn-right"
                        onClick={e =>
                          handlePayment(
                            course.course_id,
                            subjectDetailClient.subject_id,
                            course.course_name,
                            course.price - course.promotional_price,
                            course.level
                          )
                        }
                      >
                        Đăng ký
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <React.Fragment>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>
            Bạn có đống ý mua khóa {courseName} này với giá {numberWithCommas(coursePrice)} đ ?
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleClose}>Hủy</Button>
            <Button onClick={handleBuy} color="success">
              Mua
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </>
  );
};

export default Detail;
