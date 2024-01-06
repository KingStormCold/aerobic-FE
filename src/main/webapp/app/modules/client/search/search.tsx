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
import { numberWithCommas } from 'app/shared/util/string-utils';
import { CATEGORY_ID, CONTENT_SEARCH } from 'app/config/constants';
import { Storage } from 'react-jhipster';

export const Search = () => {
  const pageNum = useAppSelector(state => state.subject.pageNum);
  const totalPage = useAppSelector(state => state.subject.totalPage);
  const history = useHistory();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.subject.loading);
  const searchDetailClient = useAppSelector(state => state.subject.searchDetailClient);
  const contentSearch = useAppSelector(state => state.subject.contentSearch);
  const contentSearchSession = Storage.session.get(CONTENT_SEARCH);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const theme = useTheme();

  useEffect(() => {
    if (contentSearch) {
      //
    } else if (contentSearchSession) {
      dispatch(searchClient({ content_search: contentSearchSession, page: 1 }));
    }
  }, [contentSearch])

  async function handleSubject(subjectID, categoryId) {
    Storage.session.set(CATEGORY_ID, categoryId)
    await dispatch(subjectClient(subjectID));
    history.push(URL_PATH.CLIENT.SUBJECT);
  }

  const handlSubjectClick = (subjectID, categoryId) => {
    handleSubject(subjectID, categoryId)
  };

  const handlegetpage = p => {
    setTimeout(() => {
      dispatch(searchClient({ content_search: contentSearch, page: p }));
      return;
    }, 100);
    return;
  };

  const handleChange = (e, p) => {
    handlegetpage(p);
  };

  return (
    <div>
      {loading && <Loading />}
      <div className="blog">
        <div className="container">
          <div className="owl-carousel blog-carousel wow fadeInUp" data-wow-delay="0.1s">
            {searchDetailClient &&
              searchDetailClient?.map((subject, i) => (
                <div className="blog-item" key={subject.subject_id} onClick={e => handlSubjectClick(subject.subject_id, subject.category_id)}>
                  <div className="blog-img">
                    <img src={subject.subject_image} alt="Blog" />
                  </div>
                  <div className="blog-text">
                    <h2>{subject.subject_name}</h2>
                    <div className="blog-meta">
                      <p><i className="far fa-video-camera"></i>Total video: {subject.total_videos}</p>
                    </div>
                    <p>
                    Price: {numberWithCommas(subject.total_course_fee)}đ
                    </p>
                    <p>
                    Price drop: {numberWithCommas(subject.total_discount)}đ
                    </p>
                    <a className="btn" onClick={e => handlSubjectClick(subject.subject_id, subject.category_id)}>Read More <i className="fa fa-angle-right"></i></a>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      {searchDetailClient && searchDetailClient.length === 0 ?
        <Typography color="warning" sx={{ backgroundColor: 'rgb(231 159 55 / 20%)' }}>
          No results found
        </Typography>
        :

        <Pagination
          count={totalPage}
          size="large"
          page={pageNum}
          variant="outlined"
          shape="rounded"
          onChange={handleChange}
          className='pagination-layout'
        />
      }

    </div>
  );
};

export default Search;
