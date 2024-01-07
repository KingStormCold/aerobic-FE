import { createAsyncThunk, createSlice, isPending, isFulfilled, isRejected } from '@reduxjs/toolkit';
import axios from 'axios';
import { Storage } from 'react-jhipster';
import { IQueryParams, serializeAxiosError } from './reducer.utils';
import { URL_PATH } from 'app/config/path';
import { IUser, ICreateUser, IUpdateUser, IRoleDetail, IRegisterUser } from '../model/user';

const initialState = {
  loading: false,
  totalPage: 0,
  pageNum: 0,
  users: [] as ReadonlyArray<IUser>,
  usersErrorMessage: '',
  deleteUserSuccess: false,
  deleteUserErrorMessage: '',
  roles: [] as ReadonlyArray<IRoleDetail>,
  rolesErrorMessage: '',
  createUserSuccess: false,
  createUserErrorMessage: '',
  updateUserSuccess: false,
  updateUserErrorMessage: '',
  user: {} as IUser,
  registerUserSuccess: false,
  registerUserErrorMessgae: '',
  changePassSuccess: false,
  changePassErrorMessage: '',
  checkUUIDSuccess: false,
  userCheckUUID: {} as { id: number, email: string },
  changePasswordForgotSuccess: false,
  changePasswordForgotErrorMessage: ''
};

export type UserState = Readonly<typeof initialState>;

export const getUsers = createAsyncThunk(
  'admin/get-users',
  async (page: number) => {
    return await axios.get<any>(`${URL_PATH.API.GET_USER}?page=${page}`);
  },
  {
    serializeError: serializeAxiosError,
  }
);

export const getRoles = createAsyncThunk(
  'admin/get-roles',
  async () => {
    return await axios.get<any>(`${URL_PATH.API.GET_ROLES_USER}`);
  },
  {
    serializeError: serializeAxiosError,
  }
);

export const createUser = createAsyncThunk(
  'admin/create-user',
  async (data: ICreateUser) => {
    return await axios.post<any>(`${URL_PATH.API.USER}`, data);
  },
  {
    serializeError: serializeAxiosError,
  }
);

export const updateUser = createAsyncThunk(
  'admin/update-user',
  async (data: { requestBody: IUpdateUser; id: number }) => {
    return await axios.put<any>(`${URL_PATH.API.USER}/${data.id}`, data.requestBody);
  },
  {
    serializeError: serializeAxiosError,
  }
);

export const deleteUser = createAsyncThunk(
  'admin/delete-user',
  async (id: string) => {
    return await axios.delete<any>(`${URL_PATH.API.USER}/${id}`);
  },
  {
    serializeError: serializeAxiosError,
  }
);

export const registerUser = createAsyncThunk(
  'client/register-user',
  async (data: IRegisterUser) => {
    return await axios.post<any>(`${URL_PATH.API.REGISTER_USER}`, data);
  },
  {
    serializeError: serializeAxiosError,
  }
);

export const changePass = createAsyncThunk(
  'client/change-pass',
  async (data: { old_password: string; new_password: string; new_password_confirmation: string }) => {
    return await axios.post<any>(`${URL_PATH.API.CHANGE_PASS}`, data);
  },
  {
    serializeError: serializeAxiosError,
  }
);

export const checkUuid = createAsyncThunk(
  'client/check-uuid',
  async (uuid: string) => {
    return await axios.get<any>(`${URL_PATH.API.CHECK_UUID}/${uuid}`);
  },
  {
    serializeError: serializeAxiosError,
  }
);

export const changePasswordForgot = createAsyncThunk(
  'client/change-password-forgot',
  async (data: { email: string, password: string, uuid: string }) => {
    return await axios.post<any>(`${URL_PATH.API.CHANGE_PASSWORD_FORGOT}`, data);
  },
  {
    serializeError: serializeAxiosError,
  }
);

