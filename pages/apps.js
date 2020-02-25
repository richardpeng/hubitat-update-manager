import Layout from '../components/MyLayout';
import { useRouter } from 'next/router';
import { useRef } from "react";
import Hub from '../Api'
import { App } from '../components/Row'

const Apps = ({ apps: {headers, rows} }) => {
  const router = useRouter();
  const serverInput = useRef();
  const setServer = (e) => {
    e.preventDefault();
    const href = `/?hubUrl=${serverInput.current.value}`
    router.push(href, href, { shallow: true })
  }

  return (
    <Layout>
      <h1>Hubitat Update Manager</h1>
      {router.query.hubUrl ? (
        <div>
          {router.query.hubUrl}
          <table>
            <thead>
            <tr>
              {headers.map(h => <th>{h}</th>)}
            </tr>
            </thead>
            <tbody>
            {rows.map(row => <App row={row} />)}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <form onSubmit={setServer}>
            <input type="text" ref={serverInput} />
            <input type="submit" />
          </form>
        </div>
      )}
    </Layout>
  );
}

Apps.getInitialProps = async function(context) {
  const apps = await new Hub(context.query.hubUrl).fetch('apps')

  return {
    apps
  };
};

export default Apps;
