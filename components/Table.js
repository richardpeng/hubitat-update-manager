import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import { useEffect, useState } from 'react'
import { App, Driver } from './Row'
import Loading from './Loading'

const components = {
  drivers: Driver,
  apps: App
}

const AppTable = ({ type }) => {
  const [data, setData] = useState(null);
  const Row = components[type];
  useEffect(() => {
    fetch(`/api/${type}/index`).then(d => d.json()).then(res => setData(res));
  }, [])

  return (
    <div style={{overflow: 'scroll'}}>
      {!data && <Loading/>}
      {data &&
      <Table size="small">
        <TableHead>
          <TableRow>
            {data.headers.map(h => <TableCell>{h}</TableCell>)}
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.rows.map(row => <Row row={row} />)}
        </TableBody>
      </Table>}
    </div>
  )
}

export default AppTable;
