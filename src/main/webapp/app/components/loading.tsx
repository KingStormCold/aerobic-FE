import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';

export const Loading = () => {
  return (
    <Box
      component="div"
      sx={{ height: '100%', width: '100%', backgroundColor: 'rgb(167 167 167 / 40%)', position: 'absolute', top: 0, left: 0, zIndex: 2000 }}
    >
      <Box sx={{ position: 'absolute', top: '50%', left: '60%', marginLeft: '-50px', marginTop: '-50px', width: '100px', height: '100px' }}>
        <CircularProgress />
      </Box>
    </Box>
  );
};

export default Loading;
