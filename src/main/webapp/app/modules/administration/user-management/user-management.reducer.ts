import axios from 'axios';
import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';

import { IUser, defaultValue } from 'app/shared/model/user.model';
import { IQueryParams, serializeAxiosError } from 'app/shared/reducers/reducer.utils';
import { Storage } from 'react-jhipster';

const initialState = {
  loading: false,
  errorMessage: null,
  users: [] as ReadonlyArray<IUser>,
  authorities: [] as any[],
  user: defaultValue,
  updating: false,
  updateSuccess: false,
  totalItems: 0,
};

const apiUrl = 'api/users';
const adminUrl = 'api/v1/user';

// Async Actions

export const getUsers = createAsyncThunk('userManagement/fetch_users', async ({ page, size, sort }: IQueryParams) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return axios.get<IUser[]>(requestUrl);
});

export const getUsersAsAdmin = createAsyncThunk('userManagement/fetch_users_as_admin', async ({ page, size, sort }: IQueryParams) => {
  const requestUrl = `${adminUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return axios.get<IUser[]>(requestUrl);
});

export const getRoles = createAsyncThunk('userManagement/fetch_roles', async () => {
  return axios.get<any[]>(`api/v1/role/find-all`);
});

export const getUser = createAsyncThunk(
  'userManagement2/fetch_user',
  async (user_name: string) => {
    const requestUrl = `${adminUrl}/${user_name}`;
    return axios.get<IUser>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);


const AUTH_TOKEN_KEY = 'jhi-authenticationToken';

const token = Storage.local.get(AUTH_TOKEN_KEY) || Storage.session.get(AUTH_TOKEN_KEY);
const config = {
  headers: {
    'Authorization': token,
  }
}

export const createUser = createAsyncThunk(
  'userManagement2/create_user',
  async (user: IUser, thunkAPI) => {
    const result = await axios.post<IUser>(adminUrl, user, config);
    // thunkAPI.dispatch(getUsersAsAdmin({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const updateUser = createAsyncThunk(
  'userManagement2/update_user',
  async (user: IUser, thunkAPI) => {
    if (user?.roles[0].role_id) {
      user.roles = ["USER"];
    }
    const result = await axios.put<IUser>(adminUrl + '/' + user.user_name, user, config);
    // thunkAPI.dispatch(getUsersAsAdmin({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const deleteUser = createAsyncThunk(
  'userManagement2/delete_user',
  async (id: string, thunkAPI) => {
    const requestUrl = `${adminUrl}/${id}`;
    const result = await axios.delete<IUser>(requestUrl);
    thunkAPI.dispatch(getUsersAsAdmin({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);

export type UserManagementState = Readonly<typeof initialState>;



export const UserManagementSlice = createSlice({
  name: 'userManagement2',
  initialState: initialState as UserManagementState,
  reducers: {
    reset() {
      return initialState;
    },
    updateUserHandle(state, action) {
      return {
        ...state,
        updateSuccess: action.payload,
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getRoles.fulfilled, (state, action) => {
        state.authorities = action.payload.data;
      })
      // .addCase(getUser.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.user = action.payload.data;
      // })
      // .addCase(deleteUser.fulfilled, state => {
      //   state.updating = false;
      //   state.updateSuccess = true;
      //   state.user = defaultValue;
      // })
      // .addMatcher(isFulfilled(getUsers, getUsersAsAdmin), (state, action) => {
      //   state.loading = false;
      //   state.users = action.payload.data;
      //   state.totalItems = parseInt(action.payload.headers['x-total-count'], 10);
      // })
      .addMatcher(isFulfilled(createUser, updateUser), (state, action) => {

        state.updating = false;
        state.loading = false;
        state.updateSuccess = true;
        state.user = action.payload.data;
      })
      .addMatcher(isFulfilled(getUser), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.updateSuccess = false;
        state.user = action.payload.data;
      })
      .addMatcher(isPending(createUser, updateUser, getUser), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.updating = true;
      })
      .addMatcher(isRejected(getUser, getRoles), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.updateSuccess = false;
        state.errorMessage = action.error.message;
      });
  },
});

export const { reset, updateUserHandle } = UserManagementSlice.actions;

// Reducer
export default UserManagementSlice.reducer;
