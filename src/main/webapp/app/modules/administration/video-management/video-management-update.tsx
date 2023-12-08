import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { ValidatedField, ValidatedForm } from 'react-jhipster';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Alert, Button, Col, Row } from 'reactstrap';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { changeName, resetMenuLink } from '../../../shared/reducers/menu';
import { CircularProgress } from '@mui/material';
import { createVideo, reset } from 'app/shared/reducers/video';
import { changeLink } from 'app/shared/reducers/menu';
import { changeName2 } from './../../../shared/reducers/product-detail-path';
import { VIDEO_MANAGEMENT_LINK, VIDEO_MANAGEMENT_LINK_NAME } from 'app/shared/util/menu-link';
import { VIDEO_MANAGEMENT_ADD_LINK_NAME } from './../../../shared/util/menu-link';

export const VideoManagementUpdate = (props: RouteComponentProps<{ categoryId: string }>) => {
    const [isNew] = useState(!props.match.params || !props.match.params.categoryId);
    const dispatch = useAppDispatch();
    const [isInvalid, setIsInvalid] = useState(false);

    const loading = useAppSelector(state => state.videoManagement.loading);
    const updating = useAppSelector(state => state.videoManagement.updating);
    const category = useAppSelector(state => state.videoManagement.video);
    const updateSuccess = useAppSelector(state => state.videoManagement.updateSuccess);
    const errorMessage = useAppSelector(state => state.videoManagement.errorMessage);

    const [displayInSlider, setDisplayInSlider] = useState(false);

    if (updateSuccess) {
        setTimeout(() => {
            handleClose()
        }, 1000);
    }

    useEffect(() => {
        dispatch(reset());
        dispatch(resetMenuLink());

        dispatch(changeName("Thêm video"));
        dispatch(changeLink(VIDEO_MANAGEMENT_LINK));
        dispatch(changeName(VIDEO_MANAGEMENT_LINK_NAME));
        dispatch(changeName2(VIDEO_MANAGEMENT_ADD_LINK_NAME));
    }, [])

    const handleClose = () => {
        props.history.push('/admin/video-management');
    };

    const saveVideo = values => {
        setDisplayInSlider(true)
        const input = { ...values, display_in_slider: displayInSlider }
        setIsInvalid(true);
        dispatch(createVideo(input));
    };

    return (
        <div className='admin-management-update-container'>
            <Row className="justify-content-center mt-4">
                <Col md="6">
                    <h1>
                        Đăng ký video
                    </h1>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col md="6">
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <ValidatedForm onSubmit={saveVideo} defaultValues={category}>

                            <span className='form-group'>Video URL</span>
                            <span className="required-mark">*</span>
                            <ValidatedField
                                type="text"
                                name="video_url"
                                validate={{
                                    required: {
                                        value: true,
                                        message: 'Bạn phải nhập video URL',
                                    }
                                }}
                            />

                            <ValidatedField id="displayInSlider" type="checkbox" name="display_in_slider" value={true} check label="Hiển thị ngoài giao diện" onChange={() => setDisplayInSlider(!displayInSlider)} />
                            <br />

                            {/* BUTTON ==========================================================*/}
                            <Button tag={Link} to="/admin/video-management" replace color="danger">
                                <span className="d-none d-md-inline">
                                    Trở về
                                </span>
                            </Button>
                            &nbsp;
                            <Button color="success" type="submit" disabled={isInvalid || updating}>
                                {isInvalid ? <CircularProgress size={20} /> : "Lưu"}
                            </Button>
                        </ValidatedForm>
                    )}
                </Col>
            </Row>

            <div className='alert-bottom-right'>
                {updateSuccess
                    ? (<Alert color="success">{isNew ? "Đăng ký" : "Chỉnh sửa"} thành công</Alert>)
                    : ''
                }

                {errorMessage
                    ? (<Alert color="danger">{errorMessage}</Alert>)
                    : ''
                }

            </div>
        </div>
    );
};

export default VideoManagementUpdate;
