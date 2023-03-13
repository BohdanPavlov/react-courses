import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthor } from 'types/authors.types';
import { createAuthor, fetchAuthors } from 'store/authors/authorsAsyncThunks';
import { logout } from 'store/user/userAsyncThunks';
import {
  createNewCourse,
  fetchSelectedCourse,
  updateCourse,
} from 'store/courses/coursesAsyncThunks';

interface AuthorsState {
  authors: IAuthor[];
  newCourseAuthorsIds: Array<string>;
  newCourseAuthors: IAuthor[];
}

const initialState: AuthorsState = {
  authors: [],
  newCourseAuthorsIds: [],
  newCourseAuthors: [],
};

export const authorsSlice = createSlice({
  name: 'authors',
  initialState,
  reducers: {
    addNewCourseAuthor(state, action: PayloadAction<string>) {
      const newCourseAuthor = state.authors.find((author) => author.id === action.payload);
      if (newCourseAuthor) {
        state.authors = state.authors.filter((author) => author.id !== newCourseAuthor.id);
        state.newCourseAuthors.push(newCourseAuthor);
        state.newCourseAuthorsIds.push(newCourseAuthor.id);
      }
    },
    removeNewCourseAuthor(state, action: PayloadAction<string>) {
      const removedCourseAuthor = state.newCourseAuthors.find(
        (author) => author.id === action.payload,
      );
      if (removedCourseAuthor) {
        state.newCourseAuthors = state.newCourseAuthors.filter(
          (author) => author.id !== action.payload,
        );
        state.newCourseAuthorsIds = state.newCourseAuthorsIds.filter(
          (authorId) => authorId !== action.payload,
        );
        state.authors.push(removedCourseAuthor);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthors.fulfilled, (state, action) => {
        state.authors = action.payload;
      })
      .addCase(fetchSelectedCourse.fulfilled, (state, action) => {
        state.newCourseAuthorsIds = action.payload.authors;
        state.newCourseAuthors = action.payload.authors.map((authorId) => {
          const author = state.authors.find((author) => authorId === author.id);
          return author ? author : { id: 'not found', name: 'not found' };
        });
        state.authors = state.authors.filter((author) => {
          return action.payload.authors.findIndex((newAuthorId) => author.id === newAuthorId) < 0;
        });
      })
      .addCase(createAuthor.fulfilled, (state, action) => {
        state.authors.push(action.payload);
      })
      .addCase(createNewCourse.fulfilled, (state) => {
        state.newCourseAuthors = [];
        state.newCourseAuthorsIds = [];
      })
      .addCase(updateCourse.fulfilled, (state) => {
        state.newCourseAuthors = [];
        state.newCourseAuthorsIds = [];
      })
      .addCase(logout.fulfilled, () => {
        return { ...initialState };
      });
  },
});

export const { addNewCourseAuthor, removeNewCourseAuthor } = authorsSlice.actions;

export default authorsSlice.reducer;
