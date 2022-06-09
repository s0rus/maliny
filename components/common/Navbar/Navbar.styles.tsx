import Link from 'next/link';
import styled from 'styled-components';
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
  border-width: 1px;
`;

export const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const NavbarLink = styled.a`
  padding: 0.2rem 0.5rem;
  margin: 0 0.2rem;

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 28px;
    height: auto;
  }
`;
