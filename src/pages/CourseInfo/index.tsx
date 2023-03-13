import { FC } from 'react';
import { Link } from 'react-router-dom';

import { pipeDuration } from 'helpers/pipeDuration';
import { transformCreationDate } from 'helpers/transformCreationDate';
import { getAuthorsNames } from 'helpers/getAuthorsNames';
import { useAppSelector } from 'hooks/redux.hooks';
import { COURSES_ROUTE } from 'utils/constants';

import 'pages/CourseInfo/CourseInfo.scss';

const CourseInfo: FC = () => {
  const authors = useAppSelector((state) => state.authors.authors);
  const selectedCourse = useAppSelector((state) => state.courses.selectedCourse);

  return (
    <div className='info'>
      <h2 className='info__title'>{selectedCourse?.title}</h2>
      <div className='info-body'>
        <p className='info-body__description'>{selectedCourse?.description}</p>
        <div className='info-body-general'>
          <p className='info-body-general__item'>
            <strong>ID:</strong> {selectedCourse?.id}
          </p>
          <p className='info-body-general__item'>
            <strong>Duration:</strong>{' '}
            {selectedCourse?.duration ? pipeDuration(selectedCourse.duration) : null} hours
          </p>
          <p className='info-body-general__item'>
            <strong>Created:</strong>{' '}
            {selectedCourse?.creationDate
              ? transformCreationDate(selectedCourse.creationDate)
              : null}
          </p>
          <p className='info-body-general__item'>
            <strong>Authors:</strong>{' '}
            {selectedCourse?.authors ? getAuthorsNames(selectedCourse.authors, authors) : null}
          </p>
        </div>
      </div>
      <Link className='info__navigate' to={COURSES_ROUTE}>
        {'< Back to courses'}
      </Link>
    </div>
  );
};

export default CourseInfo;
