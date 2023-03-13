import React, { FC } from 'react';

import Logo from 'components/Header/components/Logo';
import Button from 'common/Button';
import { useAppDispatch, useAppSelector } from 'hooks/redux.hooks';
import { logout } from 'store/user/userAsyncThunks';

import './Header.scss';

const Header: FC = () => {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  function handleLogout() {
    dispatch(logout());
  }

  return (
    <header className='header'>
      <Logo />
      <div className='header__controls'>
        {user && (
          <>
            <h2 className='header__username'>{user.name}</h2>
            <Button type='button' className='header__button' onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
