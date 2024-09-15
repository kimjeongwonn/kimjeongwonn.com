import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang='ko'>
        <Head>
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link
            rel='preconnect'
            href='https://fonts.gstatic.com'
            crossOrigin='anonymous'
          />
          <link
            href='https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;800&display=swap'
            rel='stylesheet'
          />
          <link
            rel='stylesheet'
            type='text/css'
            href='https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard-dynamic-subset.css'
          />

          <link
            rel='alternate'
            type='application/rss+xml'
            href='/rss.xml'
            title='RSS'
          />
          <link
            rel='alternate'
            type='application/atom+xml'
            href='/rss-atom.xml'
            title='RSS Atom'
          />
          <link
            rel='alternate'
            type='application/json'
            href='/feed.json'
            title='JSON Feed'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
