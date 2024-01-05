import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import Loading from 'app/components/loading';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { ICourseVideoDetail } from 'app/shared/model/video';
import { getQuizsAndAnswer, resetTest, updateStateQuiz } from 'app/shared/reducers/test';
import { countVideoClient, getVideoClient, updateVideoUserClient } from 'app/shared/reducers/video';
import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import './video.scss';
import OpenQuiz from './open-quiz';
import { Chip } from '@mui/material';
import { Storage } from 'react-jhipster';
import { MY_COURSE } from 'app/config/constants';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));

const Video = () => {
  const dispatch = useAppDispatch();
  const coursePaymentDetail = useAppSelector(state => state.video.coursePaymentDetail)
  const videosByCourseId = useAppSelector(state => state.video.videosByCourseId)
  const loading = useAppSelector(state => state.video.loading)
  const loadingTest = useAppSelector(state => state.test.loading)
  const [open, setOpen] = React.useState(false);
  const [videoDetail, setVideoDetail] = useState({} as ICourseVideoDetail)
  const openQuiz = useAppSelector(state => state.test.openQuiz)
  const courseId = Storage.session.get(MY_COURSE);
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (coursePaymentDetail && coursePaymentDetail.id) {
      dispatch(getVideoClient(coursePaymentDetail.id))
    }
    else {
      dispatch(getVideoClient(courseId))
    }
  }, [coursePaymentDetail])

  const handleVideoDetail = (item: ICourseVideoDetail) => {
    setVideoDetail(item)
    setOpen(true);
    dispatch(countVideoClient(item.video_id))
  }

  const handleClose = () => {
    if (coursePaymentDetail && coursePaymentDetail.id) {
      dispatch(getVideoClient(coursePaymentDetail.id))
    }
    else {
      dispatch(getVideoClient(courseId))
    }
    setOpen(false);
  };

  const convertYoutubeURLToYoutubeEmbedURL = (url) => {
    // get YouTube VideoId
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url?.match(regExp);
    const youtubeID = (match && match[7].length === 11) ? match[7] : false;
    return `https://youtube.com/embed/${youtubeID}?autoplay=0`
  }

  const handleProgress = (progress) => {
    const played = progress.played
    const percentPlayed = played * 100
    const progressTime = String(percentPlayed).split('.')

    const playedSeconds = progress.playedSeconds
    const previousTime = String(playedSeconds).split('.')
    if (Number(previousTime[0]) > 0 && Number(previousTime[0]) % 10 === 0) {
      console.log(Number(previousTime[0]))
      console.log(Number(progressTime[0]))
      dispatch(updateVideoUserClient({
        video_id: videoDetail?.video_id,
        previous_time: Number(previousTime[0]),
        progress: Number(progressTime[0])
      }))
    }
  };

  const handleDuration = (duration) => {
    console.log(duration); // Duration of the video in seconds
  };

  const OpenVideo = () => {
    console.log('videoDetail.video_id', videoDetail.video_id)
    if (videoDetail.video_id === undefined) {
      return (<></>)
    }
    const player = useRef<ReactPlayer>(null)
    const [firstSeek, setFirstSeek] = useState(true)
    const handleSeek = () => {
      if (firstSeek) {
        player.current.seekTo(videoDetail.previous_time) // The new seek position in seconds
        setFirstSeek(false)
      }
    };

    return (
      <>
        {loadingTest && <Loading />}
        <Dialog
          aria-labelledby="customized-dialog-title"
          open={open}
          disableEscapeKeyDown={false}
          fullWidth
          sx={{
            '.MuiDialog-container': {
              '.MuiPaper-root': {
                height: '70%',
                maxWidth: 'none',
                width: '65%'
              }
            }
          }}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            {videoDetail?.videoName}
          </DialogTitle>
          <DialogContent dividers>
            <ReactPlayer width={'100%'} height={'100%'}
              url={videoDetail?.link_video}
              onProgress={handleProgress}
              onDuration={handleDuration}
              controls
              ref={player}
              playing={true}
              onPlay={handleSeek}
              config={{
                file: {
                  attributes: {
                    controlsList: 'nodownload',
                  },
                },
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Đóng
            </Button>
          </DialogActions>
        </Dialog>
      </>

    )
  }

  const handleOpenQuiz = (item: ICourseVideoDetail) => {
    dispatch(resetTest())
    dispatch(updateStateQuiz(true))
    dispatch(getQuizsAndAnswer(item?.video_id))
  }
  return (
    <>
      {loading && <Loading />}
      <Typography
        variant="soft"
        color="success"
        startDecorator="🚨"
        fontSize="sm"
        sx={{ '--Typography-gap': '0.5rem', p: '1', marginTop: '16px' }}
      >
        Bạn đang xem video của môn học &quot;{coursePaymentDetail.subject_name}&quot; với khóa học &quot;{coursePaymentDetail?.name}&quot;
      </Typography>
      <Typography color="warning" sx={{ backgroundColor: 'rgb(231 159 55 / 20%)' }}>
        Để được làm bài Test thì tiến độ của video phải &gt; 85%
      </Typography>
      <Box component="div" sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}>
        {videosByCourseId && videosByCourseId.videos && videosByCourseId.videos.length > 0 && videosByCourseId.videos.map((item, index) => (
          <Card variant="outlined" sx={{ width: 250, margin: '16px' }} key={index}>
            <CardOverflow>
              <AspectRatio ratio="2">
                <img
                  src="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318"
                  srcSet="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318&dpr=2 2x"
                  loading="lazy"
                  alt=""
                />
              </AspectRatio>
            </CardOverflow>
            <CardContent>
              <Typography level="title-md">{item.videoName}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '100%', mr: 1 }}>
                  <BorderLinearProgress variant="determinate" value={item.progress} />
                </Box>
                <Box>
                  <Typography level="body-xs"
                    textColor="var(--joy-palette-success-plainColor)"
                    fontFamily="monospace"
                    sx={{ opacity: '50%' }} >{`${Math.round(
                      item.progress
                    )}%`}</Typography>
                </Box>
              </Box>
              {item.finished === 1 && item.progress >= 85 &&
                <Chip label="Hoàn thành bài test" color="success" size='small' sx={{
                  fontSize: '10px',
                  width: '110px',
                  paddingTop: '2px',
                  marginTop: '5px'
                }} />
              }
              {item.finished === 0 && item.progress >= 85 &&
                <Chip label="Chưa hoàn thành bài test" color="warning" size='small' sx={{
                  fontSize: '10px',
                  width: '140px',
                  paddingTop: '2px',
                  marginTop: '3px'
                }} />
              }
              <CardActions>
                <Button variant="soft" size="sm" sx={{ maxWidth: '4rem' }} onClick={(e) => { handleVideoDetail(item) }}>
                  Xem
                </Button>
                {item.progress >= 85 &&
                  <Button variant="solid" size="sm" onClick={(e) => { handleOpenQuiz(item) }}>
                    Làm bài test
                  </Button>
                }

              </CardActions>
            </CardContent>
            <CardOverflow variant="soft" sx={{ bgcolor: 'background.level1' }}>
              <Divider inset="context" />
              <CardContent orientation="horizontal">
                <Typography level="body-xs" fontWeight="md" textColor="text.secondary">
                  {item.view} lượt xem
                </Typography>
                <Divider orientation="vertical" />
                <Typography level="body-xs" fontWeight="md" textColor="text.secondary">
                  {item.full_time} phút
                </Typography>
              </CardContent>
            </CardOverflow>
          </Card>
        ))}
      </Box>
      {openQuiz && <OpenQuiz />}
      {open && <OpenVideo />}
    </>
  );
};

export default Video;
