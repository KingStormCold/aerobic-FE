import React, { useState } from 'react';
import { Button, Table, Row, Col } from 'reactstrap';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


const DialogShowSpec = props => {
  const { specification } = props
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
            {/* <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileSelect}/>
                <input type="submit" value="Upload File" />
            </form> */}
            <Table hover responsive striped>
              <thead>
                <tr>
                  <th style={{width: "30%"}} >Tên</th>
                  <th style={{width: "70%"}}>Giá trị</th>
                </tr>
              </thead>
              {specification?.map((spec, i) => (
                <tr id={i} key={`spec-${i}`}>
                   <td>
                      {spec.specification.specification_name}
                    </td>
                    <td>
                      {spec.specification.specification_value}
                    </td>
                </tr>
                ))}
            </Table>

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
export default DialogShowSpec;