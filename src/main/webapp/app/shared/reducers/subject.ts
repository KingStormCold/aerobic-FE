import { createAsyncThunk, createSlice, isPending, isFulfilled, isRejected } from '@reduxjs/toolkit';

import  axios  from 'axios';
import { URL_PATH } from 'app/config/path';
import { IQueryParams, serializeAxiosError } from './reducer.utils';
import { ISubjectDetail, ICreateSubject, IUpdateSubject, CategoriesChild } from '../model/subject';
const initialState = {
  loading: false,
  totalPage: 0,
  pageNum: 0,
  subjects: [] as ReadonlyArray<ISubjectDetail>,
  subjectsErrorMessage: '',
  deleteSubjectSuccess: false,
  deleteSubjectErrorMessage: '',
  categories: [] as ReadonlyArray<CategoriesChild>,
  childCategoriesErrorMessage: '',
  createSubjectSuccess: false,
  createSubjectErrorMessage: '', 
  updateSubjectSuccess: false,
  updateSubjectErrorMessage: '',
  subject: {} as ISubjectDetail


};

export type SubjectState = Readonly<typeof initialState>;

export const getSubjects = createAsyncThunk(
  'admin/get-subjects',
  async (page: number) => {
    return await axios.get<any>(`${URL_PATH.API.GET_SUBJECT}?page=${page}`)
  }, {
  serializeError: serializeAxiosError
});

export const updateSubject = createAsyncThunk(
  'admin/edit-subject',
  async (data: { requestBody: IUpdateSubject, id: number }) => {
    return await axios.put<any>(`${URL_PATH.API.SUBJECT}/${data.id}`, data.requestBody)
  }, {
  serializeError: serializeAxiosError
});

export const createSubject = createAsyncThunk(
  'admin/create-subject',
  async (data: ICreateSubject) => {
    return await axios.post<any>(`${URL_PATH.API.SUBJECT}`, data)
  }, {
  serializeError: serializeAxiosError
});

export const getChildCategories = createAsyncThunk(
  'admin/get-child-categories',
  async () => {
    return await axios.get<any>(`${URL_PATH.API.GET_CHILD_CATEGORIES}`)
  }, {
  serializeError: serializeAxiosError
});

export const deleteSubject = createAsyncThunk(
  'admin/delete-subject',
  async (id: string) => {
    return await axios.delete<any>(`${URL_PATH.API.SUBJECT}/${id}`)
  }, {
  serializeError: serializeAxiosError
});


export const SubjectSlice = createSlice({
  name: 'Subject',
  initialState: initialState as SubjectState,
  reducers: {
    resetSubject() {
      return initialState;
    },
    updateStateSubject(state, action) {
      return {
        ...state,
        subject: action.payload
      }
    }
  },

  extraReducers(builder) {
    builder
    .addMatcher(isFulfilled(getSubjects), (state, action) => {
      state.loading = false
      state.subjects = action.payload.data?.subjects;
      state.totalPage = action.payload.data?.totalPage;
      state.pageNum = action.payload.data?.pageNum;
    })
    .addMatcher(isPending(getSubjects), (state, action) => {
      state.loading = true
      state.subjectsErrorMessage = ''
    })
    .addMatcher(isRejected(getSubjects), (state, action) => {
      state.loading = false
      const httpStatusCode = action.error['response']?.status
      state.subjectsErrorMessage = httpStatusCode !== 200 ? action.error['response']?.data?.error_message : ''
    })
    .addMatcher(isFulfilled(getChildCategories), (state, action) => {
      state.loading = false
      state.categories = action.payload.data?.categories;
    })
    .addMatcher(isPending(getChildCategories), (state, action) => {
      state.loading = true
      state.childCategoriesErrorMessage = ''
    })
    .addMatcher(isRejected(getChildCategories), (state, action) => {
      state.loading = false
      const httpStatusCode = action.error['response']?.status
      state.childCategoriesErrorMessage = httpStatusCode !== 200 ? action.error['response']?.data?.error_message : ''
    })
    .addMatcher(isFulfilled(createSubject), (state, action) => {
      state.loading = false
      state.createSubjectSuccess = true;
    })
    .addMatcher(isPending(createSubject), (state, action) => {
      state.loading = true
      state.createSubjectErrorMessage = ''
      state.createSubjectSuccess = false
    })
    .addMatcher(isRejected(createSubject), (state, action) => {
      state.loading = false
      const httpStatusCode = action.error['response']?.status
      state.createSubjectErrorMessage = httpStatusCode !== 200 ? action.error['response']?.data?.error_message : ''
    })
    .addMatcher(isFulfilled(updateSubject), (state, action) => {
      state.loading = false
      state.updateSubjectSuccess = true;
    })
    .addMatcher(isPending(updateSubject), (state, action) => {
      state.loading = true
      state.updateSubjectErrorMessage = ''
      state.updateSubjectSuccess = false
    })
    .addMatcher(isRejected(updateSubject), (state, action) => {
      state.loading = false
      const httpStatusCode = action.error['response']?.status
      state.updateSubjectErrorMessage = httpStatusCode !== 200 ? action.error['response']?.data?.error_message : ''
    })
    .addMatcher(isFulfilled(deleteSubject), (state, action) => {
      state.loading = false
      state.deleteSubjectSuccess = true;
    })
    .addMatcher(isPending(deleteSubject), (state, action) => {
      state.loading = true
      state.deleteSubjectSuccess = false
      state.deleteSubjectErrorMessage = ''
    })
    .addMatcher(isRejected(deleteSubject), (state, action) => {
      state.loading = false
      const httpStatusCode = action.error['response']?.status
      state.deleteSubjectErrorMessage = httpStatusCode !== 200 ? action.error['response']?.data?.error_message : ''
    })

      ;
  },
});

export const { resetSubject, updateStateSubject } = SubjectSlice.actions;
// Reducer
export default SubjectSlice.reducer;
