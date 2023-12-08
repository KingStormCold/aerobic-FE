
import axios from 'axios';
import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';
import { Storage } from 'react-jhipster';
import { IQueryParams, serializeAxiosError } from './reducer.utils';
import preferential from './preferential';
import ProductDetailPromotion from 'app/modules/client/product-detail/product-detail-promotion';

const initialState = {
  loading: false,
  errorMessage: null,
  updating: false,
  updateSuccess: false,
  successMessage: false,
  totalItems: 0,
  delSuccess: false,
  getSuccess: false,
  product: null,
  isError: false,
  preferential: null,
  specificationsData : null,
  productInfo : [],
  productInfoDetail: null,
  promotion: null,
  productInfoNow: null,
  productInfoDetailNow: null,
  productDetailInfo: null,
  stateChange: false,
  loadingInfoDetail: false,
  loadingSpec: false,
  loadingProduct: false,
  loadingPreferential: false,
  loadingProductInfo: false,
  loadingPromotion: false,
  priceOriginleft: null,
  priceDiscountleft: null,
};

const clientUrl = '/v1/product-detail';

const AUTH_TOKEN_KEY = 'jhi-authenticationToken';

export const getProductDetailProduct = createAsyncThunk(
  'productDetail/fetch_productDetail',
  async (productId: any) => {
    const requestUrl = clientUrl + `${`/product`}${`/${productId}`}`;
    return axios.get<any>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const getProductDetailPreferential = createAsyncThunk(
  'productDetail/fetch_productPreferential',
  async (productId: any) => {
    const requestUrl = clientUrl + `${`/preferential`}${`/${productId}`}`;
    return axios.get<any>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const getProductDetailSpecification = createAsyncThunk(
  'productDetail/fetch_productSpecification',
  async (productId: any) => {
    const requestUrl = clientUrl + `${`/specification`}${`/${productId}`}`;
    return axios.get<any>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const getProductDetailProductInfo = createAsyncThunk(
  'productDetail/fetch_productProductInfo',
  async (productId: any) => {
    const requestUrl = clientUrl + `${`/product-info`}${`/${productId}`}`;
    return axios.get<any>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const getProductDetailProductDetailInfo = createAsyncThunk(
  'productDetail/fetch_productProductDetailInfo',
  async (productInfoId: any) => {
    const requestUrl = clientUrl + `${`/product-info-detail`}${`/${productInfoId}`}`;
    return axios.get<any>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const getProductDetailPromotion = createAsyncThunk(
  'productDetail/fetch_productPromotion',
  async (productInfoId: any) => {
    const requestUrl = clientUrl + `${`/promotion`}${`/${productInfoId}`}`;
    return axios.get<any>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export type ProductDetailClientState = Readonly<typeof initialState>;

export const ProductDetailClientSlice = createSlice({
  name: 'productDetail',
  initialState: initialState as ProductDetailClientState,
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
    resetAfter(state){
      return {
        ...state,
        // productDetailInfo: null,
        // promotion: null,
        // productInfoDetail: null,
      }
    },
    resetStateChange(state){
      return {
        ...state,
        stateChange: false,
        specificationsData: null,
      }
    },
    changeProductInfo(state, pi){
      return {
        ...state,
        productInfoNow: pi.payload,
      }
    },
    changeProductInfoDetai(state, piDetail){
      return {
        ...state,
        productInfoDetailNow: piDetail.payload,
      }
    },
    resetProductInfo(state){
      return {
        ...state,
        productInfoNow: null,
        productDetailInfos: null,
        promotion: null,
      }
    },
    resetProductInfoDetail(state){
      return {
        ...state,
        productInfoDetailNow: null,
        productDetailInfo: null,
        productInfoNow: null,
      }
    },
  },
  extraReducers(builder) {
    builder
      .addMatcher(isPending(getProductDetailProduct), state => {
        state.errorMessage = null;
        state.loading = true;
        state.stateChange = true;
        state.loadingProduct = true;
        state.productInfoDetailNow = null;
        state.productInfoDetail = null;
      })
      .addMatcher(isFulfilled(getProductDetailProduct), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.getSuccess = true;
        state.product = action.payload.data;
        state.priceOriginleft = action.payload.data.original_price;
        state.priceDiscountleft = action.payload.data.discount_price;
        state.promotion = null;
        state.isError = false;
        state.loadingProduct = false;
      })
      .addMatcher(isRejected(getProductDetailProduct), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.errorMessage = action.error.message;
        state.isError = true;
        state.loadingProduct = false;
      })
      .addMatcher(isPending(getProductDetailPreferential), state => {
        state.errorMessage = null;
        state.loading = true;
        state.loadingPreferential = true;
      })
      .addMatcher(isFulfilled(getProductDetailPreferential), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.getSuccess = true;
        state.preferential = action.payload.data;
        state.isError = false;
        state.loadingPreferential = false;
      })
      .addMatcher(isRejected(getProductDetailPreferential), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.errorMessage = action.error.message;
        state.isError = true;
        state.loadingPreferential = false;
      })
      .addMatcher(isPending(getProductDetailSpecification), state => {
        state.errorMessage = null;
        state.loading = true;
        state.loadingSpec = true;
        state.specificationsData = null;
      })
      .addMatcher(isFulfilled(getProductDetailSpecification), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.getSuccess = true;
        state.specificationsData = action.payload.data;
        state.isError = false;
        state.loadingSpec = false
      })
      .addMatcher(isRejected(getProductDetailSpecification), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.errorMessage = action.error.message;
        state.isError = true;
        state.loadingSpec = false
        state.specificationsData = null;
      })
      .addMatcher(isPending(getProductDetailProductInfo), state => {
        state.errorMessage = null;
        state.loading = true;
        state.loadingProductInfo = true;
        state.productInfoNow = null;
        state.productInfoDetailNow = null;
        state.productInfoDetail = null;
      })
      .addMatcher(isFulfilled(getProductDetailProductInfo), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.getSuccess = true;        
        state.productInfo = action.payload.data.data;
        state.productInfoNow = null;
        for(const product of action.payload.data.data) {
          if(product?.total > 0) {
            state.productInfoNow = product;
            break;
          }
        }
        state.isError = false;
        state.loadingProductInfo = false;
      })
      .addMatcher(isRejected(getProductDetailProductInfo), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.errorMessage = action.error.message;
        state.isError = true;
        state.loadingProductInfo = false;
      })
      .addMatcher(isPending(getProductDetailPromotion), state => {
        state.errorMessage = null;
        state.loading = true;
        state.loadingPromotion = true;
      })
      .addMatcher(isFulfilled(getProductDetailPromotion), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.getSuccess = true;
        state.promotion = action.payload.data;
        state.isError = false;
        state.loadingPromotion = false;
      })
      .addMatcher(isRejected(getProductDetailPromotion), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.errorMessage = action.error.message;
        state.isError = true;
        state.loadingPromotion = false;
      })
      .addMatcher(isPending(getProductDetailProductDetailInfo), state => {
        state.errorMessage = null;
        state.loading = true;
        state.loadingInfoDetail = true;
        state.productInfoDetailNow = null;
        state.productInfoDetail = null;
      })
      .addMatcher(isFulfilled(getProductDetailProductDetailInfo), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.getSuccess = true;
        state.productInfoDetailNow = null;
        state.productDetailInfo = action.payload.data.data;
        for(const productInfoDetail of action.payload.data.data) {
          if(productInfoDetail?.total > 0) {
            state.productInfoDetailNow = productInfoDetail;
            break;
          }
        }
        state.isError = false;
        state.loadingInfoDetail = false;
      })
      .addMatcher(isRejected(getProductDetailProductDetailInfo), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.errorMessage = action.error.message;
        state.isError = true;
        state.loadingInfoDetail = false;
      })
      ;
  },
});

export const { reset, resetStatus, resetAfter, resetStateChange, changeProductInfo, resetProductInfo, changeProductInfoDetai, resetProductInfoDetail } = ProductDetailClientSlice.actions;

export default ProductDetailClientSlice.reducer;