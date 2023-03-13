import { Navigate } from 'react-router-dom';

import { Login, Registration, Courses, CourseInfo, CreateCourse } from 'pages';

import NotAuthorized from 'hoc/NotAuthorized';
import Private from 'hoc/Private';

import {
  COURSE_INFO_ROUTE,
  COURSES_ROUTE,
  CREATE_COURSE_ROUTE,
  EDIT_COURSE_ROUTE,
  LOGIN_ROUTE,
  NOT_FOUND_ROUTE,
  REGISTRATION_ROUTE,
} from 'utils/constants';

export const notAuthorizedRoutes = [
  {
    path: LOGIN_ROUTE,
    element: (
      <NotAuthorized>
        <Login />
      </NotAuthorized>
    ),
  },
  {
    path: REGISTRATION_ROUTE,
    element: (
      <NotAuthorized>
        <Registration />
      </NotAuthorized>
    ),
  },
];

export const authorizedRoutes = [
  {
    path: '/',
    element: (
      <Private>
        <Navigate replace to={COURSES_ROUTE} />
      </Private>
    ),
  },
  {
    path: COURSES_ROUTE,
    element: (
      <Private>
        <Courses />
      </Private>
    ),
  },
  {
    path: COURSE_INFO_ROUTE,
    element: (
      <Private>
        <CourseInfo />
      </Private>
    ),
  },
  {
    path: CREATE_COURSE_ROUTE,
    element: (
      <Private>
        <CreateCourse mode='create' />
      </Private>
    ),
  },
  {
    path: EDIT_COURSE_ROUTE,
    element: (
      <Private>
        <CreateCourse mode='edit' />
      </Private>
    ),
  },
  {
    path: NOT_FOUND_ROUTE,
    element: (
      <Private>
        <Navigate replace to={COURSES_ROUTE} />
      </Private>
    ),
  },
];
