import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';
import { AppThunk } from 'app/config/store';

export const changeName = createAsyncThunk('name', async (name: any) => {
  const menu_name = await name;
  return menu_name;
});

export const changeLink = createAsyncThunk('link', async (link: any) => {
  const menu_link = await link;
  return menu_link;
});

export const changeName2 = createAsyncThunk('name2', async (name: any) => {
  const menu_name = await name;
  return menu_name;
});

export const changeLink2 = createAsyncThunk('link2', async (link: any) => {
  const menu_link = await link;
  return menu_link;
});

export const changeName3 = createAsyncThunk('name3', async (name: any) => {
  const menu_name = await name;
  return menu_name;
});

export const changeLink3 = createAsyncThunk('link3', async (link: any) => {
  const menu_link = await link;
  return menu_link;
});

export const changeName4 = createAsyncThunk('name4', async (name: any) => {
  const menu_name = await name;
  return menu_name;
});

export const changeLink4 = createAsyncThunk('link4', async (link: any) => {
  const menu_link = await link;
  return menu_link;
});

export const changeName5 = createAsyncThunk('name5', async (name: any) => {
  const menu_name = await name;
  return menu_name;
});

export const changeLink5 = createAsyncThunk('link5', async (link: any) => {
  const menu_link = await link;
  return menu_link;
});

export const changeName6 = createAsyncThunk('name6', async (name: any) => {
  const menu_name = await name;
  return menu_name;
});

export const changeLink6 = createAsyncThunk('link6', async (link: any) => {
  const menu_link = await link;
  return menu_link;
});

const initialState = {
  headerName: "",
  menuLink: "",
  headerName2: "",
  menuLink2: "",
  headerName3: "",
  menuLink3: "",
  headerName4: "",
  menuLink4: "",
  headerName5: "",
  menuLink5: "",
  headerName6: "",
  menuLink6: "",
};

export type MenuState = Readonly<typeof initialState>;


export const MenuSlice = createSlice({
  name: 'menu',
  initialState: initialState as MenuState,
  reducers: {

    resetMenuLink() {
      return initialState;
    },
    // changelink(state, action) {
    //   return state.headerName = action.payload
    // },

  },
  extraReducers(builder) {
    builder
      // .addCase(changeName.fulfilled, (state, action) => {
      //   state.headerName = action.payload
      // })
      .addMatcher(isFulfilled(changeName), (state, action) => {
        state.headerName = action.payload;
      })

      .addMatcher(isFulfilled(changeLink), (state, action) => {
        state.menuLink = action.payload;
      })

      .addMatcher(isFulfilled(changeName2), (state, action) => {
        state.headerName2 = action.payload;
      })

      .addMatcher(isFulfilled(changeLink2), (state, action) => {
        state.menuLink2 = action.payload;
      })

      .addMatcher(isFulfilled(changeName3), (state, action) => {
        state.headerName3 = action.payload;
      })

      .addMatcher(isFulfilled(changeLink3), (state, action) => {
        state.menuLink3 = action.payload;
      })

      .addMatcher(isFulfilled(changeName4), (state, action) => {
        state.headerName4 = action.payload;
      })

      .addMatcher(isFulfilled(changeLink4), (state, action) => {
        state.menuLink4 = action.payload;
      })

      .addMatcher(isFulfilled(changeName5), (state, action) => {
        state.headerName5 = action.payload;
      })

      .addMatcher(isFulfilled(changeLink5), (state, action) => {
        state.menuLink5 = action.payload;
      })
      .addMatcher(isFulfilled(changeName6), (state, action) => {
        state.headerName6 = action.payload;
      })

      .addMatcher(isFulfilled(changeLink6), (state, action) => {
        state.menuLink6 = action.payload;
      })
  }
});


// Reducer
export default MenuSlice.reducer;

export const { resetMenuLink } = MenuSlice.actions;