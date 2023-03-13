import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserState } from 'types/user.types';
import { checkAuth, login, logout, register } from 'store/user/userAsyncThunks';
import { isError } from 'helpers/isError';

const initialState: UserState = {
  isAuth: false,
  user: null,
  loading: 'idle',
  errorMessages: '',
  successRegistrationMessage: '',
  role: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearErrorMessages(state) {
      state.errorMessages = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload;
        state.loading = 'succeeded';
        state.errorMessages = '';
      })
      .addCase(register.fulfilled, (state, action) => {
        state.successRegistrationMessage = action.payload;
        state.errorMessages = '';
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload;
        state.loading = 'succeeded';
        state.role = action.payload.role;
      })
      .addCase(logout.fulfilled, () => {
        return {
          ...initialState,
        };
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.loading = 'failed';
        state.errorMessages = action.payload;
      });
  },
});

export const { clearErrorMessages } = userSlice.actions;

export default userSlice.reducer;
