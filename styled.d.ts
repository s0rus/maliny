import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      primaryHover: string;
      success: string;
      error: string;
      light: string;
      dark: string;
      disabledLight: string;
      disabledDark: string;
    };
  }
}
