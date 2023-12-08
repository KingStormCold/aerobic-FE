
import axios from 'axios';
import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';
import { Storage } from 'react-jhipster';
import { IPreferential, defaultValue } from './../model/preferential.model';
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
  preferentail: defaultValue,
  isError: false
};

const adminUrl = 'api/v1/preferential';

const AUTH_TOKEN_KEY = 'jhi-authenticationToken';

const token = Storage.local.get(AUTH_TOKEN_KEY) || Storage.session.get(AUTH_TOKEN_KEY);
const config = {
  headers: {
    'Authorization': token,
  }
}

export const getPreferential = createAsyncThunk(
  'preferentialManagement/fetch_preferential',
  async (productId: string) => {
    const requestUrl = `${adminUrl}/${productId}`;
    return axios.get<IPreferential>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);


export const createPreferential = createAsyncThunk(
  'preferentialManagement/create_preferential',
  async (preferential: IPreferential, thunkAPI) => {
    const result = await axios.post<IPreferential>(adminUrl, preferential, config);
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const updatePreferential = createAsyncThunk(
  'preferentialManagement/update_preferential',
  async (preferential: IPreferential) => {
    const requestUrl = `${adminUrl}/${preferential.preferential_id}`;
    const result = await axios.put<IPreferential>(requestUrl, preferential, config);
    return result
  },
  { serializeError: serializeAxiosError }
);

export const delPreferential = createAsyncThunk('admin/delete-preferential', async (preferential_id: any) => {
  const requestUrl = `${`api/v1/preferential`}${`/${preferential_id}`}`;
  const result = await axios.delete(requestUrl)
  return result
});

export type CategoryManagementState = Readonly<typeof initialState>;

export const PreferentialManagementSlice = createSlice({
  name: 'categoryManagement',
  initialState: initialState as CategoryManagementState,
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
    }
    ,
  },
  extraReducers(builder) {
    builder
      .addMatcher(isPending(getPreferential), state => {
        state.errorMessage = null;
        state.loading = true;
      })
      .addMatcher(isFulfilled(getPreferential), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.getSuccess = true;
        state.preferentail = action.payload.data;
        state.isError = false;
      })
      .addMatcher(isRejected(getPreferential), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.errorMessage = action.error.message;
        state.isError = true;
      })
      .addMatcher(isPending(createPreferential), state => {
        state.errorMessage = '';
        state.updateSuccess = false;
        state.loading = true;
      })
      .addMatcher(isFulfilled(createPreferential), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.updateSuccess = true;
        state.successMessage = true;
        state.isError = false;
      })
      .addMatcher(isRejected(createPreferential), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.updateSuccess = false;
        state.errorMessage = action.error.message;
        state.isError = true;
      })
      .addMatcher(isPending(updatePreferential), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
      .addMatcher(isFulfilled(updatePreferential), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.updateSuccess = true;
        state.successMessage = true;
        state.isError = false;
      })
      .addMatcher(isRejected(updatePreferential), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.updateSuccess = false;
        state.errorMessage = action.error.message;
        state.isError = true;
      })
      .addMatcher(isFulfilled(delPreferential), (state, action) => {
        state.delSuccess = true;
        state.updating = false;
        state.loading = false;
        state.getSuccess = false;
        state.delSuccess = true;
        state.isError = false;
      })
      .addMatcher(isPending(delPreferential), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
      .addMatcher(isRejected(delPreferential), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.updateSuccess = false;
        state.errorMessage = action.error.message;
        state.isError = true;
      })
      ;
  },
});

export const { reset, resetStatus } = PreferentialManagementSlice.actions;

export default PreferentialManagementSlice.reducer;