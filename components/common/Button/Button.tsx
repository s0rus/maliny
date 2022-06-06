import React, { FC } from 'react';
import { SButton } from './Button.styles';

interface ButtonProps {
  variant?: 'contained' | 'outlined' | 'text';
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({ variant = 'contained', ...props }) => {
  return (
    <SButton variant={variant} {...props}>
      REGISTER
    </SButton>
  );
};

export default Button;
