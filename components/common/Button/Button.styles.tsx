import styled, { css } from 'styled-components';

interface SButtonProps {
  variant: 'contained' | 'outlined' | 'text';
  disabled?: boolean;
}

export const SButton = styled.button<SButtonProps>`
  padding: 1rem 2rem;

  transition: all 0.2s ease-in-out;

  appearance: none;
  border: 0;
  border-radius: 3px;
  font-weight: 700;
  font-family: 'Roboto';

  cursor: pointer;

  ${({ variant }) => {
    switch (variant) {
      case 'outlined':
        return outlinedVariant;
      case 'text':
        return textVariant;
      default:
        return containedVariant;
    }
  }}
`;

const containedVariant = css`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.light};

  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.disabledDark};
    color: ${({ theme }) => theme.colors.disabledLight};

    cursor: default;
  }
`;

const outlinedVariant = css`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.primary};
  border: 2px solid ${({ theme }) => theme.colors.primary};

  &:hover,
  &:focus {
    border-color: ${({ theme }) => theme.colors.primaryHover};
    background-color: rgba(55, 114, 221, 0.2);
    box-shadow: 0 0 4px ${({ theme }) => theme.colors.primary};
  }

  &:disabled {
    background-color: transparent;
    box-shadow: none;

    color: ${({ theme }) => theme.colors.disabledLight};
    border-color: ${({ theme }) => theme.colors.disabledLight};

    cursor: default;
  }
`;

const textVariant = css`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.primary};

  &:hover,
  &:focus {
    background-color: rgba(55, 114, 221, 0.2);
  }

  &:disabled {
    background-color: transparent;
    color: ${({ theme }) => theme.colors.disabledLight};

    cursor: default;
  }
`;
