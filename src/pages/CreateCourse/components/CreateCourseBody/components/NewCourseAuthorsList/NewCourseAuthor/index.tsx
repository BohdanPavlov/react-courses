import { FC } from 'react';

import Button from 'common/Button';
import { useAppDispatch } from 'hooks/redux.hooks';
import { IAuthor } from 'types/authors.types';
import { removeNewCourseAuthor } from 'store/authors/authorsSlice';

import './NewCourseAuthor.scss';

const NewCourseAuthor: FC<{ author: IAuthor }> = ({ author: { name, id } }) => {
  const dispatch = useAppDispatch();

  const onRemoveNewCourseAuthor = () => {
    dispatch(removeNewCourseAuthor(id));
  };

  return (
    <div className='new-course-author'>
      <p className='new-course-author__name'>{name}</p>
      <Button className='new-course-author__button' onClick={onRemoveNewCourseAuthor}>
        Remove
      </Button>
    </div>
  );
};

export default NewCourseAuthor;
