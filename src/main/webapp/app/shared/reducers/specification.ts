
import axios from 'axios';
import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';
import { serializeAxiosError } from 'app/shared/reducers/reducer.utils';
import { Storage } from 'react-jhipster';
import { defaultValue, ISpecificationsFile, defaultValueFile, ISpecificationList } from './../model/specifications.model';

const initialState = {
  loading: false,
  errorMessage: null,
  updating: false,
  updateSuccess: false,
  successAddSpecificationsMessage: false,
  totalItems: 0,
  specifications: defaultValue,
  specificationsFile: defaultValueFile,
  successAddFile: false,
  specificationsData : null,
  falseFileString : "",
  dataSpecifications: [] as ReadonlyArray<ISpecificationList>,
};

const adminUrl = '/api/v1/sprecification';

const AUTH_TOKEN_KEY = 'jhi-authenticationToken';

const token = Storage.local.get(AUTH_TOKEN_KEY) || Storage.session.get(AUTH_TOKEN_KEY);
const config = {
  headers: {
    'Authorization': token,
  }
}

export const getSpecifications = createAsyncThunk(
  'specificationsManagement/fetch_specifications',
  async (productId: string) => {
    const requestUrl = `${adminUrl}/${productId}`;
    return axios.get<any>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const addSpecifications = createAsyncThunk(
  'specificationsManagement/create_specifications',
  async (specificationsFile: ISpecificationsFile, thunkAPI) => {
    const formData = new FormData();
    formData.append("file", specificationsFile.selected_file);
    formData.append("productId", specificationsFile.product_id);
    const result = await axios({
      method: "post",
      url: "/api/v1/sprecification",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    return result;
  },
  { serializeError: serializeAxiosError }
);


export type SpecificationsManagementState = Readonly<typeof initialState>;

export const SpecificationsManagementSlice = createSlice({
  name: 'specificationsManagement',
  initialState: initialState as SpecificationsManagementState,
  reducers: {
    reset() {
      return initialState;
    },
    resetSpecifiaction(state) {
      return {
        ...state,
        successAddFile: false,
        specificationsData: null,
        falseFileString: "",
      }
    }
  },
  extraReducers(builder) {
    builder
      .addMatcher(isPending(getSpecifications), state => {
        state.errorMessage = null;
        state.loading = true;
        state.specificationsData = null;
      })
      .addMatcher(isFulfilled(getSpecifications), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.specificationsData = action.payload.data;
      })
      .addMatcher(isRejected(getSpecifications), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.specificationsData = null;
        state.errorMessage = action.error.message;
      })
      builder
      .addMatcher(isPending(addSpecifications), state => {
        state.errorMessage = null;
        state.loading = true;
      })
      .addMatcher(isFulfilled(addSpecifications), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.successAddFile = true;
      })
      .addMatcher(isRejected(addSpecifications), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.errorMessage = action.error.message;
        state.successAddFile = false;
      })
  },
});

export const { reset, resetSpecifiaction } = SpecificationsManagementSlice.actions;

export default SpecificationsManagementSlice.reducer;