import { createAsyncThunk, createSlice, isPending, isFulfilled, isRejected } from '@reduxjs/toolkit';
import axios from 'axios';
import { Storage } from 'react-jhipster';
import { IQueryParams, serializeAxiosError } from './reducer.utils';
import { URL_PATH } from 'app/config/path';
import { ICategoryDetail, ICreateCategory, IUpdateCategory } from '../model/category';

const initialState = {
  loading: false,
  totalPage: 0,
  pageNum: 0,
  categories: [] as ReadonlyArray<ICategoryDetail>,
  categoriesErrorMessage: '',
  deleteCategorySuccess: false,
  deleteCategoryErrorMessage: '',
  parentCategories: [] as ReadonlyArray<ICategoryDetail>,
  parentCategoriesErrorMessage: '',
  createCategorySuccess: false,
  createCategoryErrorMessage: '',
  updateCategorySuccess: false,
  updateCategoryErrorMessage: '',
  category: {} as ICategoryDetail
};

export type CategoryState = Readonly<typeof initialState>;

export const getCategories = createAsyncThunk(
  'admin/get-categories',
  async (page: number) => {
    return await axios.get<any>(`${URL_PATH.API.GET_CATEGORY}?page=${page}`)
  }, {
  serializeError: serializeAxiosError
});

export const getParentCategories = createAsyncThunk(
  'admin/get-parent-category',
  async () => {
    return await axios.get<any>(`${URL_PATH.API.GET_PARENT_CATEGORY}`)
  }, {
  serializeError: serializeAxiosError
});

export const createCategory = createAsyncThunk(
  'admin/create-category',
  async (data: ICreateCategory) => {
    return await axios.post<any>(`${URL_PATH.API.CATEGORY}`, data)
  }, {
  serializeError: serializeAxiosError
});

export const updateCategory = createAsyncThunk(
  'admin/update-category',
  async (data: { requestBody: IUpdateCategory, id: number }) => {
    return await axios.put<any>(`${URL_PATH.API.CATEGORY}/${data.id}`, data.requestBody)
  }, {
  serializeError: serializeAxiosError
});

export const deleteCategory = createAsyncThunk(
  'admin/delete-category',
  async (id: string) => {
    return await axios.delete<any>(`${URL_PATH.API.CATEGORY}/${id}`)
  }, {
  serializeError: serializeAxiosError
});

export const CategorySlice = createSlice({
  name: 'Category',
  initialState: initialState as CategoryState,
  reducers: {
    resetCategory() {
      return initialState;
    },
    updateStateCategory(state, action) {
      return {
        ...state,
        category: action.payload
      }
    }
  },
  extraReducers(builder) {
    builder
      .addMatcher(isFulfilled(getCategories), (state, action) => {
        state.loading = false
        state.categories = action.payload.data?.categories;
        state.totalPage = action.payload.data?.totalPage;
        state.pageNum = action.payload.data?.pageNum;
      })
      .addMatcher(isPending(getCategories), (state, action) => {
        state.loading = true
        state.categoriesErrorMessage = ''
      })
      .addMatcher(isRejected(getCategories), (state, action) => {
        state.loading = false
        const httpStatusCode = action.error['response']?.status
        state.categoriesErrorMessage = httpStatusCode !== 200 ? action.error['response']?.data?.error_message : ''
      })
      .addMatcher(isFulfilled(deleteCategory), (state, action) => {
        state.loading = false
        state.deleteCategorySuccess = true
      })
      .addMatcher(isPending(deleteCategory), (state, action) => {
        state.loading = true
        state.deleteCategorySuccess = false
        state.deleteCategoryErrorMessage = ''
      })
      .addMatcher(isRejected(deleteCategory), (state, action) => {
        state.loading = false
        const httpStatusCode = action.error['response']?.status
        state.deleteCategoryErrorMessage = httpStatusCode !== 200 ? action.error['response']?.data?.error_message : ''
      })
      .addMatcher(isFulfilled(getParentCategories), (state, action) => {
        state.loading = false
        state.parentCategories = action.payload.data?.categories;
      })
      .addMatcher(isPending(getParentCategories), (state, action) => {
        state.loading = true
        state.parentCategoriesErrorMessage = ''
      })
      .addMatcher(isRejected(getParentCategories), (state, action) => {
        state.loading = false
        const httpStatusCode = action.error['response']?.status
        state.parentCategoriesErrorMessage = httpStatusCode !== 200 ? action.error['response']?.data?.error_message : ''
      })
      .addMatcher(isFulfilled(createCategory), (state, action) => {
        state.loading = false
        state.createCategorySuccess = true;
      })
      .addMatcher(isPending(createCategory), (state, action) => {
        state.loading = true
        state.createCategoryErrorMessage = ''
        state.createCategorySuccess = false
      })
      .addMatcher(isRejected(createCategory), (state, action) => {
        state.loading = false
        const httpStatusCode = action.error['response']?.status
        state.createCategoryErrorMessage = httpStatusCode !== 200 ? action.error['response']?.data?.error_message : ''
      })
      .addMatcher(isFulfilled(updateCategory), (state, action) => {
        state.loading = false
        state.updateCategorySuccess = true;
      })
      .addMatcher(isPending(updateCategory), (state, action) => {
        state.loading = true
        state.updateCategoryErrorMessage = ''
        state.updateCategorySuccess = false
      })
      .addMatcher(isRejected(updateCategory), (state, action) => {
        state.loading = false
        const httpStatusCode = action.error['response']?.status
        state.updateCategoryErrorMessage = httpStatusCode !== 200 ? action.error['response']?.data?.error_message : ''
      })
      ;
  },
});

export const { resetCategory, updateStateCategory } = CategorySlice.actions;
// Reducer
export default CategorySlice.reducer;
