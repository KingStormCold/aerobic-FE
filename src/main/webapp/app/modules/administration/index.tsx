import React from 'react';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import Menus from './menu';
import HeaderAdmin from './header-admin';
import Dashboard from './dashboard/dashboard';
import { Switch } from 'react-router-dom';
import { Storage } from 'react-jhipster';
import PrivateRoute from 'app/shared/auth/private-route';
import { useAppSelector } from 'app/config/store';
import Loading from 'app/components/loading';
import { CONSTANT } from 'app/config/constants';
import CategoryManagement from './category/category';
import CategoryCreate from './category/category_create';
import CategoryEdit from './category/category_edit';
import CourseManagement from './course/course';
import CourseCreate from './course/course_create';
import CourseEdit from './course/course_edit';

import SubjectManagement from './subject/subject';
import SubjectCreate from './subject/subject_create';
import SubjectEdit from './subject/subject_edit';

import UserCreate from './user/user_create';
import UserEdit from './user/user_edit';
import UserManagement from './user/user';
import VideoManagement from './video/video';
 import  VideoEdit  from './video/video_edit';
import VideoCreate from './video/video_create';
import TestManagement from './test/test';
import TestCreate from './test/test_create';
import TestEdit from './test/test_edit';


const Routes = ({ match }) => {
  const haveRoles = useAppSelector(state => state.authentication.roles);
  const loading = useAppSelector(state => state.authentication.loading);
  const roleUser = haveRoles.includes(CONSTANT.ROLES.USER)
  const roleCategory = haveRoles.includes(CONSTANT.ROLES.CATEGORY)
  const roleSubject = haveRoles.includes(CONSTANT.ROLES.SUBJECT)
  const roleCourse = haveRoles.includes(CONSTANT.ROLES.COURSE)
  const roleVideo = haveRoles.includes(CONSTANT.ROLES.VIDEO)
  const roleTest = haveRoles.includes(CONSTANT.ROLES.TEST)

  return (
    <>
      {loading ? <Loading /> :
        <>
          <Menus />
          <div className="wrapper d-flex flex-column min-vh-100 bg-light">
            <HeaderAdmin />
            <div className="body flex-grow-1 px-3">
              <Switch>
                <ErrorBoundaryRoute exact path={`${match.url}/`} component={Dashboard} />
                ({roleUser && <PrivateRoute exact path={`${match.url}/user-management`} component={UserManagement} />})
                ({roleUser && <PrivateRoute exact path={`${match.url}/user-create`} component={UserCreate} />})
                ({roleUser && <PrivateRoute exact path={`${match.url}/user-edit`} component={UserEdit} />})

                ({roleCategory && <PrivateRoute exact path={`${match.url}/category-management`} component={CategoryManagement} />})
                ({roleCategory && <PrivateRoute exact path={`${match.url}/category-create`} component={CategoryCreate} />})
                ({roleCategory && <PrivateRoute exact path={`${match.url}/category-edit`} component={CategoryEdit} />})

                ({roleCourse && <PrivateRoute exact path={`${match.url}/course-management`} component={CourseManagement} />})
                ({roleCourse && <PrivateRoute exact path={`${match.url}/course-create`} component={CourseCreate} />})
                ({roleCourse && <PrivateRoute exact path={`${match.url}/course-edit`} component={CourseEdit} />})

                ({roleSubject && <PrivateRoute exact path={`${match.url}/subject-management`} component={SubjectManagement} />})
                ({roleSubject && <PrivateRoute exact path={`${match.url}/subject-create`} component={SubjectCreate} />})
                ({roleSubject && <PrivateRoute exact path={`${match.url}/subject-edit`} component={SubjectEdit} />})

                ({roleVideo && <PrivateRoute exact path={`${match.url}/video-management`} component={VideoManagement} />})
                ({roleVideo && <PrivateRoute exact path={`${match.url}/video-create`} component={VideoCreate} />})
                ({roleVideo && <PrivateRoute exact path={`${match.url}/video-edit`} component={VideoEdit} />})

                ({roleTest && <PrivateRoute exact path={`${match.url}/test-management`} component={TestManagement} />})
                ({roleTest && <PrivateRoute exact path={`${match.url}/test-create`} component={TestCreate} />})
                ({roleTest && <PrivateRoute exact path={`${match.url}/test-edit`} component={TestEdit} />})
              </Switch>
            </div>
          </div>
        </>
      }
    </>
  )
}

export default Routes;
