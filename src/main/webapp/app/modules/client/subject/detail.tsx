import { SelectChangeEvent } from '@mui/material';
import Loading from 'app/components/loading';
import { URL_PATH } from 'app/config/path';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { getCourse, getCoursesClient } from 'app/shared/reducers/course';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { numberWithCommas } from 'app/shared/util/string-utils';
import { REX } from 'app/config/constants';
import { subjectClient } from 'app/shared/reducers/subject';

export const Detail = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.subject.loading);
  const subjectDetailClient = useAppSelector(state => state.subject.subjectDetailClient);

  useEffect(() => {
    if (subjectDetailClient.subject_id) {
      setValue('subjectName', subjectDetailClient?.subjectName);
      setValue('subject_content', subjectDetailClient?.subject_content);
      setValue('subject_image', subjectDetailClient?.subject_image);
    }
  }, [subjectDetailClient]);

  const { setValue } = useForm();

  return (
    <>
      {loading && <Loading />}
      <div>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="subjectName">Tên khóa học</Form.Label>
            <Form.Control type="text" id="subjectName" readOnly />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="subject_content">Mô tả khóa học</Form.Label>
            <Form.Control type="text" id="subject_content" readOnly />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="subject_image">Cấp độ</Form.Label>
            <Form.Control type="text" id="subject_image" readOnly />
          </Form.Group>
        </Form>
      </div>
    </>
  );
};

export default Detail;
