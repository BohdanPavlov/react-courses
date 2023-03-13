import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';

import './Button.scss';

type ButtonProps = DetailedHTMLProps<
	ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
> & {
	className?: string;
	type?: 'button' | 'submit' | 'reset' | undefined;
};

const Button: FC<ButtonProps> = ({
	className = '',
	children,
	type = 'submit',
	...props
}) => (
	<button type={type} className={`custom-button ${className}`} {...props}>
		{children}
	</button>
);

export default Button;
