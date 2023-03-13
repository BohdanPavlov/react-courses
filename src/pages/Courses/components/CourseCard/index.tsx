import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { deleteCourse } from 'store/courses/coursesAsyncThunks';
import { setSelectedCourse } from 'store/courses/coursesSlice';
import { useAppDispatch, useAppSelector } from 'hooks/redux.hooks';
import Button from 'common/Button';

import { ICourse } from 'types/courses.types';
import { IAuthor } from 'types/authors.types';
import { COURSES_ROUTE } from 'utils/constants';

import { getAuthorsNames } from 'helpers/getAuthorsNames';
import { pipeDuration } from 'helpers/pipeDuration';
import { transformCreationDate } from 'helpers/transformCreationDate';

import './CourseCard.scss';

interface CourseCardProps {
  course: ICourse;
  authorsArr: IAuthor[] | null;
}

const CourseCard: FC<CourseCardProps> = ({ course, authorsArr }) => {
  const role = useAppSelector((state) => state.user.role);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const authorsNames = getAuthorsNames(course.authors, authorsArr);
  const transformedDuration = pipeDuration(course.duration);
  const transformedCreationDate = transformCreationDate(course.creationDate);

  function onCourseSelect() {
    dispatch(setSelectedCourse(course));
    navigate(`${COURSES_ROUTE}/${course.id}`);
  }

  return (
    <div className='card'>
      <div className='card-main'>
        <h2 className='card-main__title'>{course.title}</h2>
        <p className='card-main__description'>{course.description}</p>
      </div>
      <div className='card-secondary'>
        <div className='card-secondary__info'>
          <p>
            <strong>Authors: </strong>
            {authorsNames}
          </p>
          <p>
            <strong>Duration: </strong>
            <span>{transformedDuration} hours</span>
          </p>
          <p>
            <strong>Created: </strong>
            <span>{transformedCreationDate}</span>
          </p>
        </div>
        <div className='card-secondary__buttons'>
          <Button type='button' className='card-secondary__button' onClick={onCourseSelect}>
            Show course
          </Button>
          {role === 'admin' && (
            <>
              <Button
                type='button'
                className='card-secondary__button card-secondary__button_edit'
                onClick={() => navigate(`/courses/update/${course.id}`)}
              >
                Edit
              </Button>
              <Button
                type='button'
                className='card-secondary__button card-secondary__button_delete'
                onClick={() => dispatch(deleteCourse(course.id))}
              >
                Delete
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
