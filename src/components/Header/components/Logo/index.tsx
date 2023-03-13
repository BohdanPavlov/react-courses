import { FC } from 'react';
import { Link } from 'react-router-dom';

import { COURSES_ROUTE } from 'utils/constants';
import logo from 'assets/logo.svg';

const Logo: FC = () => {
  return (
    <Link to={COURSES_ROUTE}>
      <img src={logo} alt='Main Logo' />
    </Link>
  );
};

export default Logo;
