import { coursesPagination, deleteCourse, resetCourse, updateStateCourse } from 'app/shared/reducers/course';
import { resetToastMessage, updateStateOpenToastMessage } from 'app/shared/reducers/toast-message';
import "bootstrap/dist/css/bootstrap.min.css";
import moment from 'moment';
import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Pagination from '@mui/material/Pagination';
import { Truncate } from '@primer/react';
import DialogConfirm from 'app/components/dialog-confirm';
import Loading from 'app/components/loading';
import { URL_PATH } from 'app/config/path';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import './course.scss';
import { ICourseDetail } from 'app/shared/model/course';
import { numberWithCommas } from 'app/shared/util/string-utils';
import { updateStateTitle } from 'app/shared/reducers/category-show';

const USER_EDIT_TOKEN = "user-management-token-user-edit";

export const CourseManagement = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(resetCourse());
    dispatch(resetToastMessage());
  }, []);

  const [isOpenConfirm, setIsOpenConfirm] = React.useState(false);
  const [dataConfirm, setDataConfirm] = React.useState(null);
  const [deleteCourseId, setDeleteCourseId] = React.useState('');
  const history = useHistory();
  const loading = useAppSelector(state => state.course.loading);
  const courses = useAppSelector(state => state.course.courses);
  const pageNum = useAppSelector(state => state.course.pageNum);
  const totalPage = useAppSelector(state => state.course.totalPage);
  const deleteCourseSuccess = useAppSelector(state => state.course.deleteCourseSuccess);
  const coursesErrorMessage = useAppSelector(state => state.course.coursesErrorMessage);
  const deleteCourseErrorMessage = useAppSelector(state => state.course.deleteCourseErrorMessage);
  const subjectDetail = useAppSelector(state => state.subject.subject);
  const title = useAppSelector(state => state.categoryShow.title);

  useEffect(() => {
    if (subjectDetail.id === undefined) {
      history.push(URL_PATH.ADMIN.SUBJECT.MANAGEMENT)
    }
    if (subjectDetail.id) {
      dispatch(coursesPagination({ page: 1, id: subjectDetail.id }));
      const splitTitle = title.split(" > Khóa học ")
      dispatch(updateStateTitle(splitTitle[0] + " > Khóa học "))
    }
  }, [subjectDetail]);

  const handlegetpage = (p) => {
    setTimeout(() => {
      dispatch(coursesPagination({ page: p, id: subjectDetail.id }));
    }, 100);
  };

  const handleChange = (e, p) => {
    handlegetpage(p);
  };

  function handleDeleteCourse(id, courseName) {
    setIsOpenConfirm(true);
    setDeleteCourseId(id);
    const _data = {
      title: "Xóa khóa học: " + courseName,
      description: "Bạn thật sự muốn xóa khóa học " + courseName + " này không?",
      lblCancel: "Hủy",
      lblOk: "Đồng ý",
    };
    setDataConfirm(_data);
  }

  function handleEditCourse(data: ICourseDetail) {
    dispatch(updateStateCourse(data));
    history.push(URL_PATH.ADMIN.COURSE.EDIT);
  }

  async function deleteItem() {
    await dispatch(deleteCourse(deleteCourseId));
  }

  const handleCallBackConfirm = _res => {
    setIsOpenConfirm(false);
    if (_res) {
      deleteItem();
    }
  };

  useEffect(() => {
    if (deleteCourseSuccess) {
      dispatch(updateStateOpenToastMessage({ message: 'Xóa khóa học thành công', isError: false }));
      dispatch(coursesPagination({ page: 1, id: subjectDetail.id }));
    }
  }, [deleteCourseSuccess, dispatch]);

  useEffect(() => {
    if (coursesErrorMessage) {
      dispatch(updateStateOpenToastMessage({ message: 'không Lấy được danh sách khóa học. ' + coursesErrorMessage, isError: true }));
    }
  }, [coursesErrorMessage, dispatch]);

  useEffect(() => {
    if (deleteCourseErrorMessage) {
      dispatch(updateStateOpenToastMessage({ message: deleteCourseErrorMessage, isError: true }));
    }
  }, [deleteCourseErrorMessage, dispatch]);

  function handleDetailCourse(data: ICourseDetail) {
    dispatch(updateStateCourse(data));
    history.push(URL_PATH.ADMIN.COURSE.DETAIL)
  }

  return (
    <div>
      {loading && <Loading />}
      <h3>Danh sách khóa học</h3>
      <Link to={`${URL_PATH.ADMIN.SUBJECT.MANAGEMENT}`}>
        <Button id="addBtn" style={{ marginLeft: "-3px", backgroundColor: "rgb(189, 188, 182)", color: "black" }} title="Quay lại">
          <FontAwesomeIcon icon="chevron-left" />
        </Button>
      </Link>
      <Link to={`${URL_PATH.ADMIN.COURSE.CREATE}`}>
        <Button id="addBtn" style={{ marginLeft: "-3px", backgroundColor: "rgb(5 123 7)", color: "white" }} title="Thêm" className='btn-right'>
          <FontAwesomeIcon icon="plus" />
        </Button>
      </Link>
      <Table hover responsive striped>
        <thead>
          <tr>
            <th>No</th>
            <th>Tên khóa học</th>
            <th>Môn học</th>
            <th>Mô tả</th>
            <th>Cấp độ</th>
            <th>Giá</th>
            <th>Giá khuyến mãi</th>
            <th>Nguời tạo</th>
            <th>Ngày tạo</th>
            <th>Người sửa</th>
            <th>Ngày sửa</th>
            <th className='w-155'>Action</th>
          </tr>
        </thead>
        <tbody>
          {courses && courses?.map((course, i) => (
            <tr key={`course-${i}`}>
              <th scope="row">{(i + 1) + (pageNum - 1) * 10}</th>
              <td>
                <Truncate maxWidth={150} title={course.name}>
                  {course.name}
                </Truncate>
              </td>
              <td>
                <Truncate maxWidth={150} title={course.subject_name}>
                  {course.subject_id}
                </Truncate>
              </td>
              <td>
                <Truncate maxWidth={150} title={course.description}>
                  {course.description}
                </Truncate></td>
              <td>{course.level}</td>
              <td>{String(course.price !== 0 ? numberWithCommas(course.price) : 0)}đ</td>
              <td>{String(course.promotional_price !== 0 ? numberWithCommas(course.promotional_price) : 0)}đ</td>
              <td>{course.created_by}</td>
              <td>{moment(course.created_at).utc().format('DD-MM-YYYY h:mm:ss')}</td>
              <td>{course.updated_by}</td>
              <td>{moment(course.updated_at).utc().format('DD-MM-YYYY h:mm:ss')}</td>
              <td className='w-155'>
                <Button size='small' id="editBtn" style={{ marginLeft: "-3px", backgroundColor: "rgb(189 188 182)" }}
                  onClick={() => handleDetailCourse(course)} title="Chi tiết">
                  <FontAwesomeIcon icon="info" />
                </Button>
                <Button size='small' id="editBtn" style={{ marginLeft: "10px", backgroundColor: "#ffe200" }}
                  onClick={() => handleEditCourse(course)} title="Chỉnh sửa">
                  <FontAwesomeIcon icon="user-edit" />
                </Button>
                <Button size='small' id="delBtn" style={{ marginLeft: "10px", backgroundColor: "#ff3333", color: "white" }}
                  onClick={() => handleDeleteCourse(course.id, course.name)} title="Xóa">
                  <FontAwesomeIcon icon="trash" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {isOpenConfirm && <DialogConfirm data={dataConfirm} callBack={handleCallBackConfirm} />}
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

export default CourseManagement;
