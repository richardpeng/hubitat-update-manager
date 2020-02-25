import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const Editor = ({ open, onClose, onSave, importUrl }) => {
  const [newUrl, setNewUrl] = useState(importUrl);

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Import URL</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Update the Import URL for update checks.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Import URL"
          type="text"
          fullWidth
          value={newUrl}
          onChange={e => setNewUrl(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={() => {
          onSave(newUrl).then(onClose)
        }} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Editor;
