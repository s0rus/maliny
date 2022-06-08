import React, { FC } from 'react';
import { SButton } from './Button.styles';

interface ButtonProps {
  label: string;
  variant?: 'contained' | 'outlined' | 'text';
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({ variant = 'contained', label, ...props }) => {
  return (
    <SButton variant={variant} {...props}>
      {label}
    </SButton>
  );
};

export default Button;
