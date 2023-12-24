import axios, { AxiosResponse } from 'axios';
import { Storage } from 'react-jhipster';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { serializeAxiosError } from './reducer.utils';

import { AppThunk } from 'app/config/store';
import { setLocale } from 'app/shared/reducers/locale';

const AUTH_TOKEN_KEY = 'jhi-authenticationToken';
const ADMIN = 'ADMIN'

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
  roles: [] as ReadonlyArray<string>
};

let unauthenticate = false;

export type AuthenticationState = Readonly<typeof initialState>;

// Actions

export const getSession = (): AppThunk => async (dispatch, getState) => {
  await dispatch(getAccount());
};

export const getAccount = createAsyncThunk('authentication/get_account', async () => axios.get<any>('api/auth/user-profile'), {
  serializeError: serializeAxiosError,
});

interface IAuthParams {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export const authenticate = createAsyncThunk(
  'authentication/login',
  async (auth: IAuthParams) => axios.post<any>('/api/auth/login', auth),
  {
    serializeError: serializeAxiosError,
  }
);

export const login: (email: string, password: string, rememberMe?: boolean) => AppThunk =
  (email, password, rememberMe = false) =>
    async dispatch => {
      const result = await dispatch(authenticate({ email, password, rememberMe }));
      if (unauthenticate) {
        unauthenticate = false;
        return;
      }
      const response = result.payload as AxiosResponse;
      const bearerToken = response?.data?.access_token;
      if (bearerToken) {
        const jwt = bearerToken
        if (rememberMe) {
          Storage.local.set(AUTH_TOKEN_KEY, jwt);
        } else {
          Storage.session.set(AUTH_TOKEN_KEY, jwt);
        }
        dispatch(getSession());
      }
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
          loginError,
          loading: false
        }
      })
      .addCase(authenticate.fulfilled, state => ({
        ...state,
        loading: false,
        loginError: false,
        showModalLogin: false,
        loginSuccess: true,
      }))
      .addCase(authenticate.pending, state => {
        state.loading = true;
      })
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
        const roleAdmin = action.payload.data?.data?.roles?.includes(ADMIN)
        Storage.session.set('roleAdmin', roleAdmin);
        return {
          ...state,
          isAuthenticated: true,
          loading: false,
          sessionHasBeenFetched: true,
          account: action.payload.data,
          roles: action.payload.data?.data?.roles
        };
      })

      .addCase(getAccount.pending, state => {
        state.loading = true;
      });
  },
});

export const { logoutSession, authError, clearAuth } = AuthenticationSlice.actions;

// Reducer
export default AuthenticationSlice.reducer;
