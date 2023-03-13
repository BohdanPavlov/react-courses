import { IAuthor } from 'types/authors.types';

export function getAuthorsNames(authorsIds: string[], authors: IAuthor[] | null): string {
  const arrOfNames = authorsIds.map(
    (authorId: string) => authors?.find((author) => author.id === authorId)?.name,
  );
  return arrOfNames.join(', ');
}
