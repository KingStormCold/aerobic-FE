import './slider.scss';

import React, { useState } from 'react';
import 'react-slideshow-image/dist/styles.css'
import { Fade } from 'react-slideshow-image';

const fadeImages = [
  {
      url: 'https://static.remove.bg/remove-bg-web/eb1bb48845c5007c3ec8d72ce7972fc8b76733b1/assets/start-1abfb4fe2980eabfbbaaa4365a0692539f7cd2725f324f904565a9a744f8e214.jpg',
      caption: 'First Slide'
  },
  {
      url: 'https://d5nunyagcicgy.cloudfront.net/external_assets/hero_examples/hair_beach_v391182663/original.jpeg',
      caption: 'Second Slide'
  },
  {
      url: 'https://geekflare.com/wp-content/uploads/2021/03/background-removal-1200x385.jpg',
      caption: 'Third Slide'
  },
];

const Slideshow = () => {
  return (
      <div className="slide-container">
          <Fade>
              {fadeImages.map((fadeImage, index) => (
                  <div className="each-fade" key={index}>
                      <div className="image-container">
                          <img src={fadeImage.url} className ="slider-image"/>
                      </div>
                      <h2 className='slider-content'>{fadeImage.caption}</h2>
                  </div>
              ))}
          </Fade>
      </div>
  )
}

export default Slideshow;
