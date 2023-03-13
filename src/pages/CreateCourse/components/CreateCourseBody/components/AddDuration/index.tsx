import { ChangeEventHandler, FC, useEffect, useState } from 'react';
import { ErrorMessage, Field } from 'formik';

import Input from 'common/Input';
import { pipeDuration } from 'helpers/pipeDuration';
import { CreateCourseValues } from 'types/courses.types';

import './AddDuration.scss';

const AddDuration: FC<{ values: CreateCourseValues }> = ({ values }) => {
  const [duration, setDuration] = useState<string>(values.duration);

  useEffect(() => {
    setDuration(values.duration);
  }, [values]);

  const handleDurationChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setDuration(e.target.value);
    values.duration = e.target.value;
  };

  return (
    <div className='add-duration'>
      <h3 className='add-duration__title'>Add Duration</h3>
      <Field
        name='duration'
        component={Input}
        labelText='Duration'
        placeholder='Enter duration...'
        value={duration}
        onChange={handleDurationChange}
      />
      <ErrorMessage name='duration' className='error' component='div' />
      <p className='add-duration__preview'>
        Duration: <strong>{pipeDuration(Number(duration))}</strong> hours
      </p>
    </div>
  );
};

export default AddDuration;
