import { configureStore } from '@reduxjs/toolkit';

import userReducer from 'store/user/userSlice';
import coursesReducer from 'store/courses/coursesSlice';
import authorsReducer from 'store/authors/authorsSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    courses: coursesReducer,
    authors: authorsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
