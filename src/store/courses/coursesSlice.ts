import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  createNewCourse,
  deleteCourse,
  fetchCourses,
  fetchSelectedCourse,
  updateCourse,
} from 'store/courses/coursesAsyncThunks';
import { CoursesState, ICourse } from 'types/courses.types';
import { isError } from 'helpers/isError';
import { logout } from 'store/user/userAsyncThunks';

const initialState: CoursesState = {
  courses: [],
  loading: 'idle',
  errorMessages: '',
  searchedCourses: null,
  selectedCourse: null,
};

export const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setSearchedCourses(state, action: PayloadAction<ICourse[] | null>) {
      state.searchedCourses = action.payload;
    },
    setSelectedCourse(state, action: PayloadAction<ICourse>) {
      state.selectedCourse = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.courses = action.payload;
        state.errorMessages = '';
      })
      .addCase(fetchSelectedCourse.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.selectedCourse = action.payload;
        state.errorMessages = '';
      })
      .addCase(createNewCourse.fulfilled, (state, action) => {
        state.selectedCourse = null;
        state.courses.push(action.payload);
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.selectedCourse = null;
        state.courses = state.courses.map((course) => {
          if (course.id === action.payload.id) {
            return action.payload;
          }
          return course;
        });
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.courses = state.courses.filter((course) => course.id !== action.payload);
      })
      .addCase(logout.fulfilled, () => {
        return { ...initialState };
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.loading = 'failed';
        state.errorMessages = action.payload;
      });
  },
});

export const { setSearchedCourses, setSelectedCourse } = coursesSlice.actions;

export default coursesSlice.reducer;
