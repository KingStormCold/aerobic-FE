import { useAppDispatch } from 'app/config/store';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import DiscountPage from './discount/discount';
import GymPage from './gym/gym';
import './home.scss';
import MeditatePage from './meditate/meditate';
import YogaPage from './yoga/yoga';
const Home = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <div className="hero">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-sm-12 col-md-6">
              <div className="hero-text">
                <h1>Tăng Cường Sức Khỏe</h1>
                <p>
                  Hỗ trợ vận động cơ thể, nhịp thở và tăng lưu lượng máu.
                </p>
                <div className="hero-btn">
                  <Link className="btn" to="/register">Join Now</Link>
                  <Link className="btn" to="/contact">Contact Us</Link>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-6">
              <div className="hero-image">
                <img src="content/images/hero.png" alt="Hero Image" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <MeditatePage />
      <DiscountPage />
      <YogaPage />
      <GymPage />

    </>

  );
};

export default Home;
