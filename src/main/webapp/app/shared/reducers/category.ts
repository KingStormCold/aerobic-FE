
import axios from 'axios';
import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';
import { IQueryParams, serializeAxiosError } from 'app/shared/reducers/reducer.utils';
import { ICategory, IPagination, defaultValue } from '../model/category.model';
import { Storage } from 'react-jhipster';

const initialState = {
  loading: false,
  errorMessage: null,
  updating: false,
  updateSuccess: false,
  category: defaultValue,
  totalItems: 0,
  rootCategories: [] as any[],
  data: [] as ReadonlyArray<ICategory>,
  pagination: null as IPagination,
  selected: null,
  isParent: null,
  delError: false,
  // updateError: null,
  isChild: false,
  categoryNameDup: false,
  delSuccess: false,
  updateError: [] as any[],
};

const adminUrl = 'api/v1/category';

const AUTH_TOKEN_KEY = 'jhi-authenticationToken';

const token = Storage.local.get(AUTH_TOKEN_KEY) || Storage.session.get(AUTH_TOKEN_KEY);
const config = {
  headers: {
    'Authorization': token,
  }
}

export const createCategory = createAsyncThunk(
  'categoryManagerment/create_category',
  async (category: ICategory, thunkAPI) => {
    const result = await axios.post(adminUrl, category, config);
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const updateCategory = createAsyncThunk(
  'categoryManagerment/update_category',
  async (category: ICategory, thunkAPI) => {
    const result = await axios.put<ICategory>(adminUrl + "/" + category.category_id, category, config);
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const getRootCategories = createAsyncThunk('categpryManagement/fetch_rootCategories', async () => {
  return axios.get<any[]>(`api/v1/root-category`);
});

export const delCategory = createAsyncThunk('admin/delete-category', async (category_id: any) => {
  const requestUrl = `${`api/v1/category`}${`/${category_id}`}`;
  const result = await axios.delete(requestUrl)
  return result
});

export const getCategories = createAsyncThunk('admin/categories', async ({ page, size, sort }: IQueryParams) => {
  const requestUrl = `${`api/v1/category`}${`?page=${page}&size=${size}&sort=${sort}`}`;
  const result = axios.get(requestUrl);
  return result
});

export const getCategory = createAsyncThunk(
  'userManagement/fetch_categoryById',
  async (categoryId: string) => {
    const requestUrl = `${adminUrl}/${categoryId}`;
    return axios.get<ICategory>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export type CategoryManagementState = Readonly<typeof initialState>;

export const CategoryManagementSlice = createSlice({
  name: 'categoryManagement',
  initialState: initialState as CategoryManagementState,
  reducers: {
    reset() {
      return initialState;
    },
    resetError(state) {
      return {
        ...state,
        delError: false,
        categoryNameDup: false,
        delSuccess: false,
      };
    },
    resetUpdateMessage(state) {
      return {
        ...state,
        updateError: [],
        errorMessage: null
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getCategories.fulfilled, (state, action) => {
        state.data = action.payload.data.data;
        state.pagination = action.payload.data.pagination;
      })
      .addMatcher(isPending(getCategories), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
      .addMatcher(isRejected(getCategories), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.updateSuccess = false;
        state.errorMessage = action.error.message;
      })
      .addMatcher(isPending(getCategories), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
      .addMatcher(isRejected(getCategories), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.updateSuccess = false;
        state.errorMessage = action.error.message;
      })
      .addMatcher(isFulfilled(createCategory), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.categoryNameDup = (action.payload.data.code === "CATEGORY_DUPLICATE") ? true : false;
        state.updateSuccess = !state.categoryNameDup
        state.category = action.payload.data;
      })
      .addMatcher(isPending(createCategory), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
      .addMatcher(isRejected(createCategory), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.updateSuccess = false;
        state.errorMessage = action.error.message;
      })
      .addMatcher(isFulfilled(getRootCategories), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.rootCategories = action.payload.data;
      })
      .addMatcher(isPending(getRootCategories), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
      .addMatcher(isRejected(getRootCategories), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.updateSuccess = false;
        state.errorMessage = action.error.message;
      })
      .addMatcher(isPending(getCategory), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
      .addMatcher(isFulfilled(getCategory), (state, action) => {
        if (action.payload.data.category_parent) {
          state.isChild = true;
        }
        state.updating = false;
        state.loading = false;
        const category = action.payload.data;
        category.category_name = category.category_child;
        state.category = category;
        state.selected = category.category_parent;
      })
      .addMatcher(isRejected(getCategory), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.updateSuccess = false;
        state.errorMessage = action.error.message;
      })
      .addMatcher(isFulfilled(updateCategory), (state, action) => {
        // state.delError = (action.payload.data.code === "UPDATE_FAIL") ? action.payload.data.data[0] : "";
        if (action.payload.data.code !== "UPDATE_FAIL") {
          state.updating = false;
          state.loading = false;
          state.updateSuccess = true;
        } else {
          state.updating = false;
          state.loading = false;
          state.updateSuccess = false;
          state.updateError = action.payload.data.data
        }
      })
      .addMatcher(isPending(updateCategory), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
      .addMatcher(isRejected(updateCategory), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.updateSuccess = false;
      })
      .addMatcher(isFulfilled(delCategory), (state, action) => {
        state.delError = (action.payload.data.code === "DELETE_FAIL") ? true : false;
        state.updating = false;
        state.loading = false;
        state.updateSuccess = !state.delError;
        state.delSuccess = !state.delError;
      })
      .addMatcher(isPending(delCategory), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
      .addMatcher(isRejected(delCategory), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.updateSuccess = false;
        state.errorMessage = action.error.message;
      })
      ;
  },
});

export const { reset, resetUpdateMessage, resetError } = CategoryManagementSlice.actions;

export default CategoryManagementSlice.reducer;