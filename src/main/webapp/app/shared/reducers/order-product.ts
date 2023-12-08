import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';
import axios from 'axios';
import { IDeleteOrderProduct, IOrderProduct, IOrderProductList, IPaidOrderProduct } from '../model/order-product-model';
import { serializeAxiosError } from './reducer.utils';
import { Storage } from 'react-jhipster';
import { IPagination } from '../model/user.model';

const initialState = {
  loading: false,
  errorMessage: null,
  updating: false,
  updateSuccess: false,
  updateFail: false,
  loadingsuccess: false,
  paidSuccess: false,
  paidFail: false,
  deleteSuccess: false,
  deleteFail: false,
  orderProductList: [],
  pagination: null as IPagination,
};

export type OrderProductManagementState = Readonly<typeof initialState>;

const AUTH_TOKEN_KEY = 'jhi-authenticationToken';
const token = Storage.local.get(AUTH_TOKEN_KEY) || Storage.session.get(AUTH_TOKEN_KEY);
const config = {
  headers: {
    Authorization: token,
  },
};

const orderPath = 'api/v1/order-product';
const paidOrderPath = 'api/v1/paid/order-product';

export const getOrderProductList = createAsyncThunk(
  'order-product/fetch_order_product',
  async (orderProduct: IOrderProductList) => {
    const requestUrl = `${orderPath}${`?page=${orderProduct.page}&size=${orderProduct.size}&paid=${orderProduct.paid}`}`;
    return axios.get<any>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const paidOrderProduct = createAsyncThunk(
  'order-product/paid_order_product',
  async (orderProduct: IPaidOrderProduct) => {
    const requestUrl = `${paidOrderPath}${`?id=${orderProduct.id}&paid=${orderProduct.paid}`}`;
    return axios.get<any>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const deleteOrderProduct = createAsyncThunk(
  'order-product/delete_order_product',
  async (orderProduct: IDeleteOrderProduct) => {
    const requestUrl = `${paidOrderPath}${`?id=${orderProduct.id}&delete=${orderProduct.delete}`}`;
    return axios.delete<any>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const createOrderProduct = createAsyncThunk(
  'order-product/create',
  async (orderProduct: IOrderProduct, thunkAPI) => {
    const requestUrl = `${`v1/order-product`}`;
    const result = await axios.post(requestUrl, orderProduct, config);
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const OrderProductManagementSlice = createSlice({
  name: 'orderProductManagement',
  initialState: initialState as OrderProductManagementState,
  reducers: {
    reset() {
      return initialState;
    },
    resetStatus(state) {
      return {
        ...state,
        delSuccess: false,
        updateSuccess: false,
        updateError: false,
        updateFail: false,
        paidSuccess: false,
        paidFail: false,
        loading: false,
        errorMessage: null,
      };
    },
  },
  extraReducers(builder) {
    builder
      .addMatcher(isFulfilled(createOrderProduct), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.updateFail = false;
        state.updateSuccess = true;
      })
      .addMatcher(isPending(createOrderProduct), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
      .addMatcher(isRejected(createOrderProduct), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.updateSuccess = false;
        state.updateFail = true;
        state.errorMessage = action.error.message;
      })
      .addMatcher(isFulfilled(getOrderProductList), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.updateFail = false;
        state.updateSuccess = true;
        state.orderProductList = action.payload.data.data;
        state.pagination = action.payload.data.pagination;
      })
      .addMatcher(isPending(getOrderProductList), (state, action) => {
        state.updating = false;
        state.loading = true;
        state.updateFail = false;
        state.updateSuccess = true;
      })
      .addMatcher(isRejected(getOrderProductList), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.updateSuccess = false;
        state.updateFail = true;
        state.errorMessage = action.error.message;
      })
      .addMatcher(isFulfilled(paidOrderProduct), (state, action) => {
        state.loading = true;
        state.paidSuccess = true;
        state.paidFail = false;
      })
      .addMatcher(isPending(paidOrderProduct), (state, action) => {
        state.loading = true;
        state.paidSuccess = false;
        state.paidFail = false;
      })
      .addMatcher(isRejected(paidOrderProduct), (state, action) => {
        state.loading = true;
        state.paidFail = true;
      })
      .addMatcher(isFulfilled(deleteOrderProduct), (state, action) => {
        state.loading = true;
        state.deleteSuccess = true;
        state.deleteFail = false;
      })
      .addMatcher(isPending(deleteOrderProduct), (state, action) => {
        state.loading = true;
        state.deleteSuccess = false;
        state.deleteFail = false;
      })
      .addMatcher(isRejected(deleteOrderProduct), (state, action) => {
        state.loading = true;
        state.deleteFail = true;
      });
  },
});

export const { reset, resetStatus } = OrderProductManagementSlice.actions;
// Reducer
export default OrderProductManagementSlice.reducer;
