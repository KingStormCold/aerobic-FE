import axios from 'axios';
import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';
import { IQueryParams, serializeAxiosError } from 'app/shared/reducers/reducer.utils';
import { IUser, defaultValue, IPagination } from 'app/shared/model/user.model';
import { Storage } from 'react-jhipster';

export const getUsers = createAsyncThunk('admin/users', async ({ page, size, sort }: IQueryParams) => {
  const requestUrl = `${`api/v1/users`}${`?page=${page}&size=${size}&sort=${sort}`}`;
  const result = axios.get(requestUrl);
  return result
});

export const delUser = createAsyncThunk('admin/users', async (user_name: any) => {
  const requestUrl = `${`api/v1/user`}${`/${user_name}`}`;
  const result = axios.delete(requestUrl);
  return result
});

const initialState = {
  loading: false,
  errorMessage: null,
  updating: false,
  updateSuccess: false,
  totalItems: 0,
  data: [] as ReadonlyArray<IUser>,
  pagination: null as IPagination,
  authorities: [] as any[],
  user: defaultValue,
  loadingsuccess: false,
  userDuplicate: false,
};

const apiUrl = 'api/users';
const adminUrl = 'api/v1/user';

export type UserManagementState = Readonly<typeof initialState>;

export const getRoles = createAsyncThunk('userManagement/fetch_roles', async () => {
  return axios.get<any[]>(`api/v1/role/find-all`);
});


const AUTH_TOKEN_KEY = 'jhi-authenticationToken';

const token = Storage.local.get(AUTH_TOKEN_KEY) || Storage.session.get(AUTH_TOKEN_KEY);
const config = {
  headers: {
    'Authorization': token,
  }
}

export const createUser = createAsyncThunk(
  'userManagement/create_user',
  async (user: IUser, thunkAPI) => {
    user.user_name.toLowerCase
    const result = await axios.post<IUser>(adminUrl, user, config);
    // thunkAPI.dispatch(getUsersAsAdmin({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const updateUser = createAsyncThunk(
  'userManagement/update_user',
  async (user: IUser, thunkAPI) => {
    if (user?.roles[0]?.role_id) {
      user.roles = ["USER"];
    }
    const result = await axios.put<IUser>(adminUrl + '/' + user.user_name, user, config);
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const getUser = createAsyncThunk(
  'userManagement/fetch_user',
  async (user_name: string) => {
    const requestUrl = `${adminUrl}/${user_name}`;
    return axios.get<IUser>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const UserManagementSlice = createSlice({
  name: 'userManagement',
  initialState: initialState as UserManagementState,
  reducers: {
    resetError(state) {
      return {
        ...state,
        userDuplicate: false,
      };
    },
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
      .addCase(getUsers.fulfilled, (state, action) => {
        state.data = action.payload.data.data;
        state.pagination = action.payload.data.pagination;
      })
      .addMatcher(isPending(getUsers), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
      .addMatcher(isRejected(getUsers), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.updateSuccess = false;
        state.errorMessage = action.error.message;
      })
      .addMatcher(isFulfilled(delUser), (state, action) => {
        return {
          ...state,
        };
      })
      .addMatcher(isPending(delUser), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
      .addMatcher(isRejected(delUser), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.updateSuccess = false;
        state.errorMessage = action.error.message;
      })
      .addMatcher(isFulfilled(getRoles), (state, action) => {
        state.authorities = action.payload.data;
        state.loading = false;
        state.loadingsuccess = true;
      })
      .addMatcher(isFulfilled(createUser, updateUser), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.userDuplicate = (action.payload.data.code === "USER_DUPLICATE") ? true : false;
        state.updateSuccess = !state.userDuplicate;
        state.user = action.payload.data;
      })
      .addMatcher(isFulfilled(getUser), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.loadingsuccess = true;
        state.updateSuccess = false;
        state.user = action.payload.data;
      })
      .addMatcher(isPending(createUser, updateUser), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loadingsuccess = false;
        state.updating = true;
      })
      .addMatcher(isPending(getUser), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loadingsuccess = false;
        state.updating = true;
        state.user = defaultValue;
      })
      .addMatcher(isPending(getRoles), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loadingsuccess = false;
        state.updating = true;
      })
      .addMatcher(isRejected(getUser, getRoles), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.updateSuccess = false;
        state.loadingsuccess = false;
        state.errorMessage = action.error.message;
      });
    ;
  },
});

export const { reset, updateUserHandle, resetError } = UserManagementSlice.actions;
// Reducer
export default UserManagementSlice.reducer;