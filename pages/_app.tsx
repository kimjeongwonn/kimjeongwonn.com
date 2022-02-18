import { Global } from '@emotion/react';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout/Layout';
import { BlogThemeProvider } from '../context/Theme';
import { globalStyles } from '../styles/global';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <BlogThemeProvider>
      <Global styles={globalStyles} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </BlogThemeProvider>
  );
}

export default MyApp;
