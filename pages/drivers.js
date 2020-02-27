import Table from '../components/Table'

const Drivers = ({ query }) => (
  <div>
    <h2>Drivers</h2>
    <Table type='drivers' query={query} />
  </div>
)

export default Drivers;
