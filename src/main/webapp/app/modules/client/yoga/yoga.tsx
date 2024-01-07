import { numberWithCommas } from 'app/shared/util/string-utils';
import React from 'react';
import Slider from "react-slick";
import '../home.scss';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { useHistory } from 'react-router-dom';
import { subjectClient } from 'app/shared/reducers/subject';
import { URL_PATH } from 'app/config/path';
import { Storage } from 'react-jhipster';
import { CATEGORY_ID } from 'app/config/constants';
import { Button } from '@mui/material';
import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';

const YogaPage = () => {
  const dispatch = useAppDispatch()
  const history = useHistory();
  const subjectsByYoga = useAppSelector(state => state.subject.subjectsByYoga);
  const loadingYoga = useAppSelector(state => state.subject.loadingYoga);
  async function hanldeSubject(subjectID, categoryId) {
    Storage.session.set(CATEGORY_ID, categoryId)
    await dispatch(subjectClient(categoryId));
    history.push(URL_PATH.CLIENT.SUBJECT);
  }
  const handlSubjectClick = (subjectID, categoryId) => {
    hanldeSubject(subjectID, categoryId)
  };
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="about wow fadeInUp" data-wow-delay="0.1s">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-5 col-md-6">
            {loadingYoga &&
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
              </Box>
            }
            <Slider {...settings}>
              {subjectsByYoga && subjectsByYoga.length > 0 && subjectsByYoga.map((item, index) => (
                <div className="about-img" key={item.id} >
                  <img src={item.image} alt="Image" />
                  <div className="subject-name text-center wow zoomIn" data-wow-delay="0.1s">
                    <p>{item.name}</p>
                  </div>
                  <div className="subject-name text-center wow zoomIn" data-wow-delay="0.1s">
                    <p>Falling: {numberWithCommas(item.promotional_price)}$</p>
                  </div>
                  <Button variant="contained" color="success" sx={{ fontWeight: 600 }} onClick={e => handlSubjectClick(item.id, item.category_id)}>
                    See
                  </Button>
                </div>
              ))}
            </Slider>

          </div>
          <div className="col-lg-7 col-md-6">
            <div className="section-header text-left">
              <h2>World of Yoga</h2>
            </div>
            <div className="about-text">
              <p>
                Yoga is an age-old practice that originated in India about 5,000 years ago. It is often thought that yoga is practicing strange movements and postures. But actually, yoga consists of exercises that help improve the physical, mental, emotional and even spiritual of the practitioner.
              </p>
              <p>
                Many people believe that this practice can change your worldview, help you calm down and reduce stress, which in turn will help improve your health.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>


  );
};

export default YogaPage;
