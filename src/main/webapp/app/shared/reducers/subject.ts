import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
};

export type SubjectState = Readonly<typeof initialState>;

export const SubjectSlice = createSlice({
  name: 'Subject',
  initialState: initialState as SubjectState,
  reducers: {
    resetSubject() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder

      ;
  },
});

export const { resetSubject } = SubjectSlice.actions;
// Reducer
export default SubjectSlice.reducer;
