import {
  DeleteCourseResponse,
  GetCoursesSuccessResponse,
  GetSelectedCourseSuccessResponse,
  NewCourseData,
  NewCourseResponse,
} from 'types/courses.types';
import { $authHost } from 'http/index';

export const fetchCoursesRequest = async () => {
  const { data } = await $authHost.get<GetCoursesSuccessResponse>('courses/all');

  return data.result;
};

export const fetchSelectedCourseRequest = async (id: string) => {
  const { data } = await $authHost.get<GetSelectedCourseSuccessResponse>(`courses/${id}`);

  return data.result;
};

export const createNewCourseRequest = async (newCourseData: NewCourseData) => {
  return await $authHost.post<NewCourseResponse>('courses/add', newCourseData);
};

export const updateCourseRequest = async (newCourseData: NewCourseData, id: string) => {
  return await $authHost.put<NewCourseResponse>(`courses/${id}`, newCourseData);
};

export const deleteCourseRequest = async (id: string) => {
  return await $authHost.delete<DeleteCourseResponse>(`courses/${id}`);
};
