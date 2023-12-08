import React, { useState } from 'react';
import { Button, Table, Row, Col } from 'reactstrap';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
// import Papa from "papaparse";
import axios from 'axios';

// Allowed extensions for input file
const allowedExtensions = ["csv"];

const DialogAddSpec = props => {
  const { selectedFile, productId } = props
  const [open, setOpen] = React.useState(true);
  const handleClose = _state => {
    setOpen(false);
    if (typeof props.callBack === 'function') {
      props.callBack(!!_state);
    }
  };

  const [selectedOneFile, setSelectedOneFile] = React.useState(null);

  const handleSubmit = async(event) => {
    event.preventDefault()
    const formData = new FormData();
    formData.append("file", selectedOneFile);
    formData.append("productId", productId);
    try {
      const response = await axios({
        method: "post",
        url: "/api/v1/sprecification",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch(error) {
      console.error("err",error)
    }
  }

  const handleFileSelect = (e) => {
         
    // Check if user has entered the file
    if (e.target.files.length) {
        const inputFile = e.target.files[0];
        const fileExtension = inputFile?.type.split("/")[1];
        if (!allowedExtensions.includes(fileExtension)) {
            return;
        }
        selectedFile(e.target.files[0])
        setSelectedOneFile(e.target.files[0])
    }

  }

  return (
    <div>
      <Dialog open={open} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{props?.data?.title || ''}</DialogTitle>
        <DialogContent>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileSelect}/>
                {/* <input type="submit" value="Upload File" /> */}
            </form>
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
export default DialogAddSpec;