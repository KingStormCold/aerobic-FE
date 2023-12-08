import axios, { AxiosResponse } from 'axios';
import { Storage } from 'react-jhipster';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { serializeAxiosError } from './reducer.utils';

import { AppThunk } from 'app/config/store';
import { setLocale } from 'app/shared/reducers/locale';

const AUTH_TOKEN_KEY = 'jhi-authenticationToken';
const ADMIN_USER = 'ADMIN_USER'
const ADMIN_PRODUCT = 'ADMIN_PRODUCT'
const ADMIN_CATEGORY = 'ADMIN_CATEGORY'
const ADMIN_VIDEO = 'ADMIN_VIDEO'

export const initialState = {
  loading: false,
  isAuthenticated: false,
  loginSuccess: false,
  loginError: false, // Errors returned from server side
  showModalLogin: false,
  account: {} as any,
  errorMessage: null as unknown as string, // Errors returned from server side
  redirectMessage: null as unknown as string,
  sessionHasBeenFetched: false,
  logoutUrl: null as unknown as string,
};

let unauthenticate = false;

export type AuthenticationState = Readonly<typeof initialState>;

// Actions

export const getSession = (): AppThunk => async (dispatch, getState) => {
  await dispatch(getAccount());

};

export const getAccount = createAsyncThunk('authentication/get_account', async () => axios.get<any>('api/v1/account'), {
  serializeError: serializeAxiosError,
});

interface IAuthParams {
  user_name: string;
  password: string;
  rememberMe?: boolean;
}

export const authenticate = createAsyncThunk(
  'authentication/login',
  async (auth: IAuthParams) => axios.post<any>('api/authenticate', auth),
  {
    serializeError: serializeAxiosError,
  }
);

export const login: (username: string, password: string, rememberMe?: boolean) => AppThunk =
  (user_name, password, rememberMe = false) =>
    async dispatch => {
      const result = await dispatch(authenticate({ user_name, password, rememberMe }));
      if (unauthenticate) {
        unauthenticate = false;
        return;
      }
      const response = result.payload as AxiosResponse;
      const bearerToken = response?.headers?.authorization;
      if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
        const jwt = bearerToken.slice(7, bearerToken.length);
        if (rememberMe) {
          Storage.local.set(AUTH_TOKEN_KEY, jwt);
        } else {
          Storage.session.set(AUTH_TOKEN_KEY, jwt);
        }
      }
      dispatch(getSession());
    };

export const clearAuthToken = () => {
  if (Storage.local.get(AUTH_TOKEN_KEY)) {
    Storage.local.remove(AUTH_TOKEN_KEY);
  }
  if (Storage.session.get(AUTH_TOKEN_KEY)) {
    Storage.session.remove(AUTH_TOKEN_KEY);
  }
};

export const logout: () => AppThunk = () => dispatch => {
  clearAuthToken();
  dispatch(logoutSession());
};

export const clearAuthentication = messageKey => dispatch => {
  clearAuthToken();
  dispatch(authError(messageKey));
  dispatch(clearAuth());
};

export const AuthenticationSlice = createSlice({
  name: 'authentication',
  initialState: initialState as AuthenticationState,
  reducers: {
    logoutSession() {
      return {
        ...initialState,
        showModalLogin: true,
        isAuthenticated: false,
      };
    },
    authError(state, action) {
      return {
        ...state,
        showModalLogin: true,
        redirectMessage: action.payload,
      };
    },
    clearAuth(state) {
      return {
        ...state,
        loading: false,
        showModalLogin: true,
        isAuthenticated: false,
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(authenticate.rejected, (state, action) => {
        const message = action.error.message;
        const loginError = (message.includes("401")) ? true : false;
        unauthenticate = loginError;
        return {
          ...initialState,
          errorMessage: action.error.message,
          showModalLogin: true,
          loginError
        }
      })
      .addCase(authenticate.fulfilled, state => ({
        ...state,
        loading: false,
        loginError: false,
        showModalLogin: false,
        loginSuccess: true,
      }))
      .addCase(getAccount.rejected, (state, action) => {
        const message = action.error.message;
        const loginError = (message.includes("401")) ? true : false;
        return {
          ...state,
          loading: false,
          isAuthenticated: false,
          sessionHasBeenFetched: true,
          showModalLogin: true,
          errorMessage: action.error.message,
          loginError
        };
      })
      .addCase(getAccount.fulfilled, (state, action) => {
        const isAuthenticated = action.payload.data.active;
        const roleAdmin = action.payload.data.roles.some(role => role.includes(ADMIN_USER) || role.includes(ADMIN_CATEGORY) || role.includes(ADMIN_PRODUCT) || role.includes(ADMIN_VIDEO));
        Storage.session.set('roleAdmin', roleAdmin);
        Storage.session.set('haveRoles', action.payload.data.roles);
        return {
          ...state,
          isAuthenticated,
          loading: false,
          sessionHasBeenFetched: true,
          account: action.payload.data,
        };
      })
      .addCase(authenticate.pending, state => {
        state.loading = true;
      })
      .addCase(getAccount.pending, state => {
        state.loading = true;
      });
  },
});

export const { logoutSession, authError, clearAuth } = AuthenticationSlice.actions;

// Reducer
export default AuthenticationSlice.reducer;
