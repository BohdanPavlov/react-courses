import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import SearchBar from 'pages/Courses/components/SearchBar';
import CourseCard from 'pages/Courses/components/CourseCard';
import Button from 'common/Button';
import Skeleton from 'components/Skeleton';

import { fetchCourses } from 'store/courses/coursesAsyncThunks';
import { fetchAuthors } from 'store/authors/authorsAsyncThunks';

import { useAppDispatch, useAppSelector } from 'hooks/redux.hooks';
import { CREATE_COURSE_ROUTE } from 'utils/constants';
import { ICourse } from 'types/courses.types';

import './Courses.scss';

const Courses: FC = () => {
  const { courses, loading, searchedCourses, errorMessages } = useAppSelector(
    (state) => state.courses,
  );
  const authors = useAppSelector((state) => state.authors.authors);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCourses());
    dispatch(fetchAuthors());
  }, []);

  if (loading === 'pending') {
    return <Skeleton />;
  }

  if (errorMessages) {
    return <div className='error'>{errorMessages}</div>;
  }

  return (
    <div className='courses'>
      <div className='courses-search'>
        <SearchBar />
        <Button
          type='button'
          className='courses-search__button'
          onClick={() => navigate(CREATE_COURSE_ROUTE)}
        >
          Add new course
        </Button>
      </div>
      <ul className='courses-cards'>
        {courses?.length === 0 && <h1>No courses found! Please add new course!</h1>}
        {searchedCourses?.length === 0 && <h1>Courses Not Found</h1>}
        {searchedCourses
          ? searchedCourses.map((course: ICourse) => (
              <CourseCard key={course.id} course={course} authorsArr={authors} />
            ))
          : courses?.map((course: ICourse) => (
              <CourseCard key={course.id} course={course} authorsArr={authors} />
            ))}
      </ul>
    </div>
  );
};

export default Courses;
