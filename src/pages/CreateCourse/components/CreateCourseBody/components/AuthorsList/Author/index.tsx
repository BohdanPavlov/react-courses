import { FC } from 'react';

import Button from 'common/Button';
import { useAppDispatch } from 'hooks/redux.hooks';
import { addNewCourseAuthor } from 'store/authors/authorsSlice';
import { IAuthor } from 'types/authors.types';

import 'pages/CreateCourse/components/CreateCourseBody/components/AuthorsList/Author/Author.scss';

const Author: FC<{ author: IAuthor }> = ({ author: { name, id } }) => {
  const dispatch = useAppDispatch();

  const onAddAuthor = () => {
    dispatch(addNewCourseAuthor(id));
  };

  return (
    <div className='author'>
      <p className='author__name'>{name}</p>
      <Button className='author__button' onClick={onAddAuthor}>
        Add author
      </Button>
    </div>
  );
};

export default Author;
