import { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import RefreshIcon from '@material-ui/icons/Refresh';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton'
import Editor from './Editor'

const Row = ({ type, row, query }) => {
  const [status, setStatus] = useState('Checking...');
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(false);
  const [data, setData] = useState(null);
  const [editing, setEditing] = useState(false);
  const id = row[0];
  const handleCheck = async (id) => {
    setStatus('Updating...')
    const res = await fetch(`/api/${type}/${id}?${query}`);
    const newData = await res.json();
    setData(newData);
    if (newData.hasOwnProperty('current')) {
      setStatus(newData.current ? 'Up-to-date' : '');
      if (!newData.current) setUpdate(true);
    } else {
      if (newData.importUrl === '') {
        setStatus('No import URL found')
      } else {
        setStatus('Unknown');
      }
    }
  }
  const handleRefresh = () => handleCheck(id);
  const handleUpdate = async () => {
    setUpdate(false);
    setStatus('Updating...');
    const { id, version, latestSource: source } = data;
    fetch(`/api/${type}/update?${query}`, {
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
          setStatus('Failed!')
          throw res.statusText;
        }
      })
      .then(res => res.json())
      .then(response => {
        if (response.status === 'success') {
          setUpdate(false);
          setStatus('Updated!')
        }
      })
  }
  const handleSave = (value) => {
    return fetch(`/api/${type}/updateUrl?${query}`, {
      method: 'POST',
      body: JSON.stringify({
        id,
        value
      })
    }).then(handleRefresh)
  }
  useEffect(() => {
    async function doCheck() {
      await handleCheck(id)
    }
    doCheck();
  }, [])
  useEffect(() => {
    setLoading(status.includes('...'));
  }, [status])

  return (
    <TableRow>
      {row.map(col => <TableCell>{col}</TableCell>)}
      <TableCell>
        {loading && <CircularProgress size='1em' />} {status}
        {update && <button onClick={handleUpdate}>Update</button>}
        {!loading && (
          <>
            <IconButton aria-label="edit" size="small" onClick={() => setEditing(true)}>
              <EditIcon />
            </IconButton>
            <IconButton aria-label="refresh" size="small" onClick={handleRefresh}>
              <RefreshIcon />
            </IconButton>
          </>
        )
        }
        {!loading && data && <Editor open={editing} onClose={() => setEditing(false)} onSave={handleSave} importUrl={data.importUrl} query={query} title="Update Import URL" />}
      </TableCell>
    </TableRow>
  )
}

export const App = ({ row, query }) => <Row type='apps' row={row} query={query} />
export const Driver = ({ row, query }) => <Row type='drivers' row={row} query={query} />

