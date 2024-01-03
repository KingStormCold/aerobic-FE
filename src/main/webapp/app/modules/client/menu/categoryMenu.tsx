import 'bootstrap/dist/css/bootstrap.min.css';
import './categoryMenu.scss';
import React, { useEffect, useState } from 'react';
import './categoryMenu.scss';
import { getMenu } from 'app/shared/reducers/category';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { subjectClient, updateStateCategoryId } from 'app/shared/reducers/subject';
import { useHistory } from 'react-router-dom';
import { URL_PATH } from 'app/config/path';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

const CategoryMenu = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const menus = useAppSelector(state => state.category.menus);
  const [selectedMenu, setSelectedMenu] = useState(null);

  useEffect(() => {
    dispatch(getMenu());
  }, []);

  const handleMenuEnter = menu => {
    setSelectedMenu(menu);
  };

  const handleMenuLeave = () => {
    setSelectedMenu(null);
  };

  const handleMenuItemClick = categoryId => {
    dispatch(subjectClient(categoryId));
    dispatch(updateStateCategoryId(categoryId));
    history.push(URL_PATH.CLIENT.SUBJECT);
  };
  type Anchor = 'top' | 'left' | 'bottom' | 'right';

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  return (
    <div className='menu-header'>
      {/* <div className='menu-client-sub-mui'>
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
      </div> */}
      <div className='menu-hover'>
        {menus?.map((menu, i) => (
          <div className="menu-dropdown" id={String(menu.id)} key={`category-${i}`}>
            <button className="menu-dropbtn">{menu.name}</button>
            <div className="menu-dropdown-content">
              {menu.sub_menu?.map((subMenu, j) => (
                <span className='product-link' id={String(subMenu.id)} key={`categorySub-${j}`} onClick={() => handleMenuItemClick(subMenu.id)}>
                  <a>{subMenu.name}</a>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
    // <div className="menu-bar">
    //   <ul>
    //     {menus &&
    //       menus.map(menu => (
    //         <li key={menu.id} title={menu.name} onMouseEnter={() => handleMenuEnter(menu)} onMouseLeave={handleMenuLeave}>
    //           {menu.name}
    //           {/* {selectedMenu === menu && ( */}
    //           <ul className="submenu">
    //             {menu.sub_menu &&
    //               menu.sub_menu.map(subMenu => (
    //                 <li key={subMenu.id} onClick={() => handleMenuItemClick(subMenu.id)}>
    //                   {subMenu.name}
    //                 </li>
    //               ))}
    //           </ul>
    //           {/* )} */}
    //         </li>
    //       ))}
    //   </ul>
    // </div>
  );
};

export default CategoryMenu;
