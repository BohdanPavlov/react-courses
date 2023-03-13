import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import Input from 'common/Input';
import Button from 'common/Button';

import { clearErrorMessages } from 'store/user/userSlice';
import { login } from 'store/user/userAsyncThunks';
import { useAppDispatch, useAppSelector } from 'hooks/redux.hooks';
import { LoginUserData } from 'types/user.types';

import { REGISTRATION_ROUTE } from 'utils/constants';

import 'pages/Login/Login.scss';

const Login: FC = () => {
  const errorMessages = useAppSelector((state) => state.user.errorMessages);
  const dispatch = useAppDispatch();
  const initialValues: LoginUserData = { email: '', password: '' };

  return (
    <div className='auth'>
      {errorMessages && <div className='error'>{errorMessages}</div>}
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          email: Yup.string().required('Required!').email('Invalid email!'),
          password: Yup.string().required('Required'),
        })}
        onSubmit={(values: LoginUserData) => {
          dispatch(login(values));
        }}
      >
        {({ errors }) => (
          <Form className='auth__form'>
            <h2 className='auth__title'>Login</h2>
            <Field
              name='email'
              component={Input}
              type='email'
              placeholder='Enter email'
              labelText='Email'
            />
            <ErrorMessage name='email' className='error' component='div' />
            <Field
              name='password'
              component={Input}
              type='password'
              labelText='Password'
              placeholder='Enter password'
            />
            <ErrorMessage name='password' className='error' component='div' />
            <Button className='auth__button' disabled={!!(errors.email || errors.password)}>
              Login
            </Button>
            <p className='auth__redirect'>
              If you dont have an account you can{' '}
              <Link to={REGISTRATION_ROUTE} onClick={() => dispatch(clearErrorMessages())}>
                Register
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
