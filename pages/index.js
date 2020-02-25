import Layout from '../components/MyLayout';
import { useRouter } from 'next/router';
import { useRef } from "react";
import HubDetails from '../components/HubDetails'
import Hub from '../Api'

const Index = ({ hubDetails }) => {
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
          <HubDetails details={hubDetails} />
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

Index.getInitialProps = async function(context) {
  const hubDetails = await new Hub(context.query.hubUrl).fetch('settings')

  return {
    hubDetails
  };
};

export default Index;
