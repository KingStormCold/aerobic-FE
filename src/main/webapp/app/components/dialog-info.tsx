import React from 'react';
import { Button, Table, Row, Col } from 'reactstrap';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import draftToHtmlPuri from "draftjs-to-html";


const DialogInfo = props => {
  const [open, setOpen] = React.useState(true);
  const handleClose = _state => {
    setOpen(false);
    if (typeof props.callBack === 'function') {
      props.callBack(!!_state);
    }
  };

  const createMarkup = () => {
    return { __html: props?.data?.description };
  }

  return (
    <div>
      <Dialog open={open} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{props?.data?.title || ''}</DialogTitle>
        <DialogContent>
          {/* <DialogContentText dangerouslySetInnerHTML={createMarkup()}></DialogContentText> */}
          <DialogContentText
            dangerouslySetInnerHTML={{
              __html: draftToHtmlPuri(
                (props?.data != null && props?.data?.description?.sort_description !== null && props?.data?.description?.sort_description !== "") ? JSON.parse(props?.data?.description) : ''
              )
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="error" onClick={e => handleClose(false)}>
            {props?.data?.lblCancel}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default DialogInfo;
