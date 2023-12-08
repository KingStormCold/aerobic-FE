import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';
import axios from 'axios';
import { IProvince } from '../model/province.model';

const initialState = {
  loading: false,
  errorMessage: null,
  updating: false,
  updateSuccess: false,
  delSuccess: false,
  totalItems: 0,
  data: [] as ReadonlyArray<IProvince>,
  provinceList: [] as IProvince[],
  loadingsuccess: false,
};

export type ProvinceManagementState = Readonly<typeof initialState>;

export const getProvince = createAsyncThunk('provinceManagement/fetch_provinces', async () => {
  return axios.get<IProvince[]>(`/v1/provinces`);
});

export const ProvinceManagementSlice = createSlice({
  name: 'provinceManagement',
  initialState: initialState as ProvinceManagementState,
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
        errorMessage: null,
      };
    },
  },
  extraReducers(builder) {
    builder
      .addMatcher(isFulfilled(getProvince), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.provinceList = action.payload.data;
        state.updateSuccess = true;
      })
      .addMatcher(isPending(getProvince), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
      .addMatcher(isRejected(getProvince), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.updateSuccess = false;
        state.errorMessage = action.error.message;
      });
  },
});

export const { reset, resetStatus } = ProvinceManagementSlice.actions;
// Reducer
export default ProvinceManagementSlice.reducer;
