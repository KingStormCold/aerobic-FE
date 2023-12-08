import { createAsyncThunk, createSlice, isPending, isRejected, isFulfilled } from '@reduxjs/toolkit';
import { IPagination } from 'app/shared/model/user.model';
import { IQueryParams, IQueryProductIdParams, serializeAxiosError } from 'app/shared/reducers/reducer.utils';
import axios from 'axios';
import { Storage } from 'react-jhipster';
import { defaultValue, IproductInfo, } from '../model/productInfo.model';

const initialState = {
  loading: false,
  errorMessage: null,
  updating: false,
  updateSuccess: false,
  delSuccess: false,
  totalItems: 0,
  data: [] as ReadonlyArray<IproductInfo>,
  pagination: null as IPagination,
  loadingsuccess: false,
  product: defaultValue,
  productInfos: [] as any[],
  productInfo: defaultValue,
  successMessage: [] as any[],
};

export type ProductInfoManagementState = Readonly<typeof initialState>;

const AUTH_TOKEN_KEY = 'jhi-authenticationToken';

const token = Storage.local.get(AUTH_TOKEN_KEY) || Storage.session.get(AUTH_TOKEN_KEY);
const config = {
  headers: {
    'Authorization': token,
  }
}

export const getProductInfos = createAsyncThunk('admin/productInfos', async ({ productId, page, size, sort }: IQueryProductIdParams) => {
  const requestUrl = `${`api/v1/product-infos`}${`/${productId}?page=${page}&size=${size}&sort=${sort}`}`;
  const result = axios.get(requestUrl);
  return result
});

export const delProductInfo = createAsyncThunk('admin/delete-productinfo', async (product_info_id: any) => {
  const requestUrl = `${`api/v1/product-info`}${`/${product_info_id}`}`;
  const result = await axios.delete(requestUrl)
  return result
});

export const createProductInfo = createAsyncThunk(
  'admin/create-product-info',
  async (product: IproductInfo, thunkAPI) => {
    const requestUrl = `${`api/v1/product-info`}`;
    const result = await axios.post(requestUrl, product, config);
    return result;
  },
  { serializeError: serializeAxiosError }
);

// export const getProductInfo = createAsyncThunk('productInfoManagement/fetch_productInfo', async () => {
//   return axios.get<any[]>(`api/v1/child-category`);
// });

export const getProductInfo = createAsyncThunk(
  'productInfoManagement/fetch_productInfo',
  async (productInfoId: string) => {
    const requestUrl = `api/v1/product-info/${productInfoId}`;
    return axios.get<IproductInfo>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const updateProductInfo = createAsyncThunk(
  'preferentialManagement/update_productInfo',
  async (productInfo: IproductInfo) => {
    const requestUrl = `api/v1/product-info/${productInfo.product_info_id}`;
    const result = await axios.put<IproductInfo>(requestUrl, productInfo, config);
    return result
  },
  { serializeError: serializeAxiosError }
);

export const ProductInfoManagementSlice = createSlice({
  name: 'productInfoManagement',
  initialState: initialState as ProductInfoManagementState,
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
      .addMatcher(isFulfilled(getProductInfos), (state, action) => {
        state.data = action.payload.data.data;
        state.pagination = action.payload.data.pagination;
      })
      .addMatcher(isPending(getProductInfos), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
      .addMatcher(isRejected(getProductInfos), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.updateSuccess = false;
        state.errorMessage = action.error.message;
      })
      .addMatcher(isFulfilled(getProductInfo), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.productInfo = action.payload.data;
      })
      .addMatcher(isPending(getProductInfo), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
      .addMatcher(isRejected(getProductInfo), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.updateSuccess = false;
        state.errorMessage = action.error.message;
      })
      .addMatcher(isFulfilled(createProductInfo), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.product = action.payload.data;
        state.updateSuccess = true;
      })
      .addMatcher(isPending(createProductInfo), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
      .addMatcher(isRejected(createProductInfo), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.updateSuccess = false;
        state.errorMessage = action.error.message;
      })
      .addMatcher(isFulfilled(updateProductInfo), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.product = action.payload.data;
        state.updateSuccess = true;
      })
      .addMatcher(isPending(updateProductInfo), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
      .addMatcher(isRejected(updateProductInfo), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.updateSuccess = false;
        state.errorMessage = action.error.message;
      })
      .addMatcher(isFulfilled(delProductInfo), (state, action) => {
        state.delSuccess = true;
        state.updating = false;
        state.loading = false;
      })
      .addMatcher(isPending(delProductInfo), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
      .addMatcher(isRejected(delProductInfo), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.updateSuccess = false;
        state.errorMessage = action.error.message;
      })
      ;
  },
});

export const { reset, resetStatus } = ProductInfoManagementSlice.actions;
// Reducer
export default ProductInfoManagementSlice.reducer;