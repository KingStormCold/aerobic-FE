import './phuongthucthanhtoan.scss';
import React from 'react';
import Typography from '@mui/material/Typography';

export const PhuongThucThanhToan = () => {
  return (
    <div className="paymentMethod">
      <h3>DEPOSIT METHODS</h3>

      <p>1. Go to Aerobics showroom system to recharge </p>
      <p>2. Transfer via account number</p>
      <p>Bank name: Techcombank</p>
      <p>Account number: 00000xxxx00000</p>
      <p>Account holder: Nguyen Van Test</p>
      <Typography color="warning" sx={{ backgroundColor: 'rgb(231 159 55 / 20%)' }}>
      Contents of transfer: email + phone number
      </Typography>

      <Typography color="warning" sx={{ backgroundColor: 'rgb(231 159 55 / 20%)' }}>
      Take a picture of the transfer information sent to the fanpage
      </Typography>
    </div>
  );
};

export default PhuongThucThanhToan;
