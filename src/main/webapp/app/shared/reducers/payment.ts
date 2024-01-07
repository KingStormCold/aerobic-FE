import { createAsyncThunk, createSlice, isPending, isFulfilled, isRejected } from '@reduxjs/toolkit';
import axios from 'axios';
import { URL_PATH } from 'app/config/path';
import { serializeAxiosError } from './reducer.utils';
import { IPaymentDetail, ICourseData, IPayment } from '../model/payment';

const initialState = {
  loading: false,
  totalPage: 0,
  pageNum: 0,
  payments: [] as ReadonlyArray<IPayment>,
  paymentsErrorMessage: '',
  // courses: [] as ReadonlyArray<ICourseData>,
  // updatePaymentSuccess: false,
  // updatePaymentErrorMessage: '',
  // payment: {} as IPaymentDetail,

};

export type PaymentState = Readonly<typeof initialState>;

export const getPayments = createAsyncThunk(
  'admin/get-payments',
  async (page: number) => {
    return await axios.get<any>(`${URL_PATH.API.GET_PAYMENT}?page=${page}`);
  },
  {
    serializeError: serializeAxiosError,
  }
);

// export const getDetailPayments = createAsyncThunk(
//     'admin/get-detail-payments',
//     async (data: { requestBody: IPaymentDetail; id: number }) => {
//         return await axios.get<any>(`${URL_PATH.API.GET_DETAIL_PAYMENT}/${data.id}`);
//     },
//     {
//         serializeError: serializeAxiosError,
//     }
//     );

export const PaymentSlice = createSlice({
  name: 'Payment',
  initialState: initialState as PaymentState,
  reducers: {
    resetPayment() {
      return initialState;
    },
    updateStatePayment(state, action) {
      return {
        ...state,
        payment: action.payload,
      };
    }
  },

  extraReducers(builder) {
    builder
      .addMatcher(isFulfilled(getPayments), (state, action) => {
        state.loading = false;
        state.payments = action.payload.data?.payments;
        state.totalPage = action.payload.data?.totalPage;
        state.pageNum = action.payload.data?.pageNum;
      })
      .addMatcher(isPending(getPayments), (state, action) => {
        state.loading = true;
        state.paymentsErrorMessage = '';
      })
      .addMatcher(isRejected(getPayments), (state, action) => {
        state.loading = false;
        const httpStatusCode = action.error['response']?.status;
        state.paymentsErrorMessage = httpStatusCode !== 200 ? action.error['response']?.data?.error_message : '';
      })
    // .addMatcher(isFulfilled(getDetailPayments), (state, action) => {
    //   state.loading = false;
    //   state.updatePaymentSuccess = true;
    // })
    // .addMatcher(isPending(getDetailPayments), (state, action) => {
    //   state.loading = true;
    //   state.updatePaymentErrorMessage = '';
    //   state.updatePaymentSuccess = false;
    // })
    // .addMatcher(isRejected(getDetailPayments), (state, action) => {
    //   state.loading = false;
    //   const httpStatusCode = action.error['response']?.status;
    //   state.updatePaymentErrorMessage = httpStatusCode !== 200 ? action.error['response']?.data?.error_message : '';
    // })
  },
});

export const { resetPayment, updateStatePayment } = PaymentSlice.actions;
// Reducer
export default PaymentSlice.reducer;
