import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import Layout from '../components/MyLayout'
import { useRouter } from 'next/router'
import queryString from 'query-string'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  const [inputUrl, setInputUrl] = useState('')
  const [query, setQuery] = useState('')
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, [])
  useEffect(() => {
    setInputUrl(router.query.hubUrl);
    const newQuery = queryString.stringify(router.query);
    setQuery(newQuery !== '' ? newQuery : null)
  }, [router.query.hubUrl])
  const setServer = (e) => {
    e.preventDefault();
    if (inputUrl && inputUrl.trim() !== '') {
      window.location.href = `/?hubUrl=${inputUrl}`
    } else {
      window.location.href = '/'
    }
  }

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
          <form onSubmit={setServer}>
            <TextField type="text" value={inputUrl} onChange={e => setInputUrl(e.target.value)} />
            <Button type="submit" variant="contained" size="small">
              Change Hub Address
            </Button>
          </form>
          {query && <div>
            <Component {...pageProps} query={query} />
          </div>}
        </Layout>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default MyApp;
