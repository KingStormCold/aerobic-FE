import React from 'react';
import { Alert } from 'reactstrap';
import "../modules/administration/product-management/product-management.scss";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export const AlertMessage = props => {

    const { type, isOpen, onHandleMessage, isNew, timeOut } = props

    if (isOpen) {
        setTimeout(() => {
            onHandleMessage()
        }, timeOut);
    }

    switch (type) {
        case "ADD":
        case "UPDATE":
            return (
                isOpen &&
                <Alert color="success">Bạn đã {isNew ? "Đăng ký" : "Chỉnh sửa"} thành công</Alert>
            );
        case "DELETE":
            return (
                isOpen &&
                <Alert color="success">Bạn đã xoá thành công</Alert>
            );
        case "ERROR":
            return (
                isOpen &&
                <Alert color="danger">Lỗi hệ thống</Alert>
            );
        default:
            return (
                <></>
            );
    }
};

export default AlertMessage;
