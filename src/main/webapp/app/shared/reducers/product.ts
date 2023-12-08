import { createAsyncThunk, createSlice, isPending, isRejected, isFulfilled } from '@reduxjs/toolkit';
import { IPagination } from 'app/shared/model/user.model';
import { IQueryParams, serializeAxiosError } from 'app/shared/reducers/reducer.utils';
import axios from 'axios';
import { Storage } from 'react-jhipster';
import { defaultValue, IProduct } from './../model/product.model';

const initialState = {
  loading: false,
  errorMessage: null,
  updating: false,
  updateSuccess: false,
  delSuccess: false,
  totalItems: 0,
  data: [] as ReadonlyArray<IProduct>,
  pagination: null as IPagination,
  loadingsuccess: false,
  product: defaultValue,
  childCategories: [] as any[],
  successMessage: [] as any[],
};

const adminUrl = 'api/v1/product';

export type ProductManagementState = Readonly<typeof initialState>;

export const getProducts = createAsyncThunk('admin/products', async ({ page, size, sort }: IQueryParams) => {
  const requestUrl = `${`api/v1/products`}${`?page=${page}&size=${size}&sort=${sort}`}`;
  const result = axios.get(requestUrl);
  return result
});

export const delProduct = createAsyncThunk('admin/delete-product', async (product_id: any) => {
  const requestUrl = `${`api/v1/product`}${`/${product_id}`}`;
  const result = await axios.delete(requestUrl)
  return result
});

export const createProduct = createAsyncThunk(
  'admin/create-product',
  async (product: IProduct, thunkAPI) => {
    const requestUrl = `${`api/v1/product`}`;
    product.user_name = "admin";
    const result = await axios.post(requestUrl, product, config);
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const getProduct = createAsyncThunk(
  'userManagement/fetch_productById',
  async (productId: string) => {
    const requestUrl = `${adminUrl}/${productId}`;
    return axios.get<IProduct>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const updateProduct = createAsyncThunk(
  'admin/update-product',
  async (product: IProduct, thunkAPI) => {
    const result = await axios.put<IProduct>(adminUrl + "/" + product.product_id, product, config);
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const getChildCategories = createAsyncThunk('categpryManagement/fetch_childCategories', async () => {
  return axios.get<any[]>(`api/v1/child-category`);
});

const AUTH_TOKEN_KEY = 'jhi-authenticationToken';

const token = Storage.local.get(AUTH_TOKEN_KEY) || Storage.session.get(AUTH_TOKEN_KEY);
const config = {
  headers: {
    'Authorization': token,
  }
}

export const ProductManagementSlice = createSlice({
  name: 'productManagement',
  initialState: initialState as ProductManagementState,
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
      .addCase(getProducts.fulfilled, (state, action) => {
        state.data = action.payload.data.data;
        state.pagination = action.payload.data.pagination;
      })
      .addMatcher(isPending(getProducts), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
      .addMatcher(isRejected(getProducts), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.updateSuccess = false;
        state.errorMessage = action.error.message;
      })
      .addMatcher(isFulfilled(getChildCategories), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.childCategories = action.payload.data;
      })
      .addMatcher(isPending(getChildCategories), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
      .addMatcher(isRejected(getChildCategories), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.updateSuccess = false;
        state.errorMessage = action.error.message;
      })
      .addMatcher(isFulfilled(createProduct), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.product = action.payload.data;
        state.updateSuccess = true;
      })
      .addMatcher(isPending(createProduct), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
      .addMatcher(isRejected(createProduct), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.updateSuccess = false;
        state.errorMessage = action.error.message;
      })
      .addMatcher(isFulfilled(updateProduct), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.product = action.payload.data;
        state.updateSuccess = true;
      })
      .addMatcher(isPending(updateProduct), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
      .addMatcher(isRejected(updateProduct), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.updateSuccess = false;
        state.errorMessage = action.error.message;
      })
      .addMatcher(isFulfilled(delProduct), (state, action) => {
        state.delSuccess = true;
        state.updating = false;
        state.loading = false;
      })
      .addMatcher(isPending(delProduct), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
      .addMatcher(isRejected(delProduct), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.updateSuccess = false;
        state.errorMessage = action.error.message;
      })
      .addMatcher(isPending(getProduct), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
      .addMatcher(isFulfilled(getProduct), (state, action) => {
        state.updating = false;
        state.loading = false;
        const product = action.payload.data;
        state.product = product;
      })
      .addMatcher(isRejected(getProduct), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.updateSuccess = false;
        state.errorMessage = action.error.message;
      })
      ;
  },
});

export const { reset, resetStatus } = ProductManagementSlice.actions;
// Reducer
export default ProductManagementSlice.reducer;