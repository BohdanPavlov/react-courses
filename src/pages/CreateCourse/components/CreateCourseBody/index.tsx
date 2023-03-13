import type { FC } from 'react';

import AddAuthor from 'pages/CreateCourse/components/CreateCourseBody/components/AddAuthor';
import AddDuration from 'pages/CreateCourse/components/CreateCourseBody/components/AddDuration';
import AuthorsList from 'pages/CreateCourse/components/CreateCourseBody/components/AuthorsList';
import NewCourseAuthorsList from 'pages/CreateCourse/components/CreateCourseBody/components/NewCourseAuthorsList';
import { CreateCourseValues } from 'types/courses.types';

import cl from './CreateCourseBody.module.scss';

const CreateCourseBody: FC<{ values: CreateCourseValues }> = ({ values }) => {
  return (
    <div className={cl.body}>
      <div className={cl.left}>
        <AddAuthor />
        <AddDuration values={values} />
      </div>
      <div className={cl.right}>
        <AuthorsList />
        <NewCourseAuthorsList />
      </div>
    </div>
  );
};

export default CreateCourseBody;
