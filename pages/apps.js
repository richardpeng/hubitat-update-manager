import Table from '../components/Table'

const Apps = ({ query }) => (
  <div>
    <h2>Apps</h2>
    <Table type='apps' query={query} />
  </div>
)

export default Apps;
