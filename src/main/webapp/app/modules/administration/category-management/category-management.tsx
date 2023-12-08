
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Pagination } from '@mui/material';
import { Truncate } from '@primer/react';
import DialogConfirm from 'app/components/dialog-confirm';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { delCategory, getCategories, resetError } from 'app/shared/reducers/category';
import { changeName, resetMenuLink } from 'app/shared/reducers/menu';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button, Table } from 'reactstrap';
export const CategoryManagement = () => {
    const dispatch = useAppDispatch();
    const [isOpenConfirm, setIsOpenConfirm] = React.useState(false);
    const [dataConfirm, setDataConfirm] = React.useState(null);
    const [deleteCategoryId, setDeleteCategoryId] = React.useState('');
    const [acceptLeave, setAcceptLeave] = React.useState(false);

    const page = {
        page: 0,
        size: 10,
        sort: 'categoryRoot'
    }

    const handlegetpage = (p) => {
        setTimeout(() => {
            page.page = p;
            dispatch(getCategories(page));
            return;
        }, 100);
        return;
    };

    const handleChange = (e, p) => {
        handlegetpage(p - 1)
    };

    let pageSize = 1;
    let pageNum = 1;

    const categories = useAppSelector(state => state.categoryManagement.data);
    const pagination = useAppSelector(state => state.categoryManagement.pagination);
    const delError = useAppSelector(state => state.categoryManagement.delError);
    const updateSuccess = useAppSelector(state => state.categoryManagement.updateSuccess);
    const delSuccess = useAppSelector(state => state.categoryManagement.delSuccess);

    useEffect(() => {
        dispatch(resetMenuLink());
        dispatch(changeName("Quản lý danh mục"));
        if (!delError) dispatch(getCategories(page));
    }, [])

    useEffect(() => {
        dispatch(getCategories(page));
    }, [delError, updateSuccess])

    if (categories === undefined) {
        dispatch(getCategories(page));
    }

    if (pagination) {
        pageSize = pagination.total_page
        pageNum = pagination.page_num
    }

    function handleDelCategory(categoryId, categoryParent, categoryChildred) {
        let categoryName = categoryChildred;
        if (!categoryName)
            categoryName = categoryParent
        setIsOpenConfirm(true);
        setDeleteCategoryId(categoryId);
        const _data = {
            title: "Xóa danh mục: " + categoryName,
            description: "Bạn thật sự muốn xóa danh mục " + categoryName + " này không?",
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
            dispatch(delCategory(deleteCategoryId));

            // auto hidden alert after 1s
            setTimeout(() => {
                dispatch(resetError())
            }, 3000);
        }
    };

    return (
        <div>
            <Link to="/admin/category-management/add">
                <Button id="addBtn" style={{ marginLeft: "-3px", backgroundColor: "rgb(5 123 7)", color: "white" }} title="Thêm">
                    <FontAwesomeIcon icon="plus" />
                </Button>
            </Link>
            <hr />
            <Table hover responsive striped>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Tên danh mục</th>
                        <th>Danh mục cha</th>
                        <th>Nguời tạo</th>
                        <th>Ngày tạo</th>
                        <th>Người sửa</th>
                        <th>Ngày sửa</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {categories?.map((category, i) => (
                        <tr id={category.category_id} key={`category-${i}`}>
                            <th scope="row">{(i + 1) + pageNum * 10}</th>
                            <td>
                                <Truncate maxWidth={150} title={category.category_child}>
                                    {category.category_child}
                                </Truncate>
                            </td>
                            <td>
                                <Truncate maxWidth={150} title={category.category_parent}>
                                    {category.category_parent}
                                </Truncate>
                            </td>
                            <td>{category.created_by}</td>
                            <td>{category.created_date}</td>
                            <td>{category.updated_by}</td>
                            <td>{category.updated_date}</td>
                            <td>
                                <Link to={`/admin/category-management/${category.category_id}/edit`} >
                                    <Button size='small' id="editBtn" style={{ marginLeft: "-3px", backgroundColor: "#ffe200" }}>
                                        <FontAwesomeIcon icon="user-edit" />
                                    </Button>
                                </Link>
                                <Button size='small' id="delBtn" style={{ marginLeft: "10px", backgroundColor: "#ff3333", color: "white" }}
                                    onClick={() => handleDelCategory(category.category_id, category.category_parent, category.category_child)}
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
                <Alert isOpen={delError} color="danger">Bạn phải xoá toàn bộ danh mục con trước</Alert>
                <Alert isOpen={delSuccess} color="success">Bạn đã xoá thành công</Alert>
            </div>
        </div>
    );
};

export default CategoryManagement;