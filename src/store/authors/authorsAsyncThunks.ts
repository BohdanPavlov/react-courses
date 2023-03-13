import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { IAuthor } from 'types/authors.types';
import { createAuthorRequest, fetchAuthorsRequest } from 'http/authors.api';

export const fetchAuthors = createAsyncThunk<IAuthor[], undefined, { rejectValue: string }>(
  'authors/fetchAuthors',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchAuthorsRequest();
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

export const createAuthor = createAsyncThunk<IAuthor, string, { rejectValue: string }>(
  'authors/createAuthor',
  async (authorName, { rejectWithValue }) => {
    try {
      return await createAuthorRequest(authorName);
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
