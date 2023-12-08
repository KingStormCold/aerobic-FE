import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CloseIcon from '@mui/icons-material/Close';
import LoginIcon from '@mui/icons-material/Login';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';
import { useHistory } from 'react-router-dom';

type Anchor = 'right';

const RightSideBar = () => {

    const history = useHistory();

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setState({ ...state, [anchor]: open });
            };

    const rightSideBar = (anchor: Anchor) => (
        <Box
            sx={{ width: 280 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >

            <div style={{ textAlign: "right", padding: "10px 10px 0 0" }} onClick={toggleDrawer(anchor, false)}>
                <CloseIcon />
            </div>
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => history.push("/login")}>
                        <ListItemIcon>
                            <LoginIcon style={{ fontSize: "23px", marginLeft: "-5px" }} />
                        </ListItemIcon>
                        <ListItemText primary={"Đăng nhập"} />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton onClick={() => history.push("/")}>
                        <ListItemIcon>
                            <FontAwesomeIcon icon="user" />
                        </ListItemIcon>
                        <ListItemText primary={"Đăng ký"} />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton onClick={() => history.push("/hotline")}>
                        <ListItemIcon>
                            <FontAwesomeIcon className='fa-solid' icon="phone" />
                        </ListItemIcon>
                        <ListItemText primary={"Hotline"} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );
    return (
        <div className="right-side-bar">
            {(['right'] as const).map((anchor) => (
                <React.Fragment key={anchor}>
                    <span onClick={toggleDrawer(anchor, true)}>
                        <FontAwesomeIcon icon="bars" size="lg" className='right-side-bar-icon' />
                    </span>
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        {rightSideBar(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    )
}

export default RightSideBar;
