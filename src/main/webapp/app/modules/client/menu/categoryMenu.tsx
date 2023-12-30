// import React, { useEffect, useState } from 'react';
// import './categoryMenu.scss';
// import { useAppSelector } from 'app/config/store';
// import { getMenu } from 'app/shared/reducers/category';
// import { useDispatch } from 'react-redux';
// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';

// const CategoryMenu = () => {
//   const dispatch = useDispatch();
//   const menus = useAppSelector(state => state.category.menus);
//   const [selectedMenu, setSelectedMenu] = useState(null);

//   useEffect(() => {
//     dispatch(getMenu());
//   }, [dispatch]);

//   const handleMenuEnter = menu => {
//     setSelectedMenu(menu);
//   };

//   const handleMenuLeave = () => {
//     setSelectedMenu(null);
//   };

//   const handleMenuItemClick = (menuItem, subMenus) => {
//     return () => {
//       console.log(`Bạn đã chọn: ${menuItem}`);

//       // if (subMenus && subMenus.length > 0) {
//       //   console.log('Danh mục con:');
//       //   subMenus.forEach(subMenu => {
//       //     console.log(`- ${subMenu.name}`);
//       //   });
//       // }
//     };
//   };

//   return (
//     <Navbar>
//       <Container>
//         <Navbar.Toggle />
//         <Navbar.Collapse>
//           <Nav>
//             {menus &&
//               menus.map((menu, index) => (
//                 <NavDropdown
//                   key={menu.id}
//                   title={menu.name}
//                  // show={selectedMenu === menu}
//                   onMouseEnter={() => handleMenuEnter(menu)}
//                   onMouseLeave={handleMenuLeave}
//                 >
//                   {menu.sub_menu &&
//                     menu.sub_menu.map(subMenu => (
//                       <NavDropdown.Item key={subMenu.id} onClick={handleMenuItemClick(subMenu.name, subMenu.name)}>
//                         {subMenu.name}
//                       </NavDropdown.Item>
//                     ))}
//                 </NavDropdown>
//               ))}
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// export default CategoryMenu;

import 'bootstrap/dist/css/bootstrap.min.css';
import './categoryMenu.scss';
import React, { useEffect, useState } from 'react';
import './categoryMenu.scss';
import { useAppSelector } from 'app/config/store';
import { getMenu } from 'app/shared/reducers/category';
import { useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { subjectClient, updateStateCategoryId } from 'app/shared/reducers/subject';
import { useHistory } from 'react-router-dom';
import { URL_PATH } from 'app/config/path';

const CategoryMenu = () => {
  const dispatch = useDispatch();
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
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mr-auto">
          {menus &&
            menus.map((menu, index) => (
              <NavDropdown
                key={menu.id}
                title={menu.name}
                // show={selectedMenu === menu}
                onMouseEnter={() => handleMenuEnter(menu)}
                onMouseLeave={handleMenuLeave}
              >
                {menu.sub_menu &&
                  menu.sub_menu.map(subMenu => (
                    <NavDropdown.Item key={subMenu.id} onClick={e => handleMenuItemClick(subMenu.id)}>
                      {subMenu.name}
                    </NavDropdown.Item>
                  ))}
              </NavDropdown>
            ))}
        </ul>
        <div className="navbar-nav ml-auto"></div>
      </div>
    </nav>
  );
};

export default CategoryMenu;
