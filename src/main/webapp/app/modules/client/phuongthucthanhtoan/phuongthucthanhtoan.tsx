import './phuongthucthanhtoan.scss';
import React from 'react';
import Typography from '@mui/material/Typography';

export const PhuongThucThanhToan = () => {
  return (
    <div className="paymentMethod">
      <h3>HÌNH THỨC NẠP TIỀN</h3>

      <p>1. Đến hệ thống showroom của Aerobic để nạp tiền </p>
      <p>2. Chuyển khoản qua số tài khoản</p>
      <p>Tên ngân hàng: Techcombank</p>
      <p>Số tài khoản: 00000xxxx00000</p>
      <p>Chủ tài khoản: Nguyễn Văn Test</p>
      <Typography color="warning" sx={{ backgroundColor: 'rgb(231 159 55 / 20%)' }}>
        Nội dung chuyển khoản: email + số điện thoại
      </Typography>

      <Typography color="warning" sx={{ backgroundColor: 'rgb(231 159 55 / 20%)' }}>
        Chụp hình thông tin chuyển khoản gửi vào fanpage
      </Typography>
    </div>
  );
};

export default PhuongThucThanhToan;
