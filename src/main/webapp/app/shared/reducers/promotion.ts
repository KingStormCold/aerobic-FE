
import axios from 'axios';
import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';
import { Storage } from 'react-jhipster';
import { serializeAxiosError } from './reducer.utils';
import { defaultValue, IPromotion } from './../model/promotion.model';

const initialState = {
  loading: false,
  errorMessage: null,
  updating: false,
  updateSuccess: false,
  successMessage: false,
  totalItems: 0,
  delSuccess: false,
  getSuccess: false,
  promotion: defaultValue,
  isError: false
};

const adminUrl = 'api/v1/promotion';

const AUTH_TOKEN_KEY = 'jhi-authenticationToken';

const token = Storage.local.get(AUTH_TOKEN_KEY) || Storage.session.get(AUTH_TOKEN_KEY);
const config = {
  headers: {
    'Authorization': token,
  }
}

export const getPromotion = createAsyncThunk(
  'promotionManagement/fetch_promotion',
  async (productInfoId: string) => {
    const requestUrl = `${adminUrl}/${productInfoId}`;
    return axios.get<IPromotion>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const createPromotion = createAsyncThunk(
  'promotionManagement/create_promotion',
  async (promotion: IPromotion, thunkAPI) => {
    const result = await axios.post<IPromotion>(adminUrl, promotion, config);
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const updatePromotion = createAsyncThunk(
  'PromotionManagement/update_Promotion',
  async (promotion: IPromotion) => {
    const requestUrl = `${adminUrl}/${promotion.promotion_id}`;
    const result = await axios.put<IPromotion>(requestUrl, promotion, config);
    return result
  },
  { serializeError: serializeAxiosError }
);

export const delPromotion = createAsyncThunk('admin/delete-promotion', async (promotion_id: any) => {
  const requestUrl = `${`api/v1/promotion`}${`/${promotion_id}`}`;
  const result = await axios.delete(requestUrl)
  return result
});

export type PromotionManagementState = Readonly<typeof initialState>;

export const PromotionManagementSlice = createSlice({
  name: 'promotionManagement',
  initialState: initialState as PromotionManagementState,
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
  },

  extraReducers(builder) {
    builder
      .addMatcher(isPending(getPromotion), state => {
        state.errorMessage = null;
        state.loading = true;
      })
      .addMatcher(isFulfilled(getPromotion), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.getSuccess = true;
        state.promotion = action.payload.data;
        state.isError = false;
      })
      .addMatcher(isRejected(getPromotion), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.errorMessage = action.error.message;
        state.isError = true;
      })
      .addMatcher(isPending(createPromotion), state => {
        state.errorMessage = '';
        state.updateSuccess = false;
        state.loading = true;
      })
      .addMatcher(isFulfilled(createPromotion), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.updateSuccess = true;
        state.successMessage = true;
        state.isError = false;
        state.promotion = action.payload.data;
      })
      .addMatcher(isRejected(createPromotion), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.updateSuccess = false;
        state.errorMessage = action.error.message;
        state.isError = true;
      })
      .addMatcher(isPending(updatePromotion), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
      .addMatcher(isFulfilled(updatePromotion), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.updateSuccess = true;
        state.successMessage = true;
        state.isError = false;
      })
      .addMatcher(isRejected(updatePromotion), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.updateSuccess = false;
        state.errorMessage = action.error.message;
        state.isError = true;
      })
      .addMatcher(isFulfilled(delPromotion), (state, action) => {
        state.delSuccess = true;
        state.updating = false;
        state.loading = false;
        state.getSuccess = false;
        state.delSuccess = true;
        state.isError = false;
      })
      .addMatcher(isPending(delPromotion), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
      .addMatcher(isRejected(delPromotion), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.updateSuccess = false;
        state.errorMessage = action.error.message;
        state.isError = true;
      })
      ;
  },
});

export const { reset, resetStatus } = PromotionManagementSlice.actions;

export default PromotionManagementSlice.reducer;