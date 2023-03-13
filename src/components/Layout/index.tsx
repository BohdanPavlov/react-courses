import { FC, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import Header from 'components/Header';
import { useAppDispatch, useAppSelector } from 'hooks/redux.hooks';
import { checkAuth } from 'store/user/userAsyncThunks';

const Layout: FC = () => {
  const isAuth = useAppSelector((state) => state.user.isAuth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [isAuth]);

  return (
    <div className='container'>
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
