import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';
import axios from 'axios';
import { IDistrict } from '../model/district.model';

const initialState = {
  loading: false,
  errorMessage: null,
  updating: false,
  updateSuccess: false,
  delSuccess: false,
  totalItems: 0,
  data: [] as ReadonlyArray<IDistrict>,
  districtList: [] as IDistrict[],
  loadingsuccess: false,
};

export type DistrictManagementState = Readonly<typeof initialState>;

export const getDistrict = createAsyncThunk('DistrictManagement/fetch_Districts', async (provinceId: number) => {
  return axios.get<IDistrict[]>(`/v1/${provinceId}/districts`);
});

export const DistrictManagementSlice = createSlice({
  name: 'districtManagement',
  initialState: initialState as DistrictManagementState,
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
      .addMatcher(isFulfilled(getDistrict), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.districtList = action.payload.data;
        state.updateSuccess = true;
      })
      .addMatcher(isPending(getDistrict), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
      .addMatcher(isRejected(getDistrict), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.updateSuccess = false;
        state.errorMessage = action.error.message;
      });
  },
});

export const { reset, resetStatus } = DistrictManagementSlice.actions;
// Reducer
export default DistrictManagementSlice.reducer;
