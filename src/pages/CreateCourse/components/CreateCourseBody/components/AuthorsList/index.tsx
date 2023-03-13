import { FC } from 'react';
import { useAppSelector } from 'hooks/redux.hooks';

import Author from 'pages/CreateCourse/components/CreateCourseBody/components/AuthorsList/Author';

import './AuthorsList.scss';

const AuthorsList: FC = () => {
  const authors = useAppSelector((state) => state.authors.authors);

  return (
    <div className='authors-list'>
      <h3 className='authors-list__title'>Authors</h3>
      <div className='authors-list__items'>
        {authors.length === 0 && <div className='authors-list__title'>Please add author!</div>}
        {authors && authors.map((author) => <Author key={author.id} author={author} />)}
      </div>
    </div>
  );
};

export default AuthorsList;
