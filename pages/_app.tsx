import { Global } from '@emotion/react';
import type { AppProps } from 'next/app';
import Layout from 'src/components/Layout/Layout';
import { BlogThemeProvider } from 'src/context/Theme';
import { globalStyles } from 'src/styles/global';

function MyApp({ Component, pageProps: { years, ...pageProps } }: AppProps) {
  return (
    <BlogThemeProvider>
      <Global styles={globalStyles} />
      <Layout years={years}>
        <Component {...pageProps} />
      </Layout>
    </BlogThemeProvider>
  );
}

export default MyApp;
