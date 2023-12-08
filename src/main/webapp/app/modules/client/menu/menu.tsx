import './menu.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getCategory, updateReloadData, chooseCategory } from 'app/shared/reducers/menu-client';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import { useHistory } from 'react-router-dom'
import { Storage } from 'react-jhipster';

const DATA_CATEGORY_ID = 'product_list_data_category_id_key'

const Menu = () => {

    const categories = useAppSelector(state => state.menuClient.category);
    const reloadData = useAppSelector(state => state.menuClient.reloadData);
    const history = useHistory();

    const [openExp, setOpenExp] = React.useState([]);

    const handleClickExpand = (categoryIdClicked) => {
        let hasCategory = false;
        for (const cateId of openExp) {
            if (openExp.includes(categoryIdClicked)) {
                hasCategory = true;
                break;
            }
        }
        if (hasCategory === false) {
            const temp: string[] = []
            temp.push(categoryIdClicked)
            setOpenExp(temp)
            // const temp: string [] = [];
            // for (const iterator of openExp) {
            //     temp.push(iterator)
            // }
            // temp.push(categoryIdClicked)
            // setOpenExp(temp)
        }
        else {
            const temp: string[] = []
            temp.splice(categoryIdClicked)
            setOpenExp(temp)
            // let temp: string [] = [];
            // for (const iterator of openExp) {
            //     temp.push(iterator)
            // }
            // temp = removeArrayByValue(temp,categoryIdClicked);
            // setOpenExp(temp)
        }
    };

    function removeArrayByValue(arr, value) {
        for (let index = 0; index < arr.length; index++) {
            if (arr[index] === value) {
                arr.splice(index, 1)
                break;
            }
        }
        return arr;
    }

    type Anchor = 'top' | 'left' | 'bottom' | 'right';

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getCategory())
    }, [])

    const handleReload = (categoryObj) => {
        dispatch(updateReloadData(true));
        dispatch(chooseCategory(categoryObj))
        // toggleDrawer('left', false)
        setState({ ...state, 'left': false });
        Storage.local.set(DATA_CATEGORY_ID, categoryObj.cateId);
        history.push(`/product-list`);

    }

    const handleExpand = (categoryId) => {
        if (openExp.includes(categoryId))
            return true;
        else {
            return false;
        }
    }

    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event &&
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setState({ ...state, [anchor]: open });
            };

    const list = (anchor: Anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
        //   onClick={toggleDrawer(anchor, false)}
        //   onKeyDown={toggleDrawer(anchor, false)}
        >
            <div style={{
                "margin": "10px 20px",

            }}>
                <span style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                }}>
                    Danh mục
                </span>
                <span style={{
                    fontSize: "20px",
                    float: "right",
                }}>
                    {/* <FontAwesomeIcon icon="window-close" onClick={() => setState({ ...state, 'left': false })} /> */}
                    <CloseIcon onClick={() => setState({ ...state, 'left': false })} />
                </span>
            </div>
            <List>
                {categories?.map((category, i) => (
                    <span id={category.category_id} key={`category-${i}`}>
                        <ListItemButton
                            onClick={() => handleClickExpand(category.category_id)}
                            style={{
                                marginLeft: "-30px",
                                backgroundColor: handleExpand(category.category_id) ? '#4b71a2' : 'white',
                                color: handleExpand(category.category_id) ? 'white' : 'Black',
                            }}
                        >
                            <ListItemIcon>
                            </ListItemIcon>
                            <ListItemText primary={category.category_parent_name} />
                            {handleExpand(category.category_id) ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={handleExpand(category.category_id)} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {category.category_child?.map((categorySub, j) => (
                                    <Link to={`/product-list/${categorySub.category_id}`} id={categorySub.category_id} key={`categorySub-${j}`}
                                        onClick={() => handleReload({
                                            cateId: categorySub.category_id,
                                            cateName: categorySub.category_child_name
                                        })}
                                    >
                                        <ListItemButton sx={{ pl: 2 }} id={categorySub.category_id} key={`categorySub-${j}`}>
                                            <ListItemIcon>
                                            </ListItemIcon>
                                            <ListItemText primary={categorySub.category_child_name} />
                                        </ListItemButton>
                                    </Link>
                                ))}
                            </List>
                        </Collapse>
                    </span>
                ))}
            </List>
        </Box>
    );

    return (
        <div className='menu-header'>
            <div className='menu-client-sub-mui'>
                {(['left'] as const).map((anchor) => (
                    <React.Fragment key={'left'}>
                        <span >
                            <FontAwesomeIcon className='menu-client-sub-mui-icon' icon="bars" onClick={toggleDrawer('left', true)} />
                        </span>
                        <SwipeableDrawer
                            anchor={anchor}
                            open={state[anchor]}
                            onClose={toggleDrawer(anchor, false)}
                            onOpen={toggleDrawer(anchor, true)}
                        >
                            {list(anchor)}
                        </SwipeableDrawer>
                    </React.Fragment>
                ))}
            </div>
            <div className='menu-hover'>
                {categories?.map((category, i) => (
                    <div className="menu-dropdown" id={category.category_id} key={`category-${i}`}>
                        <button className="menu-dropbtn">{category.category_parent_name}</button>
                        <div className="menu-dropdown-content">
                            {category.category_child?.map((categorySub, j) => (
                                <span className='product-link' id={categorySub.category_id} key={`categorySub-${j}`} onClick={() => handleReload({
                                    cateId: categorySub.category_id,
                                    cateName: categorySub.category_child_name
                                })}>
                                    <a>{categorySub.category_child_name}</a>
                                </span>
                                // <div className='product-link' id={categorySub.category_id} key={`categorySub-${j}`} onClick={() => handleReload({
                                //     cateId: categorySub.category_id,
                                //     cateName: categorySub.category_child_name
                                // })}>
                                //     <a>{categorySub.category_child_name}</a>
                                // </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className='menu-link-wrap'>
                <Link to="/" className='menu-link'>
                    <div className='menu-function-content'>
                        <div className='menu-function-content-text'>
                            <span className='menu-function-content-span'>Trả góp</span>
                        </div>
                    </div>
                </Link>
                <Link to="/thu-cu-doi-moi" className='menu-link'>
                    <div className='menu-function-content'>
                        <div className='menu-function-content-text'>
                            <span >Mua cũ đổi mới</span>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
};

export default Menu;
