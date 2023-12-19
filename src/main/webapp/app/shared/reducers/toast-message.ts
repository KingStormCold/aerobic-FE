import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  isOpen: false,
  message: '',
  isError: false
};

export type ToastMessageState = Readonly<typeof initialState>;

export const ToastMessageSlice = createSlice({
  name: 'ToastMessage',
  initialState: initialState as ToastMessageState,
  reducers: {
    resetToastMessage() {
      return initialState;
    },
    updateStateOpenToastMessage(state, action) {
      return {
        ...state,
        message: action.payload?.message,
        isError: action.payload?.isError,
        isOpen: true
      }
    }
  },
  extraReducers(builder) {
    builder
      ;
  },
});

export const {resetToastMessage, updateStateOpenToastMessage } = ToastMessageSlice.actions;
// Reducer
export default ToastMessageSlice.reducer;
