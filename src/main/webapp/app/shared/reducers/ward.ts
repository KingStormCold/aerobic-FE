import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';
import axios from 'axios';
import { IWard } from '../model/ward.model';

const initialState = {
  loading: false,
  errorMessage: null,
  updating: false,
  updateSuccess: false,
  delSuccess: false,
  totalItems: 0,
  data: [] as ReadonlyArray<IWard>,
  wardList: [] as IWard[],
  loadingsuccess: false,
};

export type WardManagementState = Readonly<typeof initialState>;

export const getWard = createAsyncThunk('wardManagement/fetch_Wards', async (districtId: number) => {
  return axios.get<IWard[]>(`/v1/${districtId}/wards`);
});

export const WardManagementSlice = createSlice({
  name: 'wardManagement',
  initialState: initialState as WardManagementState,
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
      .addMatcher(isFulfilled(getWard), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.wardList = action.payload.data;
        state.updateSuccess = true;
      })
      .addMatcher(isPending(getWard), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
      .addMatcher(isRejected(getWard), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.updateSuccess = false;
        state.errorMessage = action.error.message;
      });
  },
});

export const { reset, resetStatus } = WardManagementSlice.actions;
// Reducer
export default WardManagementSlice.reducer;
