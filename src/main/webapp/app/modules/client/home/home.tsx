import './home.scss';

import React, { useEffect } from 'react';
import TopLowPrice from './top-low-price';
import NewestProduct from './newest- product';
import { useDispatch } from 'react-redux';
import { getCategoryDisplayInSlider, resetTopProduct } from './../../../shared/reducers/product-list';
import { useAppSelector } from 'app/config/store';
import VideoSlider from './video-slider';

export const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetTopProduct())
    dispatch(getCategoryDisplayInSlider())
  }, [])

  const displayInSliderCategories = useAppSelector(state => state.productList.displayInSliderCategories);
  return (
    <div className='home'>
      <TopLowPrice mode="discount" />
      <TopLowPrice mode="bestseller" />
      <NewestProduct mode="newestProduct" />
      {displayInSliderCategories.length > 0 &&
        displayInSliderCategories?.map((category, i) => (
          <NewestProduct mode="topCategory" key={i} index={i} category={category} />
        ))
      }
      <VideoSlider />
    </div>
  );
};

export default Home;
