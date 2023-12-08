import React from 'react';
import { Button, Table, Row, Col } from 'reactstrap';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const DialogConfirm = props => {
  const [open, setOpen] = React.useState(true);
  const handleClose = _state => {
    setOpen(false);
    if (typeof props.callBack === 'function') {
      props.callBack(!!_state);
    }
  };

  return (
    <div>
      <Dialog open={open} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{props?.data?.title || ''}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{props?.data?.description}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="error" onClick={e => handleClose(false)}>
            {props?.data?.lblCancel}
          </Button>
          <Button variant="primary" color="primary" onClick={e => handleClose(true)} autoFocus>
            {props?.data?.lblOk}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default DialogConfirm;
