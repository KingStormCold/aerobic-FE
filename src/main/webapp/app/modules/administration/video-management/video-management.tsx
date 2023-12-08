
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Pagination } from '@mui/material';
import { Truncate } from '@primer/react';
import DialogConfirm from 'app/components/dialog-confirm';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { delCategory, getCategories, resetError } from 'app/shared/reducers/category';
import { changeName, resetMenuLink } from 'app/shared/reducers/menu';
import { delVideo, getVideos, resetStatus } from 'app/shared/reducers/video';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button, Table } from 'reactstrap';

export const VideoManagement = () => {
    const dispatch = useAppDispatch();
    const [isOpenConfirm, setIsOpenConfirm] = React.useState(false);
    const [dataConfirm, setDataConfirm] = React.useState(null);
    const [deleteVideoId, setDeleteVideoId] = React.useState('');
    const [acceptLeave, setAcceptLeave] = React.useState(false);

    const page = {
        page: 0,
        size: 10,
        sort: 'createdDate'
    }

    const handlegetpage = (p) => {
        setTimeout(() => {
            page.page = p;
            dispatch(getVideos(page));
            return;
        }, 100);
        return;
    };

    const handleChange = (e, p) => {
        handlegetpage(p - 1)
    };

    let pageSize = 1;
    let pageNum = 1;

    const videos = useAppSelector(state => state.videoManagement.data);
    const pagination = useAppSelector(state => state.videoManagement.pagination);
    const updateSuccess = useAppSelector(state => state.videoManagement.updateSuccess);
    const delSuccess = useAppSelector(state => state.videoManagement.delSuccess);

    useEffect(() => {
        dispatch(resetMenuLink());
        dispatch(changeName("Quản lý video"));
        dispatch(getVideos(page))
    }, [])

    useEffect(() => {
        dispatch(getVideos(page))
    }, [delSuccess])

    if (pagination) {
        pageSize = pagination.total_page
        pageNum = pagination.page_num
    }

    function handleDelete(videoId) {
        setIsOpenConfirm(true);
        setDeleteVideoId(videoId)
        const _data = {
            title: "Xóa video",
            description: "Bạn thật sự muốn xóa video này không?",
            lblCancel: "Hủy",
            lblOk: "Đồng ý",
        };
        setDataConfirm(_data);
        return false;
    }

    const handleCallBackConfirm = _res => {
        setIsOpenConfirm(crt => false);
        if (_res) {
            setAcceptLeave(crt => true);
            dispatch(delVideo(deleteVideoId));

            // auto hidden alert after 1s
            setTimeout(() => {
                dispatch(resetStatus())
            }, 3000);
        }
    };

    return (
        <div>
            <Link to="/admin/video-management/add">
                <Button id="addBtn" style={{ marginLeft: "-3px", backgroundColor: "rgb(5 123 7)", color: "white" }} title="Thêm">
                    <FontAwesomeIcon icon="plus" />
                </Button>
            </Link>
            <hr />
            <Table hover responsive striped>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Video URL</th>
                        <th>Nguời tạo</th>
                        <th>Ngày tạo</th>
                        <th>Người sửa</th>
                        <th>Ngày sửa</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {videos?.map((video, i) => (
                        <tr id={video.video_id} key={`video-${i}`}>
                            <th scope="row">{(i + 1) + pageNum * 10}</th>
                            <td>
                                <Truncate maxWidth={250} title={video.video_url}>
                                    {video.video_url}
                                </Truncate>
                            </td>
                            <td>{video.created_by}</td>
                            <td>{video.created_date}</td>
                            <td>{video.updated_by}</td>
                            <td>{video.updated_date}</td>
                            <td>
                                <Button size='small' id="delBtn" style={{ marginLeft: "10px", backgroundColor: "#ff3333", color: "white" }}
                                    onClick={() => handleDelete(video.video_id)}
                                    title="Xóa">
                                    <FontAwesomeIcon icon="trash" />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {isOpenConfirm && <DialogConfirm data={dataConfirm} callBack={handleCallBackConfirm} />}
            <Pagination
                count={pageSize}
                size="large"
                page={pageNum + 1}
                variant="outlined"
                shape="rounded"
                onChange={handleChange}
                style={{ float: "right" }}
            />

            <div className="alert-bottom-right">
                <Alert isOpen={delSuccess} color="success">Bạn đã xoá thành công</Alert>
            </div>
        </div>
    );
};

export default VideoManagement;