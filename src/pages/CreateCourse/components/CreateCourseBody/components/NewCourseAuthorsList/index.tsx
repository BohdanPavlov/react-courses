import { FC } from 'react';

import { useAppSelector } from 'hooks/redux.hooks';
import NewCourseAuthor from 'pages/CreateCourse/components/CreateCourseBody/components/NewCourseAuthorsList/NewCourseAuthor';

import './NewCourseAuthorsList.scss';

const NewCourseAuthorsList: FC = () => {
  const newCourseAuthors = useAppSelector((state) => state.authors.newCourseAuthors);
  return (
    <div className='new-course-authors-list'>
      <h3 className='new-course-authors-list__title'>Course authors</h3>
      <div className='new-course-authors-list__items'>
        {newCourseAuthors.length === 0 && (
          <div className='new-course-authors-list__title'>Please add authors for this course!</div>
        )}
        {newCourseAuthors &&
          newCourseAuthors.map((author) => <NewCourseAuthor key={author.id} author={author} />)}
      </div>
    </div>
  );
};

export default NewCourseAuthorsList;
