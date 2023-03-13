import { FC } from 'react';
import { ErrorMessage, Field } from 'formik';

import Input from 'common/Input';
import Button from 'common/Button';
import Textarea from 'common/Textarea';

import './CreateCourseHeader.scss';

const CreateCourseHeader: FC<{ mode: string }> = ({ mode }) => (
  <div className='create-course-header'>
    <div className='create-course-header__top'>
      <div className='create-course-header__input-block'>
        <Field
          name='title'
          component={Input}
          labelText='Title'
          placeholder='Enter title...'
          className='create-course-header__input'
        />
        <ErrorMessage name='title' className='error' component='div' />
      </div>
      <Button className='create-course-header__button'>
        {mode === 'edit' ? 'Update course' : 'Create course'}
      </Button>
    </div>
    <Field
      name='description'
      component={Textarea}
      labelText='Description'
      placeholder='Enter description'
    />
    <ErrorMessage name='description' className='error' component='div' />
  </div>
);

export default CreateCourseHeader;
