import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import Theme from '@/styles/Theme/';
import GlobalStyles from '@/styles/GlobalStyles';
import MainTemplate from '@/styles/Templates/MainTemplate';
import { withTRPC } from '@trpc/next';
import { AppRouter } from './api/trpc/[trpc]';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      <MainTemplate>
        <Component {...pageProps} />
      </MainTemplate>
    </ThemeProvider>
  );
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const url = '/api/trpc';

    return {
      url,
    };
  },
  ssr: true,
})(MyApp);
