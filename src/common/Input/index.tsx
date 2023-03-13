import { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';

import './Input.scss';
import { FieldInputProps } from 'formik/dist/types';

type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  field?: FieldInputProps<any>;
  labelText?: string;
};

const Input: FC<InputProps> = ({ field, labelText, className, type = 'text', ...props }) => {
  return (
    <label className={`custom-input ${className}`}>
      {labelText && labelText}
      <input className='custom-input__field' type={type} {...field} {...props} />
    </label>
  );
};

export default Input;
