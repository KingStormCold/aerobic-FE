import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: ''
};

export type CategoryShowState = Readonly<typeof initialState>;

export const CategoryShowSlice = createSlice({
  name: 'CategoryShow',
  initialState: initialState as CategoryShowState,
  reducers: {
    resetCategoryShow() {
      return initialState;
    },
    updateStateTitle(state, action) {
      return {
        ...state,
        title: action.payload
      }
    }
  },
  extraReducers(builder) {
    builder

      ;
  },
});

export const { resetCategoryShow, updateStateTitle } = CategoryShowSlice.actions;
// Reducer
export default CategoryShowSlice.reducer;
