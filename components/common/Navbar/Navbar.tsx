import Link from 'next/link';
import { ShoppingCart, User } from 'react-feather';
import { NavbarLink, NavContainer, SearchInput, Wrapper } from './Navbar.styles';

const Navbar = () => {
  return (
    <Wrapper>
      <Link href='/'>
        <a>
          <h1>maliny.</h1>
        </a>
      </Link>
      <SearchInput placeholder='What are you looking for?' />
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
    </Wrapper>
  );
};

export default Navbar;
