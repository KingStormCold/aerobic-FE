import React from 'react';
import '../home.scss';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { useHistory } from 'react-router-dom';
import { subjectClient } from 'app/shared/reducers/subject';
import { URL_PATH } from 'app/config/path';
import { Storage } from 'react-jhipster';
import { CATEGORY_ID } from 'app/config/constants';
const GymPage = () => {
  const dispatch = useAppDispatch()
  const history = useHistory();
  const subjectsByGym = useAppSelector(state => state.subject.subjectsByGym);
  async function hanldeSubject(subjectID, categoryId) {
    Storage.session.set(CATEGORY_ID, categoryId)
    await dispatch(subjectClient(categoryId));
    history.push(URL_PATH.CLIENT.SUBJECT);
  }
  const handlSubjectClick = (subjectID, categoryId) => {
    hanldeSubject(subjectID, categoryId)
  };
  return (
    <div className="class">
      <div className="container">
        <div className="section-header text-center wow zoomIn" data-wow-delay="0.1s">
          <h2>Gym World</h2>
        </div>
        <div className="row class-container">
          {subjectsByGym && subjectsByGym.length > 0 && subjectsByGym.map((item, index) => (
            <div className="col-lg-4 col-md-6 col-sm-12 class-item filter-1 wow fadeInUp" data-wow-delay="0.0s" key={item.id} onClick={e => handlSubjectClick(item.id, item.category_id)}>
              <div className="class-wrap">
                <div className="class-img">
                  <img src={item.image} alt="Image" />
                </div>
                <div className="class-text">
                  <h2>{item.name}</h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GymPage;
