import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { ICourse, NewCourseData, UpdateCourseParams } from 'types/courses.types';
import {
  createNewCourseRequest,
  deleteCourseRequest,
  fetchCoursesRequest,
  fetchSelectedCourseRequest,
  updateCourseRequest,
} from 'http/courses.api';

export const fetchCourses = createAsyncThunk<ICourse[], undefined, { rejectValue: string }>(
  'courses/fetchCourses',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchCoursesRequest();
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        return rejectWithValue(
          e.response.data.message ? e.response.data.message : e.response.data.result,
        );
      }
      return rejectWithValue('Error while loading courses!');
    }
  },
);

export const fetchSelectedCourse = createAsyncThunk<ICourse, string, { rejectValue: string }>(
  'courses/fetchSelectedCourse',
  async (id, { rejectWithValue }) => {
    try {
      return await fetchSelectedCourseRequest(id);
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        return rejectWithValue(
          e.response.data.message ? e.response.data.message : e.response.data.result,
        );
      }
      return rejectWithValue('Error while loading courses!');
    }
  },
);

export const createNewCourse = createAsyncThunk<ICourse, NewCourseData, { rejectValue: string }>(
  'courses/createNewCourse',
  async (newCourseData, { rejectWithValue }) => {
    try {
      const { data } = await createNewCourseRequest(newCourseData);
      return data.result;
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        return rejectWithValue(
          e.response.data.message ? e.response.data.message : e.response.data.result,
        );
      }
      return rejectWithValue('Error while loading courses!');
    }
  },
);

export const updateCourse = createAsyncThunk<ICourse, UpdateCourseParams, { rejectValue: string }>(
  'courses/updateCourse',
  async ({ newCourseData, id }, { rejectWithValue }) => {
    try {
      const { data } = await updateCourseRequest(newCourseData, id);
      return data.result;
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        return rejectWithValue(
          e.response.data.message ? e.response.data.message : e.response.data.result,
        );
      }
      return rejectWithValue('Error while loading courses!');
    }
  },
);

export const deleteCourse = createAsyncThunk<string, string, { rejectValue: string }>(
  'courses/deleteCourse',
  async (id, { rejectWithValue }) => {
    try {
      const response = await deleteCourseRequest(id);
      alert(response.data.result);
      return id;
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        return rejectWithValue(
          e.response.data.message ? e.response.data.message : e.response.data.result,
        );
      }
      return rejectWithValue('Error while loading courses!');
    }
  },
);
