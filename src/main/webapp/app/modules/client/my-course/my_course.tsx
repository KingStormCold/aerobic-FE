import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Loading from 'app/components/loading';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getCoursesPayment } from 'app/shared/reducers/course';
import moment from 'moment';
import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import './my_course.scss';
import { ICoursePaymentClient, ICoursePaymentDetail } from 'app/shared/model/course';
import { updateStateCoursePaymentDetail } from 'app/shared/reducers/video';
import { useHistory } from 'react-router-dom';
import { URL_PATH } from 'app/config/path';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));

const MyCourse = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(getCoursesPayment());
  }, []);
  const loading = useAppSelector(state => state.course.loading)
  const coursePayments = useAppSelector(state => state.course.coursePayments)

  const hanldeStartCourse = (course: ICoursePaymentDetail, subjectName: string, subjectId: number) => {
    const data = {
      id: course.id,
      name: course.name,
      description: course.description,
      image: course.image,
      created_date: course.created_date,
      subject_id: subjectId,
      subject_name: subjectName,
    } as ICoursePaymentClient
    dispatch(updateStateCoursePaymentDetail(data))
    history.push(URL_PATH.CLIENT.VIDEO);
  }
  return (
    <>
      {loading && <Loading />}
      <Box component="div" sx={{
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
      }}>
        {coursePayments && coursePayments.length > 0 && coursePayments.map((item, index) => (
          <Box component="div" key={item.subject_id} sx={{
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
            marginTop: '16px'
          }}>
            <h4 className='display-block'>{item.subject_name}</h4>
            <Box component="div" sx={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              width: '100%',
              marginLeft: '40px'
            }}>
              {item.courses && item.courses.length > 0 && item.courses.map((course, i) => (
                <Card sx={{ width: '18rem', margin: '5px', cursor: 'pointer', '&:hover': { boxShadow: 5 } }} key={course.id + i}>
                  <CardMedia
                    sx={{ height: 150, margin: '5px' }}
                    image={course.image}
                    title="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 500, textDecoration: 'underline', fontStyle: 'italic' }}>
                      Khóa học: {course.name}
                    </Typography>
                    <Typography variant="subtitle1" component="div" sx={{ fontWeight: 600, marginBottom: '8px', fontSize: '12px' }}>
                      Ngày đăng ký: <Chip label={moment(course.created_date).utc().format('DD-MM-YYYY h:mm:ss')} variant="filled" color="success" />
                    </Typography>
                    <Typography variant="subtitle1" component="div" sx={{ fontWeight: 600, marginBottom: '8px', fontSize: '12px' }}>
                      Tình trạng:&nbsp;
                      {course.status ?
                        <Chip label="Đã hoàn thành" color="success" variant="filled" />
                        :
                        <Chip label="Chưa hoàn thành" color="warning" variant="filled" />
                      }
                    </Typography>
                    <Typography variant="subtitle1" component="div" sx={{ fontWeight: 600, fontSize: '12px' }}>
                      Tiến độ: {course.progress_course}%
                    </Typography>
                    <BorderLinearProgress variant="determinate" value={course.progress_course} />
                  </CardContent>
                  <CardActions>
                    <Button variant="contained" color="success" sx={{ fontWeight: 600 }} onClick={(e) => { hanldeStartCourse(course, item.subject_name, item.subject_id) }}>
                      Học tiếp
                    </Button>
                  </CardActions>
                </Card>
              ))}

            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default MyCourse;
