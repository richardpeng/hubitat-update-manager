import HubDetails from '../components/HubDetails'
import { useEffect, useState } from 'react'
import Loading from '../components/Loading'

const Index = ({ hubUrl }) => {
  const [details, setDetails] = useState(null);
  useEffect(() => {
    fetch('/api/hub/details').then(d => d.json()).then(res => setDetails(res));
  }, [])

  return (
    <div>
      <h2>Hub</h2>
      {details ? <HubDetails details={details} /> : <Loading />}
    </div>
  )
}

export default Index;
