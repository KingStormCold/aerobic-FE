import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';


export const Detail = () => {
  const theme = useTheme();

  return (
    <Card sx={{ display: 'flex' }}>
      <CardMedia
        component="img"
        sx={{ width: 300, height: 300 }}
        image="https://www.bing.com/th?id=OIP.UiDXds-GCoppiFfYx6IA7AHaEo&w=143&h=100&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
        alt="Live from space album cover"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <h3 className="heading">Khóa học online tại nhà </h3>
          <p className="subheading">subject_content</p>
          <p className="subheading">total_course_fee</p>
          <p className="subheading">total_discount</p>
          <p className="subheading">total_videos</p>
        </CardContent>
      </Box>
    </Card>
  );
};

export default Detail;
