import { createAsyncThunk, createSlice, isPending, isFulfilled, isRejected } from '@reduxjs/toolkit';
import axios from 'axios';
import { Storage } from 'react-jhipster';
import { IQueryParams, serializeAxiosError } from './reducer.utils';
import { URL_PATH } from 'app/config/path';
import { ITestDetail, ICreateTest, IUpdateTest, IVideoNameDetail, ITestClient, ITestAnswerClient, IResultCheckAnswer } from '../model/test';

const initialState = {
  loading: false,
  totalPage: 0,
  pageNum: 0,
  testsData: [] as ReadonlyArray<ITestDetail>,
  testsErrorMessage: '',
  deleteTestSuccess: false,
  deleteTestErrorMessage: '',
  getTestsErrorMessage: '',
  createTestSuccess: false,
  createTestErrorMessage: '',
  updateTestSuccess: false,
  updateTestErrorMessage: '',
  test: {} as ITestDetail,
  getVideoNames: [] as ReadonlyArray<IVideoNameDetail>,
  quizs: [] as ReadonlyArray<ITestClient>,
  openQuiz: false,
  resultQuiz: {} as IResultCheckAnswer,
  resultQuizSuccess: false
}

export type TestState = Readonly<typeof initialState>;

export const getTests = createAsyncThunk(
  'admin/get-tests',
  async (data: { page: number, id: number }) => {
    return await axios.get<any>(`${URL_PATH.API.TESTS}/${data.id}?page=${data.page}`)
  }, {
  serializeError: serializeAxiosError
});

// export const getTests = createAsyncThunk(
//   'admin/get-tests',
//   async () => {
//     return await axios.get<any>(`${URL_PATH.API.GET_TESTS}`)
//   }, {
//   serializeError: serializeAxiosError
// });

export const createTest = createAsyncThunk(
  'admin/create-test',
  async (data: ICreateTest) => {
    return await axios.post<any>(`${URL_PATH.API.TEST}`, data)
  }, {
  serializeError: serializeAxiosError
});

export const updateTest = createAsyncThunk(
  'admin/update-test',
  async (data: { requestBody: IUpdateTest, id: number }) => {
    return await axios.put<any>(`${URL_PATH.API.DELETE_TEST}/${data.id}`, data.requestBody)
  }, {
  serializeError: serializeAxiosError
});

export const deleteTest = createAsyncThunk(
  'admin/delete-test',
  async (id: string) => {
    return await axios.delete<any>(`${URL_PATH.API.DELETE_TEST}/${id}`)
  }, {
  serializeError: serializeAxiosError
});

export const showVideoName = createAsyncThunk(
  'admin/show-video-name',
  async () => {
    return await axios.get<any>(`${URL_PATH.API.SHOW_VIDEO_NAME}`)
  }, {
  serializeError: serializeAxiosError
});

export const getQuizsAndAnswer = createAsyncThunk(
  'client/get-quizs',
  async (videoId: number) => {
    return await axios.get<any>(`${URL_PATH.API.GET_QUIZ}/${videoId}`)
  }, {
  serializeError: serializeAxiosError
});

export const submitQuiz = createAsyncThunk(
  'client/submit-quizs',
  async (data: { quizs: ITestAnswerClient[] }) => {
    return await axios.post<any>(`${URL_PATH.API.CHECK_ANSWER}`, data)
  }, {
  serializeError: serializeAxiosError
});

