import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import Theme from '@/styles/Theme/';
import GlobalStyles from '@/styles/GlobalStyles';
import MainTemplate from '@/styles/Templates/MainTemplate';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      <MainTemplate>
        <Component {...pageProps} />
      </MainTemplate>
    </ThemeProvider>
  );
}

export default MyApp;
