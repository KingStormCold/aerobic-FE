import React from 'react';
import '../home.scss';
const DiscountPage = () => {
  return (
    <div className="discount wow zoomIn" data-wow-delay="0.1s">
      <div className="container">
        <div className="section-header text-center">
          <p>Awesome Discount</p>
          <h2>Get <span>10%</span> Discount for all Subject</h2>
        </div>
        <div className="container discount-text">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec pretium mi. Curabitur facilisis ornare velit non vulputate. Aliquam metus tortor, auctor id gravida condimentum, viverra quis sem. Curabitur non nisl nec nisi scelerisque maximus.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DiscountPage;