export const UserSlice = createSlice({
  name: 'User',
  initialState: initialState as UserState,
  reducers: {
    resetUser() {
      return initialState;
    },
    updateStateUser(state, action) {
      return {
        ...state,
        user: action.payload,
      };
    },
  },
  extraReducers(builder) {
    builder
      .addMatcher(isFulfilled(getUsers), (state, action) => {
        state.loading = false;
        state.users = action.payload.data?.users;
        state.totalPage = action.payload.data?.totalPage;
        state.pageNum = action.payload.data?.pageNum;
      })
      .addMatcher(isPending(getUsers), (state, action) => {
        state.loading = true;
        state.usersErrorMessage = '';
      })
      .addMatcher(isRejected(getUsers), (state, action) => {
        state.loading = false;
        const httpStatusCode = action.error['response']?.status;
        state.usersErrorMessage = httpStatusCode !== 200 ? action.error['response']?.data?.error_message : '';
      })
      .addMatcher(isFulfilled(deleteUser), (state, action) => {
        state.loading = false;
        state.deleteUserSuccess = true;
      })
      .addMatcher(isPending(deleteUser), (state, action) => {
        state.loading = true;
        state.deleteUserSuccess = false;
        state.deleteUserErrorMessage = '';
      })
      .addMatcher(isRejected(deleteUser), (state, action) => {
        state.loading = false;
        const httpStatusCode = action.error['response']?.status;
        state.deleteUserErrorMessage = httpStatusCode !== 200 ? action.error['response']?.data?.error_message : '';
      })
      .addMatcher(isFulfilled(getRoles), (state, action) => {
        state.loading = false;
        state.roles = action.payload.data?.roles;
      })
      .addMatcher(isPending(getRoles), (state, action) => {
        state.loading = true;
        state.rolesErrorMessage = '';
      })
      .addMatcher(isRejected(getRoles), (state, action) => {
        state.loading = false;
        const httpStatusCode = action.error['response']?.status;
        state.rolesErrorMessage = httpStatusCode !== 200 ? action.error['response']?.data?.error_message : '';
      })
      .addMatcher(isFulfilled(createUser), (state, action) => {
        state.loading = false;
        state.createUserSuccess = true;
      })
      .addMatcher(isPending(createUser), (state, action) => {
        state.loading = true;
        state.createUserErrorMessage = '';
        state.createUserSuccess = false;
      })
      .addMatcher(isRejected(createUser), (state, action) => {
        state.loading = false;
        const httpStatusCode = action.error['response']?.status;
        state.createUserErrorMessage = httpStatusCode !== 200 ? action.error['response']?.data?.error_message : '';
      })
      .addMatcher(isFulfilled(updateUser), (state, action) => {
        state.loading = false;
        state.updateUserSuccess = true;
      })
      .addMatcher(isPending(updateUser), (state, action) => {
        state.loading = true;
        state.updateUserErrorMessage = '';
        state.updateUserSuccess = false;
      })
      .addMatcher(isRejected(updateUser), (state, action) => {
        state.loading = false;
        const httpStatusCode = action.error['response']?.status;
        state.updateUserErrorMessage = httpStatusCode !== 200 ? action.error['response']?.data?.error_message : '';
      })
      .addMatcher(isFulfilled(registerUser), (state, action) => {
        state.loading = false;
        state.registerUserSuccess = true;
      })
      .addMatcher(isPending(registerUser), (state, action) => {
        state.loading = true;
        state.registerUserSuccess = false;
        state.registerUserErrorMessgae = '';
      })
      .addMatcher(isRejected(registerUser), (state, action) => {
        state.loading = false;
        const httpStatusCode = action.error['response']?.status;
        state.registerUserErrorMessgae = httpStatusCode !== 200 ? action.error['response']?.data?.error_message : '';
      })

      .addMatcher(isFulfilled(changePass), (state, action) => {
        state.loading = false;
        state.changePassSuccess = true;
      })
      .addMatcher(isPending(changePass), (state, action) => {
        state.loading = true;
        state.changePassSuccess = false;
        state.changePassErrorMessage = '';
      })
      .addMatcher(isRejected(changePass), (state, action) => {
        state.loading = false;
        const httpStatusCode = action.error['response']?.status;
        state.changePassErrorMessage = httpStatusCode !== 200 ? action.error['response']?.data?.error_message : '';
      })
      .addMatcher(isFulfilled(checkUuid), (state, action) => {
        state.loading = false;
        state.checkUUIDSuccess = true;
        state.userCheckUUID = action.payload.data?.user;
      })
      .addMatcher(isPending(checkUuid), (state, action) => {
        state.loading = true;
        state.checkUUIDSuccess = false;
        state.userCheckUUID = {} as { id: number, email: string }
      })
      .addMatcher(isRejected(checkUuid), (state, action) => {
        state.loading = false;
      })
      .addMatcher(isFulfilled(changePasswordForgot), (state, action) => {
        state.loading = false;
        state.changePasswordForgotSuccess = true;
      })
      .addMatcher(isPending(changePasswordForgot), (state, action) => {
        state.loading = true;
        state.changePasswordForgotSuccess = false;
        state.changePasswordForgotErrorMessage = ''
      })
      .addMatcher(isRejected(changePasswordForgot), (state, action) => {
        state.loading = false;
        const httpStatusCode = action.error['response']?.status;
        state.changePasswordForgotErrorMessage = httpStatusCode !== 200 ? action.error['response']?.data?.error_message : '';
      })
      ;
  },
});

export const { resetUser, updateStateUser } = UserSlice.actions;
// Reducer
export default UserSlice.reducer;
