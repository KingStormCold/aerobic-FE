
import axios from 'axios';
import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';
import { Storage } from 'react-jhipster';
import { IQueryParams, serializeAxiosError } from './reducer.utils';
import { IPagination } from '../model/user.model';

const initialState = {
  loading: false,
  errorMessage: null,
  updating: false,
  updateSuccess: false,
  successMessage: false,
  totalItems: 0,
  delSuccess: false,
  getSuccess: false,
  isError: false,
  products: [],
  pagination: null as IPagination,
  lowestProducts: [],
  bestsellerProducts: [],
  newestProducts: [],
  displayInSliderCategories: [],
  topProductsByCategory1: [],
  topProductsByCategory2: [],
  topProductsByCategory3: [],
  searchResultProducts: [],
  videos: [],
};

const clientUrl = '/v1/products';

const AUTH_TOKEN_KEY = 'jhi-authenticationToken';

const token = Storage.local.get(AUTH_TOKEN_KEY) || Storage.session.get(AUTH_TOKEN_KEY);
const config = {
  headers: {
    'Authorization': token,
  }
}

export const getProductList = createAsyncThunk(
  'productClient/fetch_product',
  async ({ page, size, categoryId }: any) => {
    const requestUrl = `${clientUrl}${`/${categoryId}?page=${page}&size=${size}`}`;
    return axios.get<any>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const getLowPriceProductList = createAsyncThunk(
  'productClient/fetch_low_price_product',
  async () => {
    const requestUrl = `${clientUrl}${`/discount`}`;
    return axios.get<any>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const getBestsellerProductList = createAsyncThunk(
  'productClient/fetch_bestseller_product',
  async () => {
    const requestUrl = `${clientUrl}${`/bestseller`}`;
    return axios.get<any>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const getNewestProductList = createAsyncThunk(
  'productClient/fetch_newest_product',
  async () => {
    const requestUrl = `${clientUrl}${`/newestproduct`}`;
    return axios.get<any>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const getCategoryDisplayInSlider = createAsyncThunk(
  'productClient/fetch_category_display_in_slider',
  async () => {
    const requestUrl = `${clientUrl}${`/category/display-in-slider`}`;
    return axios.get<any>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const getTopProductByCategory1 = createAsyncThunk(
  'userManagement/fetch_top_product_by_category1',
  async (categoryId: string) => {
    const requestUrl = `${clientUrl}/topproduct/${categoryId}`;
    return axios.get<any>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const getTopProductByCategory2 = createAsyncThunk(
  'userManagement/fetch_top_product_by_category2',
  async (categoryId: string) => {
    const requestUrl = `${clientUrl}/topproduct/${categoryId}`;
    return axios.get<any>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const getTopProductByCategory3 = createAsyncThunk(
  'userManagement/fetch_top_product_by_category3',
  async (categoryId: string) => {
    const requestUrl = `${clientUrl}/topproduct/${categoryId}`;
    return axios.get<any>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const getSearchProductName = createAsyncThunk(
  'userManagement/fetch_search_by_productname',
  // async (search: string) => {
  async ({ page, size, productName }: any) => {
    const requestUrl = `${clientUrl}/search?product_name=${productName}&page=${page}&size=${size}`;
    return axios.get<any>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const getVideoDisplayInSlider = createAsyncThunk(
  'productClient/fetch_video_display_in_slider',
  async () => {
    const requestUrl = `${clientUrl}${`/video_display`}`;
    return axios.get<any>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export type ProductClientState = Readonly<typeof initialState>;

export const ProductClientSlice = createSlice({
  name: 'productManagement',
  initialState: initialState as ProductClientState,
  reducers: {
    reset() {
      return initialState;
    },
    resetTopProduct(state) {
      return {
        ...state,
        topProductsByCategory: [],
      };
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
      .addMatcher(isPending(getProductList), state => {
        state.errorMessage = null;
        state.loading = true;
      })
      .addMatcher(isFulfilled(getProductList), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.getSuccess = true;
        state.products = action.payload.data.data;
        state.pagination = action.payload.data.pagination;
        state.isError = false;
      })
      .addMatcher(isRejected(getProductList), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.errorMessage = action.error.message;
        state.isError = true;
      })

      .addMatcher(isPending(getLowPriceProductList), state => {
        state.errorMessage = null;
        state.loading = true;
      })
      .addMatcher(isFulfilled(getLowPriceProductList), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.getSuccess = true;
        state.lowestProducts = action.payload.data;
        state.isError = false;
      })
      .addMatcher(isRejected(getLowPriceProductList), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.errorMessage = action.error.message;
        state.isError = true;
      })

      .addMatcher(isPending(getBestsellerProductList), state => {
        state.errorMessage = null;
        state.loading = true;
      })
      .addMatcher(isFulfilled(getBestsellerProductList), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.getSuccess = true;
        state.bestsellerProducts = action.payload.data;
        state.isError = false;
      })
      .addMatcher(isRejected(getBestsellerProductList), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.errorMessage = action.error.message;
        state.isError = true;
      })

      .addMatcher(isPending(getNewestProductList), state => {
        state.errorMessage = null;
        state.loading = true;
      })
      .addMatcher(isFulfilled(getNewestProductList), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.getSuccess = true;
        state.newestProducts = action.payload.data;
        state.isError = false;
      })
      .addMatcher(isRejected(getNewestProductList), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.errorMessage = action.error.message;
        state.isError = true;
      })

      .addMatcher(isPending(getCategoryDisplayInSlider), state => {
        state.errorMessage = null;
        state.loading = true;
      })
      .addMatcher(isFulfilled(getCategoryDisplayInSlider), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.getSuccess = true;
        state.displayInSliderCategories = action.payload.data;
        state.isError = false;
      })
      .addMatcher(isRejected(getCategoryDisplayInSlider), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.errorMessage = action.error.message;
        state.isError = true;
      })

      .addMatcher(isPending(getTopProductByCategory1), state => {
        state.errorMessage = null;
        state.loading = true;
      })
      .addMatcher(isFulfilled(getTopProductByCategory1), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.getSuccess = true;
        state.topProductsByCategory1 = action.payload.data;
        state.isError = false;
      })
      .addMatcher(isRejected(getTopProductByCategory1), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.errorMessage = action.error.message;
        state.isError = true;
      })

      .addMatcher(isPending(getTopProductByCategory2), state => {
        state.errorMessage = null;
        state.loading = true;
      })
      .addMatcher(isFulfilled(getTopProductByCategory2), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.getSuccess = true;
        state.topProductsByCategory2 = action.payload.data;
        state.isError = false;
      })
      .addMatcher(isRejected(getTopProductByCategory2), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.errorMessage = action.error.message;
        state.isError = true;
      })

      .addMatcher(isPending(getTopProductByCategory3), state => {
        state.errorMessage = null;
        state.loading = true;
      })
      .addMatcher(isFulfilled(getTopProductByCategory3), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.getSuccess = true;
        state.topProductsByCategory3 = action.payload.data;
        state.isError = false;
      })
      .addMatcher(isRejected(getTopProductByCategory3), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.errorMessage = action.error.message;
        state.isError = true;
      })

      .addMatcher(isPending(getSearchProductName), state => {
        state.errorMessage = null;
        state.loading = true;
      })
      .addMatcher(isFulfilled(getSearchProductName), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.getSuccess = true;
        state.searchResultProducts = action.payload.data.data;
        state.pagination = action.payload.data.pagination;
        state.isError = false;
      })

      .addMatcher(isRejected(getSearchProductName), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.errorMessage = action.error.message;
        state.isError = true;
      })

      .addMatcher(isPending(getVideoDisplayInSlider), state => {
        state.errorMessage = null;
        state.loading = true;
      })
      .addMatcher(isFulfilled(getVideoDisplayInSlider), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.getSuccess = true;
        state.videos = action.payload.data;
        state.isError = false;
      })

      .addMatcher(isRejected(getVideoDisplayInSlider), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.errorMessage = action.error.message;
        state.isError = true;
      })
      ;
  },
});

export const { reset, resetStatus, resetTopProduct } = ProductClientSlice.actions;

export default ProductClientSlice.reducer;