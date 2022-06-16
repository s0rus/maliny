import React, { ButtonHTMLAttributes, FC } from 'react';
import { SButton } from './Button.styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  variant?: 'contained' | 'outlined' | 'text';
  disabled?: boolean;
  children?: React.ReactNode;
}

const Button: FC<ButtonProps> = ({ children, variant = 'contained', label, ...props }) => {
  return (
    <SButton variant={variant} {...props}>
      {children}
      {label}
    </SButton>
  );
};

export default Button;
