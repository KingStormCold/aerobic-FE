import { createAsyncThunk, createSlice, isPending, isRejected, isFulfilled } from '@reduxjs/toolkit';
import { IPagination } from 'app/shared/model/user.model';
import { IQueryParams, IQueryProductIdParams, IQueryProductIdProductInfoIdParams, serializeAxiosError } from 'app/shared/reducers/reducer.utils';
import axios from 'axios';
import { Storage } from 'react-jhipster';
import { defaultValue, IproductInfoDetail } from './../model/productInfoDetail.model';

const initialState = {
  loading: false,
  errorMessage: null,
  updating: false,
  updateSuccess: false,
  delSuccess: false,
  totalItems: 0,
  data: [] as ReadonlyArray<IproductInfoDetail>,
  pagination: null as IPagination,
  loadingsuccess: false,
  productInfoDetail: defaultValue,
  successMessage: [] as any[],
};

export type ProductInfoDetailManagementState = Readonly<typeof initialState>;

const AUTH_TOKEN_KEY = 'jhi-authenticationToken';

const token = Storage.local.get(AUTH_TOKEN_KEY) || Storage.session.get(AUTH_TOKEN_KEY);
const config = {
  headers: {
    'Authorization': token,
  }
}

export const getProductInfoDetails = createAsyncThunk('admin/productInfoDetails', async ({ productId, productInfoId, page, size, sort }: IQueryProductIdProductInfoIdParams) => {
  const requestUrl = `${`api/v1/product-info-details`}${`/${productId}/${productInfoId}?page=${page}&size=${size}&sort=${sort}`}`;
  const result = axios.get(requestUrl);
  return result
});

export const delProductInfoDetail = createAsyncThunk('admin/delete-productInfoDetail', async (product_info_detail_id: any) => {
  const requestUrl = `${`api/v1/product-info-detail`}${`/${product_info_detail_id}`}`;
  const result = await axios.delete(requestUrl)
  return result
});

export const createProductInfoDetail = createAsyncThunk(
  'admin/create-product-info-detail',
  async (productInfoDetail: IproductInfoDetail, thunkAPI) => {
    const requestUrl = `${`api/v1/product-info-detail`}`;
    const result = await axios.post(requestUrl, productInfoDetail, config);
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const getProductInfoDetail = createAsyncThunk(
  'productInfoDetailManagement/fetch_productInfoDetail',
  async (productInfoDetailId: string) => {
    const requestUrl = `api/v1/product-info-detail/${productInfoDetailId}`;
    return axios.get<IproductInfoDetail>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);


export const updateProductInfoDetail = createAsyncThunk(
  'productInfoDetailManagement/update_productInfoDetail',
  async (productInfoDetail: IproductInfoDetail) => {
    const requestUrl = `api/v1/product-info-detail/${productInfoDetail.product_info_detail_id}`;
    const result = await axios.put<IproductInfoDetail>(requestUrl, productInfoDetail, config);
    return result
  },
  { serializeError: serializeAxiosError }
);

export const ProductInfoDetailManagementSlice = createSlice({
  name: 'productInfoDetailManagement',
  initialState: initialState as ProductInfoDetailManagementState,
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
        errorMessage: null
      }
    },
  },
  extraReducers(builder) {
    builder
      .addMatcher(isFulfilled(getProductInfoDetails), (state, action) => {
        state.data = action.payload.data.data;
        state.pagination = action.payload.data.pagination;
      })
      .addMatcher(isPending(getProductInfoDetails), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
      .addMatcher(isRejected(getProductInfoDetails), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.updateSuccess = false;
        state.errorMessage = action.error.message;
      })
      .addMatcher(isFulfilled(getProductInfoDetail), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.productInfoDetail = action.payload.data;
      })
      .addMatcher(isPending(getProductInfoDetail), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
      .addMatcher(isRejected(getProductInfoDetail), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.updateSuccess = false;
        state.errorMessage = action.error.message;
      })
      .addMatcher(isFulfilled(createProductInfoDetail), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.productInfoDetail = action.payload.data;
        state.updateSuccess = true;
      })
      .addMatcher(isPending(createProductInfoDetail), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
      .addMatcher(isRejected(createProductInfoDetail), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.updateSuccess = false;
        state.errorMessage = action.error.message;
      })
      .addMatcher(isFulfilled(updateProductInfoDetail), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.productInfoDetail = action.payload.data;
        state.updateSuccess = true;
      })
      .addMatcher(isPending(updateProductInfoDetail), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
      .addMatcher(isRejected(updateProductInfoDetail), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.updateSuccess = false;
        state.errorMessage = action.error.message;
      })
      .addMatcher(isFulfilled(delProductInfoDetail), (state, action) => {
        state.delSuccess = true;
        state.updating = false;
        state.loading = false;
      })
      .addMatcher(isPending(delProductInfoDetail), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
      .addMatcher(isRejected(delProductInfoDetail), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.updateSuccess = false;
        state.errorMessage = action.error.message;
      });
  },
});

export const { reset, resetStatus } = ProductInfoDetailManagementSlice.actions;
// Reducer
export default ProductInfoDetailManagementSlice.reducer;