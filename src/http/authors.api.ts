import { CreateAuthorResponse, GetAuthorsSuccessResponse } from 'types/authors.types';
import { $authHost } from 'http/index';

export const fetchAuthorsRequest = async () => {
  const { data } = await $authHost.get<GetAuthorsSuccessResponse>('authors/all');

  return data.result;
};

export const createAuthorRequest = async (authorName: string) => {
  const { data } = await $authHost.post<CreateAuthorResponse>('authors/add', { name: authorName });

  return data.result;
};
