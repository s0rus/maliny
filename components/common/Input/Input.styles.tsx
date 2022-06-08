import styled from 'styled-components';

export const SInput = styled.input`
  min-height: 48px;
  padding: 0 0.5rem;

  transition: all 0.2s ease-in-out;

  appearance: none;
  border: 3px solid ${({ theme }) => theme.colors.primary};
  border-radius: 3px;
  font-family: 'Roboto';
  color: ${({ theme }) => theme.colors.dark};
  background-color: ${({ theme }) => theme.colors.light};

  &:focus,
  &:hover {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primaryHover};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.disabledLight};
  }
`;

export const SLabel = styled.label`
  position: relative;

  span {
    padding: 2px 4px;

    background-color: ${({ theme }) => theme.colors.light};
    color: ${({ theme }) => theme.colors.primary};

    position: absolute;
    top: -10px;
    left: 10px;
    transform: translateY(-50%);

    font-size: 0.8rem;
    font-family: 'Roboto';

    max-width: 80%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &:focus-within,
  &:hover {
    span {
      color: ${({ theme }) => theme.colors.primaryHover};
    }
  }
`;
