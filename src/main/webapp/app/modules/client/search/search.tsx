import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import Loading from 'app/components/loading';
import { URL_PATH } from 'app/config/path';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getSubjects, searchClient, subjectClient } from 'app/shared/reducers/subject';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './search.scss';
// import { updateStateTitle } from 'app/shared/reducers/category-show';


export const Search = () => {
  const pageNum = useAppSelector(state => state.subject.pageNum);
  const totalPage = useAppSelector(state => state.subject.totalPage);
  const history = useHistory();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.subject.loading);
  const searchDetailClient = useAppSelector(state => state.subject.searchDetailClient);
  const contentSearch = useAppSelector(state => state.subject.contentSearch);
  // const [urlImage, setUrlImage] = useState('')

  const theme = useTheme();

  const handlSubjectClick = subjectID => {
    dispatch(subjectClient(subjectID));
    history.push(URL_PATH.ADMIN.CATEGORY.EDIT);
  }
  
  const handlegetpage = (p) => {
    setTimeout(() => {
      dispatch(searchClient({content_search: contentSearch, page: p}));
      return;
    }, 100);
    return;
  };

  const handleChange = (e, p) => {
    handlegetpage(p)
  };
  

  return (
    <>
      {loading && <Loading />}
      {searchDetailClient && searchDetailClient?.map((subject, i) => (
        
        <Card sx={{ display: 'flex' }} key={subject.subject_id} onClick={ e => handlSubjectClick(subject.subject_id)}>
          <CardMedia 
            component="img"
            sx={{ width: 151 }}
            image={subject.subject_image}
            alt="Live from space album cover"
          />
          <Box sx={{ display: 'flex', flexDirection: 'column' }} >
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" variant="h5">
                Môn học: {subject.subject_name}
              </Typography>
              <Typography component="div" variant="h5">
                Nội dung: {subject.subject_content}
              </Typography>
              <Typography component="div" variant="h5">
                Giá tiền: {subject.total_course_fee}
              </Typography>
              <Typography component="div" variant="h5">
                Khuyến mãi: {subject.total_discount}
              </Typography>
              <Typography component="div" variant="h5">
                Video: {subject.total_videos}
              </Typography>
            </CardContent>
          </Box>
        </Card>
      ))}
   <Pagination
        count={totalPage}
        size="large"
        page={pageNum}
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
        style={{ float: "right" }}
      />
    </>
  );
};

export default Search;
