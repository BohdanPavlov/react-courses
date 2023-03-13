export interface IAuthor {
  id: string;
  name: string;
}

export interface GetAuthorsSuccessResponse {
  successful: boolean;
  result: IAuthor[];
}

export interface CreateAuthorResponse {
  successful: boolean;
  result: IAuthor;
}
