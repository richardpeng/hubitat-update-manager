import HubDetails from '../components/HubDetails'
import { useEffect, useState } from 'react'
import Loading from '../components/Loading'
import fetch from 'isomorphic-unfetch'

const Index = ({ query }) => {
  const [details, setDetails] = useState(null);
  useEffect(() => {
    fetch(`/api/hub/details?${query}`).then(d => d.json()).then(res => setDetails(res));
  }, [])

  return (
    <div>
      <h2>Hub</h2>
      {details ? <HubDetails details={details} /> : <Loading />}
    </div>
  )
}

export default Index;
