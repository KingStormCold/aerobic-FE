import { createAsyncThunk, createSlice, isPending, isFulfilled, isRejected } from '@reduxjs/toolkit';
import axios from 'axios';
import { Storage } from 'react-jhipster';
import { IQueryParams, serializeAxiosError } from './reducer.utils';
import { URL_PATH } from 'app/config/path';
import { IVideoDetail, ICreateVideo, IUpdateVideo, ICourseNameDetail } from '../model/video';

const initialState = {
  loading: false,
  totalPage: 0,
  pageNum: 0,
  videos: [] as ReadonlyArray<IVideoDetail>,
  videosErrorMessage: '',
  deleteVideoSuccess: false,
  deleteVideoErrorMessage: '',
  getVideosErrorMessage: '',
  createVideoSuccess: false,
  createVideoErrorMessage: '',
  updateVideoSuccess: false,
  updateVideoErrorMessage: '',
  video: {} as IVideoDetail,
  getCourseNames: [] as ReadonlyArray<ICourseNameDetail>
};

export type VideoState = Readonly<typeof initialState>;

export const videosPage = createAsyncThunk(
  'admin/videos',
  async (page: number) => {
    return await axios.get<any>(`${URL_PATH.API.VIDEOS}?page=${page}`)
  }, {
  serializeError: serializeAxiosError
});

export const getVideos = createAsyncThunk(
  'admin/get-video',
  async () => {
    return await axios.get<any>(`${URL_PATH.API.GET_VIDEO}`)
  }, {
  serializeError: serializeAxiosError
});

export const createVideo = createAsyncThunk(
  'admin/create-video',
  async (data: ICreateVideo) => {
    return await axios.post<any>(`${URL_PATH.API.VIDEO}`, data)
  }, {
  serializeError: serializeAxiosError
});

export const updateVideo = createAsyncThunk(
  'admin/update-video',
  async (data: { requestBody: IUpdateVideo, id: number }) => {
    return await axios.put<any>(`${URL_PATH.API.DELETE_VIDEO}/${data.id}`, data.requestBody)
  }, {
  serializeError: serializeAxiosError
});

export const deleteVideo = createAsyncThunk(
  'admin/delete-video',
  async (id: string) => {
    return await axios.delete<any>(`${URL_PATH.API.DELETE_VIDEO}/${id}`)
  }, {
  serializeError: serializeAxiosError
});

export const showCourseName = createAsyncThunk(
  'admin/show-course-name',
  async () => {
    return await axios.get<any>(`${URL_PATH.API.SHOW_COURSE_NAME}`)
  }, {
  serializeError: serializeAxiosError
});

export const VideoSlice = createSlice({
  name: 'Video',
  initialState: initialState as VideoState,
  reducers: {
    resetVideo() {
      return initialState;
    },
    updateStateVideo(state, action) {
      return {
        ...state,
        video: action.payload
      }
    }
  },
  extraReducers(builder) {
    builder
      .addMatcher(isFulfilled(videosPage), (state, action) => {
        state.loading = false
        state.videos = action.payload.data?.courses;
        state.totalPage = action.payload.data?.totalPage;
        state.pageNum = action.payload.data?.pageNum;
      })
      .addMatcher(isPending(videosPage), (state, action) => {
        state.loading = true
        state.videosErrorMessage = ''
      })
      .addMatcher(isRejected(videosPage), (state, action) => {
        state.loading = false
        const httpStatusCode = action.error['response']?.status
        state.videosErrorMessage = httpStatusCode !== 200 ? action.error['response']?.data?.error_message : ''
      })
      .addMatcher(isFulfilled(deleteVideo), (state, action) => {
        state.loading = false
        state.deleteVideoSuccess = true
      })
      .addMatcher(isPending(deleteVideo), (state, action) => {
        state.loading = true
        state.deleteVideoSuccess = false
        state.deleteVideoErrorMessage = ''
      })
      .addMatcher(isRejected(deleteVideo), (state, action) => {
        state.loading = false
        const httpStatusCode = action.error['response']?.status
        state.deleteVideoErrorMessage = httpStatusCode !== 200 ? action.error['response']?.data?.error_message : ''
      })
      .addMatcher(isFulfilled(getVideos), (state, action) => {
        state.loading = false
        state.videos = action.payload.data?.videos;
      })
      .addMatcher(isPending(getVideos), (state, action) => {
        state.loading = true
        state.getVideosErrorMessage = ''
      })
      .addMatcher(isRejected(getVideos), (state, action) => {
        state.loading = false
        const httpStatusCode = action.error['response']?.status
        state.getVideosErrorMessage = httpStatusCode !== 200 ? action.error['response']?.data?.error_message : ''
      })
      .addMatcher(isFulfilled(createVideo), (state, action) => {
        state.loading = false
        state.createVideoSuccess = true;
      })
      .addMatcher(isPending(createVideo), (state, action) => {
        state.loading = true
        state.createVideoErrorMessage = ''
        state.createVideoSuccess = false
      })
      .addMatcher(isRejected(createVideo), (state, action) => {
        state.loading = false
        const httpStatusCode = action.error['response']?.status
        state.createVideoErrorMessage = httpStatusCode !== 200 ? action.error['response']?.data?.error_message : ''
      })
      .addMatcher(isFulfilled(updateVideo), (state, action) => {
        state.loading = false
        state.updateVideoSuccess = true;
      })
      .addMatcher(isPending(updateVideo), (state, action) => {
        state.loading = true
        state.updateVideoErrorMessage = ''
        state.updateVideoSuccess = false
      })
      .addMatcher(isRejected(updateVideo), (state, action) => {
        state.loading = false
        const httpStatusCode = action.error['response']?.status
        state.updateVideoErrorMessage = httpStatusCode !== 200 ? action.error['response']?.data?.error_message : ''
      })
      .addMatcher(isFulfilled(showCourseName), (state, action) => {
        state.loading = false
        state.getCourseNames = action.payload.data?.courses;
      })
      .addMatcher(isPending(showCourseName), (state, action) => {
        state.loading = true
      })
      .addMatcher(isRejected(showCourseName), (state, action) => {
        state.loading = false
      })
      ;
  },
});

export const { resetVideo, updateStateVideo } = VideoSlice.actions;
// Reducer
export default VideoSlice.reducer;
