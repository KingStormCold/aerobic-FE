import './thongtincuahang.scss';
import React from 'react';

export const ThongTinCuaHang = () => {
  return (
    <div className="storeInfo">
      <h3>THÔNG TIN CỬA HÀNG</h3>
      <p>Mr Bàng Store</p>
      <p>IPhone - IPad - Macbook - Apple Watch - AirPods</p>

      <p>Hotline : <a href='tel:+0938792282'>0938792282</a> Chấn bàng</p>
      <p>
        <a href='https://goo.gl/maps/2dJtGwsgCN7RFXAv6' target="_blank" rel="noopener noreferrer">
          Địa chỉ : 77/25 Phạm đăng giảng . P,Bình Hưng Hoà Q. Bình tân
        </a>
      </p>
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.8663928934184!2d106.60422021533435!3d10.821535161317257!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752bc09df90001%3A0x34571e62291cf33d!2zVsSDbiBQaMOybmcgS2h1IFBo4buRIDI!5e0!3m2!1svi!2s!4v1666622785348!5m2!1svi!2s" width="600" height="450" loading="lazy"></iframe>
    </div>
  );
};

export default ThongTinCuaHang;
