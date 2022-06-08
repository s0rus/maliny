import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  html,
  body {
    font-family: 'Poppins', sans-serif;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.light};
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

export default GlobalStyles;
