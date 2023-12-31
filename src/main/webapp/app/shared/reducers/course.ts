import { createAsyncThunk, createSlice, isPending, isFulfilled, isRejected } from '@reduxjs/toolkit';
import axios from 'axios';
import { serializeAxiosError } from './reducer.utils';
import { URL_PATH } from 'app/config/path';
import {
  ICourseDetail,
  ICoursePayments,
  ICreateCourse,
  IFullCourse,
  IHistoryPayment,
  ISubjectDetail,
  IUpdateCourse,
} from '../model/course';

const initialState = {
  loading: false,
  totalPage: 0,
  pageNum: 0,
  coursesErrorMessage: '',
  deleteCourseSuccess: false,
  deleteCourseErrorMessage: '',
  courses: [] as ReadonlyArray<ICourseDetail>,
  createCourseSuccess: false,
  createCourseErrorMessage: '',
  updateCourseSuccess: false,
  updateCourseErrorMessage: '',
  course: {} as ICourseDetail,
  subjects: [] as ReadonlyArray<ISubjectDetail>,
  fullCourses: [] as ReadonlyArray<IFullCourse>,
  fullCourse: {} as IFullCourse,
  paymentCourseSuccess: false,
  paymentCourseErrorMessage: '',
  coursePayments: {} as ReadonlyArray<ICoursePayments>,
  coursePaymentErrorMessage: '',
  historyPayments: [] as ReadonlyArray<IHistoryPayment>,
};
export type CourseState = Readonly<typeof initialState>;

export const coursesPagination = createAsyncThunk(
  'admin/courses',
  async (data: { page: number; id: number }) => {
    return await axios.get<any>(`${URL_PATH.API.COURSES}/${data.id}?page=${data.page}`);
  },
  {
    serializeError: serializeAxiosError,
  }
);

export const getCourse = createAsyncThunk(
  'admin/get-course',
  async () => {
    return await axios.get<any>(`${URL_PATH.API.GET_COURSE}`);
  },
  {
    serializeError: serializeAxiosError,
  }
);

export const createCourse = createAsyncThunk(
  'admin/insert-course',
  async (data: ICreateCourse) => {
    return await axios.post<any>(`${URL_PATH.API.COURSE}`, data);
  },
  {
    serializeError: serializeAxiosError,
  }
);

export const updateCourse = createAsyncThunk(
  'admin/update-Course',
  async (data: { requestBody: IUpdateCourse; id: number }) => {
    return await axios.put<any>(`${URL_PATH.API.DELETE_COURSE}/${data.id}`, data.requestBody);
  },
  {
    serializeError: serializeAxiosError,
  }
);

export const deleteCourse = createAsyncThunk(
  'admin/delete-Course',
  async (id: string) => {
    return await axios.delete<any>(`${URL_PATH.API.DELETE_COURSE}/${id}`);
  },
  {
    serializeError: serializeAxiosError,
  }
);

export const showSubject = createAsyncThunk(
  'admin/show-subject',
  async () => {
    return await axios.get<any>(`${URL_PATH.API.SHOW_SUBJECT}`);
  },
  {
    serializeError: serializeAxiosError,
  }
);

export const getCoursesClient = createAsyncThunk(
  'client/get-courses-client',
  async () => {
    return await axios.get<any>(`${URL_PATH.API.CLIENT_COURSES}`);
  },
  {
    serializeError: serializeAxiosError,
  }
);

export const paymentCourse = createAsyncThunk(
  'client/payment-courses',
  async (data: { course_id: number; subject_id: number; subject_full: number; free: number }) => {
    return await axios.post<any>(`${URL_PATH.API.CLIENT_PAYMENT_COURSE}`, data);
  },
  {
    serializeError: serializeAxiosError,
  }
);

export const historyPayment = createAsyncThunk(
  'client/history-payment',
  async (page: number) => {
    return await axios.get<any>(`${URL_PATH.API.HISTORY_PAYMENT}?page=${page}`);
  },
  {
    serializeError: serializeAxiosError,
  }
);

export const getCoursesPayment = createAsyncThunk(
  'client/get-courses-payment',
  async () => {
    return await axios.get<any>(`${URL_PATH.API.COURSE_PAYMENT}`);
  },
  {
    serializeError: serializeAxiosError,
  }
);

