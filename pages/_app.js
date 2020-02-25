import React, { useEffect, useRef } from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import Layout from '../components/MyLayout'
import { useRouter } from 'next/router'
import queryString from 'query-string'

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  const serverInput = useRef();
  const { hubUrl } = router.query;
  const query = queryString.stringify(router.query);
  const setServer = (e) => {
    e.preventDefault();
    const href = `/?hubUrl=${serverInput.current.value}`
    router.push(href, href, { shallow: true })
  }

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, [])

  return (
    <React.Fragment>
      <Head>
        <title>Hubitat Update Manager</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Layout>
          <h1>Hubitat Update Manager</h1>
          {hubUrl ? (
            <Component {...pageProps} query={query} />
          ) : (
            <div>
              <form onSubmit={setServer}>
                <input type="text" ref={serverInput} />
                <input type="submit" />
              </form>
            </div>
          )}
        </Layout>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default MyApp;
