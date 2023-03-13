import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { IUser, LoginUserData, LogoutResponse, RegisterUserData } from 'types/user.types';
import { checkAuthRequest, loginRequest, logoutRequest, registerRequest } from 'http/user.api';

export const login = createAsyncThunk<IUser, LoginUserData, { rejectValue: string }>(
  'user/login',
  async (userData: LoginUserData, { rejectWithValue }) => {
    try {
      const data = await loginRequest(userData);
      const token = data.result.split(' ')[1];
      localStorage.setItem('token', token);
      return data.user;
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        return rejectWithValue(
          e.response.data.errors ? e.response.data.errors.join(' ') : e.response.data.result,
        );
      }
      return rejectWithValue('Error while loading...');
    }
  },
);

export const register = createAsyncThunk<string, RegisterUserData, { rejectValue: string }>(
  'user/register',
  async (userData: RegisterUserData, { rejectWithValue }) => {
    try {
      const data = await registerRequest(userData);
      return data.result;
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        return rejectWithValue(
          e.response.data.errors ? e.response.data.errors.join(' ') : e.response.data.result,
        );
      }
      return rejectWithValue('Error while loading...');
    }
  },
);

export const checkAuth = createAsyncThunk<IUser, undefined, { rejectValue: string }>(
  'user/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const result = await checkAuthRequest();
      return { name: result.name, email: result.email, role: result.role };
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        return rejectWithValue(
          e.response.data.errors ? e.response.data.errors.join(' ') : e.response.data.result,
        );
      }
      return rejectWithValue('Error while loading...');
    }
  },
);

export const logout = createAsyncThunk<string, undefined, { rejectValue: string }>(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await logoutRequest();
      localStorage.removeItem('token');
      return response.statusText;
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        return rejectWithValue(
          e.response.data.errors ? e.response.data.errors.join(' ') : e.response.data.result,
        );
      }
      return rejectWithValue('Error while loading...');
    }
  },
);
