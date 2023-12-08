import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import React, { useEffect } from 'react';
import { Editor } from "react-draft-wysiwyg";
import { Button } from 'reactstrap';
import './dialog-edit.scss';
import { isJsonString } from 'app/shared/util/string-utils';


const DialogForm = props => {
  const { setContent, isEdit, content, setEditorSaveState } = props

  const [open, setOpen] = React.useState(true);
  const [editorState, setEditorState] = React.useState(EditorState.createEmpty());

  const onEditorStateChange = (editorState1) => {
    setEditorState(editorState1);
    setEditorSaveState(JSON.stringify(convertToRaw(editorState1.getCurrentContent())))
  }

  const handleClose = _state => {
    setOpen(false);
    if (typeof props.callBack === 'function') {
      props.callBack(!!_state);
    }
  };

  useEffect(() => {
    if (isEdit) {
      if (isJsonString(content)) {
        setEditorState(EditorState.createWithContent(
          convertFromRaw(JSON.parse(content))
        ),)
      } else {
        setEditorState(EditorState.createEmpty())
      }

    } else {
      setEditorState(EditorState.createEmpty())
    }
  }, [props?.data])

  if (isEdit && !content) return (<>loading...</>)

  return (
    <div>
      <Dialog open={open} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{props?.data?.title || ''}</DialogTitle>
        <DialogContent className='hidden-img-insert-icon'>
          <Editor
            editorState={editorState}
            onEditorStateChange={onEditorStateChange}
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
          />
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
export default DialogForm;
