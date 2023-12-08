import { createAsyncThunk, createSlice, isPending, isRejected, isFulfilled } from '@reduxjs/toolkit';
import { IPagination } from 'app/shared/model/user.model';
import { IQueryParams, serializeAxiosError } from 'app/shared/reducers/reducer.utils';
import axios from 'axios';
import { Storage } from 'react-jhipster';
import { defaultValue, IVideo } from './../model/video.model';

const initialState = {
  loading: false,
  errorMessage: null,
  updating: false,
  updateSuccess: false,
  delSuccess: false,
  totalItems: 0,
  data: [] as ReadonlyArray<IVideo>,
  pagination: null as IPagination,
  loadingsuccess: false,
  video: defaultValue,
};

const adminUrl = 'api/v1/video';

export type VideoManagementState = Readonly<typeof initialState>;

export const getVideos = createAsyncThunk('admin/videos', async ({ page, size, sort }: IQueryParams) => {
  const requestUrl = `${`api/v1/videos`}${`?page=${page}&size=${size}&sort=${sort}`}`;
  const result = axios.get(requestUrl);
  return result
});

export const createVideo = createAsyncThunk(
  'admin/create-video',
  async (video: IVideo, thunkAPI) => {
    const requestUrl = `${`api/v1/video`}`;
    const result = await axios.post(requestUrl, video, config);
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const delVideo = createAsyncThunk('admin/delete-video', async (video_id: any) => {
  const requestUrl = `${`api/v1/video`}${`/${video_id}`}`;
  const result = await axios.delete(requestUrl)
  return result
});

const AUTH_TOKEN_KEY = 'jhi-authenticationToken';

const token = Storage.local.get(AUTH_TOKEN_KEY) || Storage.session.get(AUTH_TOKEN_KEY);
const config = {
  headers: {
    'Authorization': token,
  }
}

export const VideoManagementSlice = createSlice({
  name: 'videoManagement',
  initialState: initialState as VideoManagementState,
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
        errorMessage: null
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getVideos.fulfilled, (state, action) => {
        state.data = action.payload.data.data;
        state.pagination = action.payload.data.pagination;
      })
      .addMatcher(isPending(getVideos), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
      .addMatcher(isRejected(getVideos), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.updateSuccess = false;
        state.errorMessage = action.error.message;
      })

      .addMatcher(isFulfilled(createVideo), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.video = action.payload.data;
        state.updateSuccess = true;
      })
      .addMatcher(isPending(createVideo), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
      .addMatcher(isRejected(createVideo), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.updateSuccess = false;
        state.errorMessage = action.error.message;
      })

      .addMatcher(isFulfilled(delVideo), (state, action) => {
        state.delSuccess = true;
        state.updating = false;
        state.loading = false;
      })
      .addMatcher(isPending(delVideo), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
      .addMatcher(isRejected(delVideo), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.updateSuccess = false;
        state.errorMessage = action.error.message;
      })
      ;
  },
});

export const { reset, resetStatus } = VideoManagementSlice.actions;
// Reducer
export default VideoManagementSlice.reducer;