export const CourseSlice = createSlice({
  name: 'course',
  initialState: initialState as CourseState,
  reducers: {
    resetCourse() {
      return initialState;
    },
    updateStateCourse(state, action) {
      return {
        ...state,
        course: action.payload,
      };
    },
    updateStatePaymentCourseSuccess(state) {
      return {
        ...state,
        paymentCourseSuccess: false,
        paymentCourseErrorMessage: ''
      };
    },
  },
  extraReducers(builder) {
    builder
      .addMatcher(isFulfilled(coursesPagination), (state, action) => {
        state.loading = false;
        state.courses = action.payload.data?.courses;
        state.totalPage = action.payload.data.totalPage;
        state.pageNum = action.payload.data.pageNum;
      })
      .addMatcher(isPending(coursesPagination), (state, action) => {
        state.loading = true;
        state.coursesErrorMessage = '';
      })
      .addMatcher(isRejected(coursesPagination), (state, action) => {
        state.loading = false;
        const httpStatusCode = action.error['response']?.status;
        state.coursesErrorMessage = httpStatusCode !== 200 ? action.error['response']?.data?.error_message : '';
      })
      .addMatcher(isFulfilled(deleteCourse), (state, action) => {
        state.loading = false;
        state.deleteCourseSuccess = true;
      })
      .addMatcher(isPending(deleteCourse), (state, action) => {
        state.loading = true;
        state.deleteCourseSuccess = false;
        state.deleteCourseErrorMessage = '';
      })
      .addMatcher(isRejected(deleteCourse), (state, action) => {
        state.loading = false;
        const httpStatusCode = action.error['response']?.status;
        state.deleteCourseErrorMessage = httpStatusCode !== 200 ? action.error['response']?.data?.error_message : '';
      })
      .addMatcher(isFulfilled(getCourse), (state, action) => {
        state.loading = false;
        state.courses = action.payload.data?.courses;
      })
      .addMatcher(isPending(getCourse), (state, action) => {
        state.loading = true;
        state.coursesErrorMessage = '';
      })
      .addMatcher(isRejected(getCourse), (state, action) => {
        state.loading = false;
        state.coursesErrorMessage = '';
        const httpStatusCode = action.error['response']?.status;
        state.coursesErrorMessage = httpStatusCode !== 200 ? action.error['response']?.data?.error_message : '';
      })
      .addMatcher(isFulfilled(createCourse), (state, action) => {
        state.loading = false;
        state.createCourseSuccess = true;
      })
      .addMatcher(isPending(createCourse), (state, action) => {
        state.loading = true;
        state.createCourseErrorMessage = '';
        state.createCourseSuccess = false;
      })
      .addMatcher(isRejected(createCourse), (state, action) => {
        state.loading = false;
        const httpStatusCode = action.error['response']?.status;
        state.createCourseErrorMessage = httpStatusCode !== 200 ? action.error['response']?.data?.error_message : '';
      })
      .addMatcher(isFulfilled(updateCourse), (state, action) => {
        state.loading = false;
        state.updateCourseSuccess = true;
      })
      .addMatcher(isPending(updateCourse), (state, action) => {
        state.loading = true;
        state.updateCourseErrorMessage = '';
        state.updateCourseSuccess = false;
      })
      .addMatcher(isRejected(updateCourse), (state, action) => {
        state.loading = false;
        const httpStatusCode = action.error['response']?.status;
        state.updateCourseErrorMessage = httpStatusCode !== 200 ? action.error['response']?.data?.error_message : '';
      })

      // lấy danh sách môn học
      .addMatcher(isFulfilled(showSubject), (state, action) => {
        state.loading = false;
        state.subjects = action.payload.data?.subjects;
      })
      .addMatcher(isPending(showSubject), (state, action) => {
        state.loading = true;
      })
      .addMatcher(isRejected(showSubject), (state, action) => {
        state.loading = false;
      })

      .addMatcher(isFulfilled(getCoursesClient), (state, action) => {
        state.loading = false;
        state.fullCourses = action.payload.data?.courses;
      })
      .addMatcher(isPending(getCoursesClient), (state, action) => {
        state.loading = true;
      })
      .addMatcher(isRejected(getCoursesClient), (state, action) => {
        state.loading = false;
      })

      .addMatcher(isFulfilled(paymentCourse), (state, action) => {
        state.loading = false;
        state.paymentCourseSuccess = true;
      })
      .addMatcher(isPending(paymentCourse), (state, action) => {
        state.loading = true;
        state.paymentCourseSuccess = false;
        state.paymentCourseErrorMessage = '';
      })
      .addMatcher(isRejected(paymentCourse), (state, action) => {
        state.loading = false;
        const httpStatusCode = action.error['response']?.status;
        state.paymentCourseErrorMessage = httpStatusCode !== 200 ? action.error['response']?.data?.error_message : '';
      })
      .addMatcher(isFulfilled(getCoursesPayment), (state, action) => {
        state.loading = false;
        state.coursePayments = action.payload.data?.payment_subjects;
      })
      .addMatcher(isPending(getCoursesPayment), (state, action) => {
        state.loading = true;
        state.coursePayments = []
        state.coursePaymentErrorMessage = ''
      })
      .addMatcher(isRejected(getCoursesPayment), (state, action) => {
        state.loading = false
        const httpStatusCode = action.error['response']?.status;
        state.coursePaymentErrorMessage = httpStatusCode !== 200 ? action.error['response']?.data?.error_message : '';
      })
      .addMatcher(isFulfilled(historyPayment), (state, action) => {
        state.loading = false;
        state.historyPayments = action.payload.data?.payments;
        state.totalPage = action.payload.data?.totalPage;
        state.pageNum = action.payload.data?.pageNum;
      })
      .addMatcher(isPending(historyPayment), (state, action) => {
        state.loading = true;
      })
      .addMatcher(isRejected(historyPayment), (state, action) => {
        state.loading = false;
      });
  },
});

export const { resetCourse, updateStateCourse, updateStatePaymentCourseSuccess } = CourseSlice.actions;
// Reducer
export default CourseSlice.reducer;
