import { Navigate } from 'react-router-dom';

import { FC, PropsWithChildren } from 'react';
import { useAppSelector } from 'hooks/redux.hooks';

const NotAuthorized: FC<PropsWithChildren> = ({ children }) => {
  const isAuth = useAppSelector((state) => state.user.isAuth);

  if (isAuth) {
    return <Navigate replace to='/courses' />;
  }

  return <>{children}</>;
};

export default NotAuthorized;
