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

const YogaPage = () => {
  const dispatch = useAppDispatch()
  const history = useHistory();
  const subjectsByYoga = useAppSelector(state => state.subject.subjectsByYoga);
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
            <Slider {...settings}>
              {subjectsByYoga && subjectsByYoga.length > 0 && subjectsByYoga.map((item, index) => (
                <div className="about-img" key={item.id} >
                  <img src={item.image} alt="Image" />
                  <div className="subject-name text-center wow zoomIn" data-wow-delay="0.1s">
                    <p>{item.name}</p>
                  </div>
                  <div className="subject-name text-center wow zoomIn" data-wow-delay="0.1s">
                    <p>Đang giảm: {numberWithCommas(item.promotional_price)}đ</p>
                  </div>
                  <Button variant="contained" color="success" sx={{ fontWeight: 600 }} onClick={e => handlSubjectClick(item.id, item.category_id)}>
                    Xem
                  </Button>
                </div>
              ))}
            </Slider>

          </div>
          <div className="col-lg-7 col-md-6">
            <div className="section-header text-left">
              <h2>Thế giới Yoga</h2>
            </div>
            <div className="about-text">
              <p>
                Yoga là một phương pháp luyện tập lâu đời có nguồn gốc từ Ấn Độ khoảng 5.000 năm trước. Người ta thường cho rằng tập yoga là tập những động tác, tư thế uốn éo kỳ lạ. Nhưng thật ra, yoga bao gồm các bài tập giúp cải thiện thể chất, tinh thần, tình cảm và cả tâm linh của người tập.
              </p>
              <p>
                Nhiều người tập tin rằng bộ môn này có thể thay đổi thế giới quan, giúp bình tâm và giảm căng thẳng, nhờ đó sẽ giúp cải thiện sức khỏe của bạn.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>


  );
};

export default YogaPage;
