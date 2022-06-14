import Link from 'next/link';
import styled from 'styled-components';
import Button from '../Button';
import Input from '../Input';

export const Wrapper = styled.header`
  width: 100%;

  padding: 0.2rem 0;

  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-flow: row wrap;
`;

export const SearchInput = styled(Input)`
  order: 2;
  width: 100%;
  min-height: 30px;
  padding: 0.4rem;
  margin-top: 0.4rem;
  margin: 0 0.5rem;

  transition: none;
  border-width: 1px;

  @media all and (min-width: 768px) {
    & {
      order: 0;
      width: 240px;
    }
  }
`;

export const MobileSearchWrapper = styled.div`
  width: 100%;
  height: 100vh;

  background-color: ${({ theme }) => theme.colors.light};
`;

export const MobileSearchNavbar = styled.div`
  width: 100%;
  display: flex;

  border-bottom: 1px solid ${({ theme }) => theme.colors.primary};

  button {
    padding: 0.5rem;
  }
`;

export const MobileSearchInput = styled(SearchInput)`
  order: 0;
  width: 100%;
  min-height: 100% !important;
  margin: 0;
  padding: 0.5rem 0 0.5rem 0.5rem;
  font-size: 1.2rem;

  border: 0;
`;

export const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: center;
`;

export const NavbarLink = styled.a`
  padding: 0.2rem 0.5rem;
  margin: 0 0.2rem;

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    stroke: ${({ theme }) => theme.colors.primary};
    width: 28px;
    height: auto;
  }
`;
