import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import authentication from './authentication';
import locale from './locale';
import administration from 'app/modules/administration/administration.reducer';
import userManagement from './user';
import category from './category'
import toastMessage from './toast-message'
import subject from './subject'
import course from './course'
import user from './user';

/* jhipster-needle-add-reducer-import - JHipster will add reducer here */
const rootReducer = {
  authentication,
  locale,
  administration,
  userManagement,
  loadingBar,
  category,
  toastMessage,
  subject,
  course,
  user
};

export default rootReducer;
