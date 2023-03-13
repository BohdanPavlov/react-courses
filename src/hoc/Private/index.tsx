import { Navigate, useLocation } from 'react-router-dom';

import { FC, PropsWithChildren } from 'react';
import { useAppSelector } from 'hooks/redux.hooks';
import { CREATE_COURSE_ROUTE, EDIT_COURSE_ROUTE } from 'utils/constants';

const Private: FC<PropsWithChildren> = ({ children }) => {
  const isAuth = useAppSelector((state) => state.user.isAuth);
  const role = useAppSelector((state) => state.user.role);
  const { pathname } = useLocation();

  if (!isAuth) {
    return <Navigate replace to='/login' />;
  }

  if (
    isAuth &&
    (pathname === CREATE_COURSE_ROUTE || pathname === EDIT_COURSE_ROUTE) &&
    role !== 'admin'
  ) {
    return <Navigate replace to='/courses' />;
  }

  return <>{children}</>;
};

export default Private;
