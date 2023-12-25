import { ITestDetail } from './../model/test';
import { createAsyncThunk, createSlice, isPending, isFulfilled, isRejected } from '@reduxjs/toolkit';
import axios from 'axios';
import { Storage } from 'react-jhipster';
import { IQueryParams, serializeAxiosError } from './reducer.utils';
import { URL_PATH } from 'app/config/path';
import { IAnswerDetail, ICreateAnswer, IUpdateAnswer } from '../model/answer';

const initialState = {
  loading: false,
  totalPage: 0,
  pageNum: 0,
  answers: [] as ReadonlyArray<IAnswerDetail>,
  answersErrorMessage: '',
  deleteAnswerSuccess: false,
  deleteAnswerErrorMessage: '',
  getAnswersErrorMessage: '',
  createAnswerSuccess: false,
  createAnswerErrorMessage: '',
  updateAnswerSuccess: false,
  updateAnswerErrorMessage: '',
  answer: {} as IAnswerDetail,
};

export type AnswerState = Readonly<typeof initialState>;

export const answers = createAsyncThunk(
  'admin/answers',
  async (page: number) => {
    return await axios.get<any>(`${URL_PATH.API.ANSWERS}?page=${page}`)
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
  async (data: ICreateAnswer) => {
    return await axios.post<any>(`${URL_PATH.API.VIDEO}`, data)
  }, {
  serializeError: serializeAxiosError
});

export const updateVideo = createAsyncThunk(
  'admin/update-video',
  async (data: { requestBody: IUpdateAnswer, id: number }) => {
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

export const AnswerSlice = createSlice({
  name: 'answer',
  initialState: initialState as AnswerState,
  reducers: {
    resetAnswer() {
      return initialState;
    },
    updateStateAnswer(state, action) {
      return {
        ...state,
        answer: action.payload
      }
    }
  },
  extraReducers(builder) {
    builder
      .addMatcher(isFulfilled(answers), (state, action) => {
        state.loading = false
        state.answers = action.payload.data?.tests;
        state.totalPage = action.payload.data?.totalPage;
        state.pageNum = action.payload.data?.pageNum;
      })
      .addMatcher(isPending(answers), (state, action) => {
        state.loading = true
        state.answersErrorMessage = ''
      })
      .addMatcher(isRejected(answers), (state, action) => {
        state.loading = false
        const httpStatusCode = action.error['response']?.status
        state.answersErrorMessage = httpStatusCode !== 200 ? action.error['response']?.data?.error_message : ''
      })
      .addMatcher(isFulfilled(deleteVideo), (state, action) => {
        state.loading = false
        state.deleteAnswerSuccess = true
      })
      .addMatcher(isPending(deleteVideo), (state, action) => {
        state.loading = true
        state.deleteAnswerSuccess = false
        state.deleteAnswerErrorMessage = ''
      })
      .addMatcher(isRejected(deleteVideo), (state, action) => {
        state.loading = false
        const httpStatusCode = action.error['response']?.status
        state.deleteAnswerErrorMessage = httpStatusCode !== 200 ? action.error['response']?.data?.error_message : ''
      })
      .addMatcher(isFulfilled(getVideos), (state, action) => {
        state.loading = false
        state.answers = action.payload.data?.videos;
      })
      .addMatcher(isPending(getVideos), (state, action) => {
        state.loading = true
        state.getAnswersErrorMessage = ''
      })
      .addMatcher(isRejected(getVideos), (state, action) => {
        state.loading = false
        const httpStatusCode = action.error['response']?.status
        state.getAnswersErrorMessage = httpStatusCode !== 200 ? action.error['response']?.data?.error_message : ''
      })
      .addMatcher(isFulfilled(createVideo), (state, action) => {
        state.loading = false
        state.createAnswerSuccess = true;
      })
      .addMatcher(isPending(createVideo), (state, action) => {
        state.loading = true
        state.createAnswerErrorMessage = ''
        state.createAnswerSuccess = false
      })
      .addMatcher(isRejected(createVideo), (state, action) => {
        state.loading = false
        const httpStatusCode = action.error['response']?.status
        state.createAnswerErrorMessage = httpStatusCode !== 200 ? action.error['response']?.data?.error_message : ''
      })
      .addMatcher(isFulfilled(updateVideo), (state, action) => {
        state.loading = false
        state.updateAnswerSuccess = true;
      })
      .addMatcher(isPending(updateVideo), (state, action) => {
        state.loading = true
        state.updateAnswerErrorMessage = ''
        state.updateAnswerSuccess = false
      })
      .addMatcher(isRejected(updateVideo), (state, action) => {
        state.loading = false
        const httpStatusCode = action.error['response']?.status
        state.updateAnswerErrorMessage = httpStatusCode !== 200 ? action.error['response']?.data?.error_message : ''
      })
      ;
  },
});

export const { resetAnswer, updateStateAnswer } = AnswerSlice.actions;
// Reducer
export default AnswerSlice.reducer;
