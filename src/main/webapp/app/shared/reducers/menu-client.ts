
import axios from 'axios';
import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';
import { Storage } from 'react-jhipster';
// import { ICategoryClient, defaultValue } from './../model/category-client.model';
import { serializeAxiosError } from './reducer.utils';

const initialState = {
  loading: false,
  errorMessage: null,
  updating: false,
  updateSuccess: false,
  successMessage: false,
  totalItems: 0,
  delSuccess: false,
  getSuccess: false,
  category: null,
  isError: false,
  reloadData: false,
  categoryNow: null,
};

const clientUrl = 'v1/category';

const AUTH_TOKEN_KEY = 'jhi-authenticationToken';

const token = Storage.local.get(AUTH_TOKEN_KEY) || Storage.session.get(AUTH_TOKEN_KEY);
const config = {
  headers: {
    'Authorization': token,
  }
}

export const getCategory = createAsyncThunk(
  'categoryClient/fetch_categort',
  async () => {
    const requestUrl = `${clientUrl}`;
    return axios.get<any>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export type CategoryClientState = Readonly<typeof initialState>;

export const CategoryClientSlice = createSlice({
  name: 'categoryManagement',
  initialState: initialState as CategoryClientState,
  reducers: {
    reset() {
      return initialState;
    },
    resetStatus(state) {
      return {
        ...state,
        successMessage: false,
        delSuccess: false,
        getSuccess: false,

      }
    },
    updateReloadData(state, action) {
      return {
        ...state,
        reloadData: action.payload.isReload,
      };
    },
    chooseCategory(state, category) {
      return {
        ...state,
        categoryNow: category.payload,
      }
    },
  },
  extraReducers(builder) {
    builder
      .addMatcher(isPending(getCategory), state => {
        state.errorMessage = null;
        state.loading = true;
      })
      .addMatcher(isFulfilled(getCategory), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.getSuccess = true;
        state.category = action.payload.data;
        state.isError = false;
      })
      .addMatcher(isRejected(getCategory), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.errorMessage = action.error.message;
        state.isError = true;
      })
      ;
  },
});

export const { reset, resetStatus, updateReloadData, chooseCategory } = CategoryClientSlice.actions;

export default CategoryClientSlice.reducer;