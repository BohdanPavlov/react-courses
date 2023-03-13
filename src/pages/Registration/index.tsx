import { FC, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import Input from 'common/Input';
import Button from 'common/Button';

import { RegisterUserData } from 'types/user.types';
import { LOGIN_ROUTE } from 'utils/constants';

import './Registration.scss';
import { register } from 'store/user/userAsyncThunks';
import { useAppDispatch, useAppSelector } from 'hooks/redux.hooks';
import { clearErrorMessages } from 'store/user/userSlice';
import { Formik, Field } from 'formik';

const Registration: FC = () => {
  const successRegistrationMessage = useAppSelector(
    (state) => state.user.successRegistrationMessage,
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const initialValues: RegisterUserData = { name: '', email: '', password: '' };

  useEffect(() => {
    if (successRegistrationMessage) {
      alert(successRegistrationMessage);
      navigate(LOGIN_ROUTE);
    }
  }, [successRegistrationMessage, navigate]);

  return (
    <div className='auth'>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          name: Yup.string()
            .min(2, 'Username should be longer than 2 symbols!')
            .required('Required!'),
          email: Yup.string().email('Invalid email').required('Required!'),
          password: Yup.string()
            .min(6, 'Password should be longer than 6 symbols')
            .required('Required!'),
        })}
        onSubmit={(values: RegisterUserData) => {
          dispatch(register(values));
        }}
      >
        {({ errors, touched, handleSubmit }) => (
          <form className='auth__form' onSubmit={handleSubmit}>
            <h2 className='auth__title'>Registration</h2>
            <Field name='name' component={Input} labelText='Name' placeholder='Enter name' />
            {errors.name && touched.name && <div className='error'>{errors.name}</div>}
            <Field
              name='email'
              component={Input}
              type='email'
              labelText='Email'
              placeholder='Enter email'
            />
            {errors.email && touched.email && <div className='error'>{errors.email}</div>}
            <Field
              name='password'
              component={Input}
              type='password'
              labelText='Password'
              placeholder='Enter password'
            />
            {errors.password && touched.password && <div className='error'>{errors.password}</div>}
            <Button
              className='auth__button'
              disabled={!!(errors.name || errors.email || errors.password)}
            >
              Registration
            </Button>
            <p className='auth__redirect'>
              If you have an account you can{' '}
              <Link to={LOGIN_ROUTE} onClick={() => dispatch(clearErrorMessages())}>
                Login
              </Link>
            </p>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Registration;
