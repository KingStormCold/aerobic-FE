import Loading from 'app/components/loading';
import { URL_PATH } from 'app/config/path';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { updateStateTitle } from 'app/shared/reducers/category-show';
import { coursesPagination } from 'app/shared/reducers/course';
import { getChildCategories } from 'app/shared/reducers/subject';
import { updateStateOpenToastMessage } from 'app/shared/reducers/toast-message';
import { isJsonString, numberWithCommas } from 'app/shared/util/string-utils';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useHistory } from 'react-router-dom';

export const SubjectDetail = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const loading = useAppSelector(state => state.subject.loading);
  useEffect(() => {
    dispatch(getChildCategories())
  }, [])
  const subjectDetail = useAppSelector(state => state.subject.subject);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [urlImage, setUrlImage] = useState('')
  const title = useAppSelector(state => state.categoryShow.title);

  useEffect(() => {
    if (subjectDetail.id === undefined) {
      history.push(URL_PATH.ADMIN.SUBJECT.MANAGEMENT)
    }
    if (subjectDetail.id) {
      if (isJsonString(subjectDetail?.content)) {
        setEditorState(EditorState.createWithContent(
          convertFromRaw(JSON.parse(subjectDetail?.content))
        ),)
      }
      const price = numberWithCommas(subjectDetail?.promotional_price);
      setSubjectPromotionalPrice(price);
      setCategoryId(String(subjectDetail?.category_id))
      setUrlImage(subjectDetail?.image)
      dispatch(updateStateTitle(title + " > " + subjectDetail?.name));
    }
  }, [subjectDetail])

  const handleAddCourse = () => {
    history.push(URL_PATH.ADMIN.COURSE.MANAGEMENT)
  }
  const [categoryId, setCategoryId] = useState('')

  const onEditorStateChange = (editorState1) => {
    setEditorState(editorState1);
    // document.getElementById("editContent").textContent
  }

  const [subjectPromotionalPrice, setSubjectPromotionalPrice] = useState('');

  return (
    <>
      {loading && <Loading />}
      <h3>
        Subject details
      </h3>
      <div>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="price">Promotion price</Form.Label>
          <Form.Control
            type="text"
            id="price"
            disabled
            value={subjectPromotionalPrice}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="text"
            id="subjectImage"
            disabled
            value={urlImage}
          />
          {urlImage && <Image className='image-thumbnail' src={`${urlImage}`} thumbnail />}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Select aria-label="Danh mục"
            value={categoryId}
            disabled
          >
            <option value={`${subjectDetail?.category_id}`}>{subjectDetail?.category_name}</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check
            type="switch"
            label="Active"
            disabled
            checked={subjectDetail?.status === 1}
          />
        </Form.Group>

        {/* <Form.Group className="mb-3">
          <Form.Label>Nội dung</Form.Label>
          <Editor
            disabled="true"
            editorState={editorState}
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
            onEditorStateChange={onEditorStateChange}
          />
        </Form.Group> */}
        <Button type='submit' variant="success" className='btn-right' onClick={handleAddCourse}>Add courses</Button>
        <br />
        <br />
      </div>
    </>

  );
};

export default SubjectDetail;