export const TestSlice = createSlice({
  name: 'Test',
  initialState: initialState as TestState,
  reducers: {
    resetTest() {
      return initialState;
    },
    updateStateTest(state, action) {
      return {
        ...state,
        test: action.payload
      }
    },
    updateStateQuiz(state, action) {
      return {
        ...state,
        openQuiz: action.payload
      }
    },
  },
  extraReducers(builder) {
    builder
      .addMatcher(isFulfilled(getTests), (state, action) => {
        state.loading = false
        state.testsData = action.payload.data?.videos;
        state.totalPage = action.payload.data?.totalPage;
        state.pageNum = action.payload.data?.pageNum;
      })
      .addMatcher(isPending(getTests), (state, action) => {
        state.loading = true
        state.testsErrorMessage = ''
      })
      .addMatcher(isRejected(getTests), (state, action) => {
        state.loading = false
        const httpStatusCode = action.error['response']?.status
        state.testsErrorMessage = httpStatusCode !== 200 ? action.error['response']?.data?.error_message : ''
      })
      .addMatcher(isFulfilled(deleteTest), (state, action) => {
        state.loading = false
        state.deleteTestSuccess = true
      })
      .addMatcher(isPending(deleteTest), (state, action) => {
        state.loading = true
        state.deleteTestSuccess = false
        state.deleteTestErrorMessage = ''
      })
      .addMatcher(isRejected(deleteTest), (state, action) => {
        state.loading = false
        const httpStatusCode = action.error['response']?.status
        state.deleteTestErrorMessage = httpStatusCode !== 200 ? action.error['response']?.data?.error_message : ''
      })
      .addMatcher(isFulfilled(getTests), (state, action) => {
        state.loading = false
        state.testsData = action.payload.data?.videos;
      })
      .addMatcher(isPending(getTests), (state, action) => {
        state.loading = true
        state.getTestsErrorMessage = ''
      })
      .addMatcher(isRejected(getTests), (state, action) => {
        state.loading = false
        const httpStatusCode = action.error['response']?.status
        state.getTestsErrorMessage = httpStatusCode !== 200 ? action.error['response']?.data?.error_message : ''
      })
      .addMatcher(isFulfilled(createTest), (state, action) => {
        state.loading = false
        state.createTestSuccess = true;
      })
      .addMatcher(isPending(createTest), (state, action) => {
        state.loading = true
        state.createTestErrorMessage = ''
        state.createTestSuccess = false
      })
      .addMatcher(isRejected(createTest), (state, action) => {
        state.loading = false
        const httpStatusCode = action.error['response']?.status
        state.createTestErrorMessage = httpStatusCode !== 200 ? action.error['response']?.data?.error_message : ''
      })
      .addMatcher(isFulfilled(updateTest), (state, action) => {
        state.loading = false
        state.updateTestSuccess = true;
      })
      .addMatcher(isPending(updateTest), (state, action) => {
        state.loading = true
        state.updateTestErrorMessage = ''
        state.updateTestSuccess = false
      })
      .addMatcher(isRejected(updateTest), (state, action) => {
        state.loading = false
        const httpStatusCode = action.error['response']?.status
        state.updateTestErrorMessage = httpStatusCode !== 200 ? action.error['response']?.data?.error_message : ''
      })
      .addMatcher(isFulfilled(showVideoName), (state, action) => {
        state.loading = false
        state.getVideoNames = action.payload.data?.videos;
      })
      .addMatcher(isPending(showVideoName), (state, action) => {
        state.loading = true
      })
      .addMatcher(isRejected(showVideoName), (state, action) => {
        state.loading = false
      })
      .addMatcher(isFulfilled(getQuizsAndAnswer), (state, action) => {
        state.loading = false
        state.quizs = action.payload.data?.tests;
      })
      .addMatcher(isPending(getQuizsAndAnswer), (state, action) => {
        state.loading = true
        state.quizs = []
        state.resultQuiz = {} as IResultCheckAnswer
      })
      .addMatcher(isRejected(getQuizsAndAnswer), (state, action) => {
        state.loading = false
      })
      .addMatcher(isFulfilled(submitQuiz), (state, action) => {
        state.loading = false
        state.resultQuiz = action.payload.data?.result;
        state.resultQuizSuccess = true
      })
      .addMatcher(isPending(submitQuiz), (state, action) => {
        state.loading = true
        state.resultQuiz = {} as IResultCheckAnswer
        state.resultQuizSuccess = false
        state.quizs = []
      })
      .addMatcher(isRejected(submitQuiz), (state, action) => {
        state.loading = false
      })
    submitQuiz
      ;
  },
});

export const { resetTest, updateStateTest, updateStateQuiz } = TestSlice.actions;
// Reducer
export default TestSlice.reducer;
