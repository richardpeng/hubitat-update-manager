import { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const Row = ({ type, row }) => {
  const [current, setCurrent] = useState('Checking...');
  const [update, setUpdate] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [data, setData] = useState(null);
  const id = row[0];
  const handleCheck = async (id) => {
    const res = await fetch(`/api/${type}/${id}`);
    const newData = await res.json();
    if (newData.hasOwnProperty('current')) {
      setCurrent(newData.current ? 'Current' : '');
      if (!newData.current) setUpdate(true);
    } else {
      if (newData.importUrl === '') {
        setCurrent('No import URL found')
      } else {
        setCurrent('Unknown');
      }
    }
    setData(newData);
  }
  const handleUpdate = async () => {
    setUpdating(true);
    const { id, version, latestSource: source } = data;
    fetch(`/api/${type}/update`, {
      method: 'POST',
      body: JSON.stringify({
        id,
        version,
        source
      })
    })
      .then(res => {
        if (res.ok) { // res.status >= 200 && res.status < 300
          return res;
        } else {
          setUpdate(false);
          setUpdating(false);
          setCurrent('Failed!')
          throw res.statusText;
        }
      })
      .then(res => res.json())
      .then(response => {
        if (response.status === 'success') {
          setUpdate(false);
          setUpdating(false);
          setCurrent('Updated!')
        }
      })
  }
  useEffect(() => {
    async function doCheck() {
      await handleCheck(id)
    }
    doCheck();
  }, [])

  return (
    <TableRow>
      {row.map(col => <TableCell>{col}</TableCell>)}
      <TableCell>
        {(current === 'Checking...' || updating) && <CircularProgress size='1em' />} {current}
        {update && <button onClick={handleUpdate}>{updating ? 'Updating...' : 'Update'}</button>}
      </TableCell>
    </TableRow>
  )
}

export const App = ({ row }) => <Row type='apps' row={row} />
export const Driver = ({ row }) => <Row type='drivers' row={row} />

