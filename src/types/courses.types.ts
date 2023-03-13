export interface ICourse {
  id: string;
  title: string;
  description: string;
  creationDate: string;
  duration: number;
  authors: string[];
}

export interface NewCourseData {
  title: string;
  description: string;
  duration: number;
  authors: string[];
}

export interface CoursesState {
  courses: ICourse[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  errorMessages: string | undefined;
  searchedCourses: ICourse[] | null;
  selectedCourse: ICourse | null;
}

export interface GetCoursesSuccessResponse {
  successful: boolean;
  result: ICourse[];
}

export interface GetSelectedCourseSuccessResponse {
  successful: boolean;
  result: ICourse;
}

export interface CreateCourseValues {
  title: string;
  description: string;
  duration: string;
}

export interface NewCourseResponse {
  successful: boolean;
  result: ICourse;
}

export interface DeleteCourseResponse {
  result: string;
  successful: true;
}

export interface UpdateCourseParams {
  newCourseData: NewCourseData;
  id: string;
}
