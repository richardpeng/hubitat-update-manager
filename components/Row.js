import { useState, useEffect } from 'react';

const Row = ({ type, row }) => {
  const [current, setCurrent] = useState('Checking...');
  const [update, setUpdate] = useState(false);
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
    const { id, version, latestSource: source } = data;
    console.log(id, version, type)
    const res = await fetch(`/api/${type}/update`, {
      method: 'POST',
      body: JSON.stringify({
        id,
        version,
        source
      })
    })
    const response = await res.json();
    if (response.status === 'success') {
      setUpdate(false);
      setCurrent('Updated!')
    }
  }
  useEffect(() => {
    async function doCheck() {
      await handleCheck(id)
    }
    doCheck();
  }, [])

  return (
    <tr>
      {row.map(col => <td>{col}</td>)}
      <td>
        {current}
        {update && <button onClick={handleUpdate}>Update</button>}
      </td>
    </tr>
  )
}

export const App = ({ row }) => <Row type='apps' row={row} />
export const Driver = ({ row }) => <Row type='drivers' row={row} />

