import { DetailedHTMLProps, FC, InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

import './Textarea.scss';
import { FieldInputProps } from 'formik/dist/types';

type TextareaProps = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> & {
  field?: FieldInputProps<any>;
  labelText?: string;
};

const Textarea: FC<TextareaProps> = ({ field, labelText, className, ...props }) => (
  <label className={`custom-textarea ${className}`}>
    {labelText && labelText}
    <textarea className='custom-textarea__field' {...field} {...props} />
  </label>
);

export default Textarea;
