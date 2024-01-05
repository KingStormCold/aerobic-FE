import React, { useEffect } from 'react';
import '../home.scss';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getSubjectByMeditate, subjectClient } from 'app/shared/reducers/subject';
import { useHistory } from 'react-router-dom';
import { URL_PATH } from 'app/config/path';
import { Storage } from 'react-jhipster';
import { CATEGORY_ID } from 'app/config/constants';

const MeditatePage = () => {
  const dispatch = useAppDispatch()
  const history = useHistory();
  const subjectsByMeditate = useAppSelector(state => state.subject.subjectsByMeditate);
  async function hanldeSubject(subjectID, categoryId) {
    Storage.session.set(CATEGORY_ID, categoryId)
    await dispatch(subjectClient(categoryId));
    history.push(URL_PATH.CLIENT.SUBJECT);
  }
  const handlSubjectClick = (subjectID, categoryId) => {
    hanldeSubject(subjectID, categoryId)
  };

  return (
    <div className="portfolio">
      <div className="container">
        <div className="section-header text-center wow zoomIn" data-wow-delay="0.1s">
          <h2>Meditate World</h2>
        </div>
        <div className="row portfolio-container">
          {subjectsByMeditate && subjectsByMeditate.length > 0 && subjectsByMeditate.map((item, index) => (
            <div className="col-lg-4 col-md-6 col-sm-12 portfolio-item first wow fadeInUp" data-wow-delay="0.1s" key={item.id} onClick={e => handlSubjectClick(item.id, item.category_id)}>
              <div className="portfolio-wrap">
                <a data-lightbox="portfolio">
                  <img src={item.image} alt="Portfolio Image" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MeditatePage;
