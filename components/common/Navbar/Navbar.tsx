import React, { MouseEvent, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ShoppingCart, User } from 'react-feather';
import {
  MobileSearchInput,
  MobileSearchNavbar,
  MobileSearchWrapper,
  NavbarLink,
  NavContainer,
  SearchInput,
  Wrapper,
} from './Navbar.styles';
import Button from '../Button';

const Navbar = () => {
  const [isSearchMode, toggleSearchMode] = useState(false);

  const handleSearchModeToggle = (event: MouseEvent<HTMLButtonElement | HTMLInputElement>) => {
    event.preventDefault();

    toggleSearchMode(!isSearchMode);
  };

  return (
    <>
      <Wrapper>
        {isSearchMode ? (
          <MobileSearchWrapper>
            <MobileSearchNavbar>
              <Button variant='text' onClick={handleSearchModeToggle}>
                <ChevronLeft />
              </Button>
              <MobileSearchInput type='text' placeholder='What are you looking for?' />
            </MobileSearchNavbar>
          </MobileSearchWrapper>
        ) : (
          <>
            <Link href='/'>
              <a>
                <h1
                  style={{
                    marginLeft: '0.5rem',
                  }}
                >
                  maliny.
                </h1>
              </a>
            </Link>
            <SearchInput type='text' placeholder='What are you looking for?' onClick={handleSearchModeToggle} />
            <NavContainer>
              <Link href='/account' passHref>
                <NavbarLink>
                  <User />
                </NavbarLink>
              </Link>
              <Link href='/cart' passHref>
                <NavbarLink>
                  <ShoppingCart />
                </NavbarLink>
              </Link>
            </NavContainer>
          </>
        )}
      </Wrapper>
    </>
  );
};

export default Navbar;
