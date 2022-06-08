import React, { FC, HTMLInputTypeAttribute } from 'react';
import { SInput, SLabel } from './Input.styles';

interface InputProps {
  type?: HTMLInputTypeAttribute;
  label?: string;
  placeholder?: string;
}

const Input: FC<InputProps> = ({ type = 'text', label, ...props }) => {
  return label ? (
    <SLabel>
      <span>{label}</span>
      <SInput type={type} {...props} />
    </SLabel>
  ) : (
    <SInput type={type} {...props} />
  );
};

export default Input;
