import 'bootstrap/dist/css/bootstrap.min.css';
import './categoryMenu.scss';
import React, { useEffect, useState } from 'react';
import './categoryMenu.scss';
import { getMenu } from 'app/shared/reducers/category';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { subjectClient, updateStateCategoryId } from 'app/shared/reducers/subject';
import { useHistory } from 'react-router-dom';
import { URL_PATH } from 'app/config/path';

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

  return (
    <div className="menu-bar">
      <ul>
        {menus &&
          menus.map(menu => (
            <li key={menu.id} title={menu.name} onMouseEnter={() => handleMenuEnter(menu)} onMouseLeave={handleMenuLeave}>
              {menu.name}
              {selectedMenu === menu && (
                <ul className="submenu">
                  {menu.sub_menu &&
                    menu.sub_menu.map(subMenu => (
                      <li key={subMenu.id} onClick={() => handleMenuItemClick(subMenu.id)}>
                        {subMenu.name}
                      </li>
                    ))}
                </ul>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default CategoryMenu;
