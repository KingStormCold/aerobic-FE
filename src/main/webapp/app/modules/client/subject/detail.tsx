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
import { IClientSubjectDetail } from 'app/shared/model/subject';
import Image from 'react-bootstrap/Image';

export const Detail = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.subject.loading);
  const subjectDetailClient = useAppSelector(state => state.subject.subjectDetailClient);
  const [urlImage, setUrlImage] = useState('');

  useEffect(() => {
    if (subjectDetailClient.subject_id) {
      setValue('subject_name', subjectDetailClient?.subject_name);
      setValue('subject_content', subjectDetailClient?.subject_content);
      setUrlImage(subjectDetailClient?.subject_image);
    }
  }, [subjectDetailClient]);

  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<{
    subject_name: string;
    subject_content: string;
  }>();

  const handleBack = () => {
    history.push(URL_PATH.CLIENT.SUBJECT);
  };

  return (
    <>
      {loading && <Loading />}
      <div className="container">
        <h3 className="heading">Khóa học online tại nhà - {watch('subject_name')}</h3>
        <div className="image-container">
          <Image className="image-thumbnail" src={`${urlImage}`} thumbnail />
        </div>
        <p className="subheading">{watch('subject_content')}</p>
        <Button color="dark" variant="dark" className="btn-right mr-10" onClick={handleBack}>
          Bạn có muốn đang ký khóa học
        </Button>
      </div>
    </>
  );
};

export default Detail;
function updateCategory(arg0: { id: number; requestBody: IClientSubjectDetail }): any {
  throw new Error('Function not implemented.');
}
