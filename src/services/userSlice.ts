import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  loginUserApi,
  registerUserApi,
  getUserApi,
  updateUserApi,
  logoutApi
} from '../utils/burger-api';
import { TUser } from '../utils/types';
import { setCookie, deleteCookie } from '../utils/cookie';

type UserState = {
  user: TUser | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: UserState = {
  user: null,
  isLoading: false,
  error: null
};

// LOGIN
export const loginUser = createAsyncThunk(
  'user/login',
  async (data: { email: string; password: string }) => {
    const res = await loginUserApi(data);

    localStorage.setItem('refreshToken', res.refreshToken);
    setCookie('accessToken', res.accessToken);

    return res.user;
  }
);

// REGISTER
export const registerUser = createAsyncThunk(
  'user/register',
  async (data: { email: string; password: string; name: string }) => {
    const res = await registerUserApi(data);

    localStorage.setItem('refreshToken', res.refreshToken);
    setCookie('accessToken', res.accessToken);

    return res.user;
  }
);

// GET USER (авто-логин)
export const getUser = createAsyncThunk('user/getUser', async () => {
  const res = await getUserApi();
  return res.user;
});

// UPDATE USER
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (data: { email: string; name: string; password?: string }) => {
    const res = await updateUserApi(data);
    return res.user;
  }
);

// LOGOUT
export const logoutUser = createAsyncThunk('user/logout', async () => {
  await logoutApi();

  localStorage.removeItem('refreshToken');
  deleteCookie('accessToken');
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })

      // REGISTER
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })

      // GET USER
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })

      // UPDATE
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })

      // LOGOUT
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      });
  }
});

export default userSlice.reducer;
