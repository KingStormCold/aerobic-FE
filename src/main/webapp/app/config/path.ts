export const URL_PATH = {
  LOGIN: '/login',
  LOGOUT: '/logout',
  ADMIN: {
    ENDPOINT: '/admin',
    USER: {
      MANAGEMENT: '/admin/user-management',
      CREATE: '/admin/user-create',
      EDIT: '/admin/user-edit',
    },
    CATEGORY: {
      MANAGEMENT: '/admin/category-management',
      CREATE: '/admin/category-create',
      EDIT: '/admin/category-edit',
    },
    SUBJECT: {
      MANAGEMENT: '/admin/subject-management',
      CREATE: '/admin/subject-create',
      EDIT: '/admin/subject-edit',
      DETAIL: '/admin/subject-detail',
    },
    COURSE: {
      MANAGEMENT: '/admin/subject-detail/course-management',
      CREATE: '/admin/subject-detail/course-create',
      EDIT: '/admin/subject-detail/course-edit',
      DETAIL: '/admin/subject-detail/course-detail',
    },
    VIDEO: {
      MANAGEMENT: '/admin/subject-detail/course-detail/video-management',
      CREATE: '/admin/subject-detail/course-detail/video-create',
      EDIT: '/admin/subject-detail/course-detail/video-edit',
      DETAIL: '/admin/subject-detail/course-detail/video-detail',
    },
    TEST: {
      MANAGEMENT: '/admin/subject-detail/course-detail/video-detail/test-management',
      CREATE: '/admin/subject-detail/course-detail/video-detail/test-create',
      EDIT: '/admin/subject-detail/course-detail/video-detail/test-edit',
    },
  },
  CLIENT: {
    SUBJECT: '/subject',
    SEARCH: '/search',
    VIDEO: '/my-course/videos',
  },
  API: {
    GET_CATEGORY: '/api/auth/get-categories',
    GET_PARENT_CATEGORY: '/api/auth/get-parent-categories',
    CATEGORY: 'api/auth/category',

    COURSES: '/api/auth/courses',
    GET_COURSE: '/api/auth/get-course',
    COURSE: 'api/auth/insert-course',
    DELETE_COURSE: 'api/auth/course',
    SHOW_SUBJECT: 'api/auth/show-subject',

    GET_SUBJECT: '/api/auth/get-subjects',
    GET_CHILD_CATEGORIES: 'api/auth/get-child-categories',
    SUBJECT: 'api/auth/subject',

    GET_USER: '/api/auth/get-users',
    GET_ROLES_USER: '/api/auth/get-roles',
    USER: 'api/auth/user',

    VIDEOS: '/api/auth/videos',
    GET_VIDEO: '/api/auth/get-video',
    VIDEO: 'api/auth/insert-video',
    DELETE_VIDEO: 'api/auth/video',
    SHOW_COURSE_NAME: 'api/auth/show-course-name',

    TESTS: '/api/auth/test',
    GET_TESTS: '/api/auth/get-tests',
    TEST: 'api/auth/insert-test',
    DELETE_TEST: 'api/auth/test',
    SHOW_VIDEO_NAME: 'api/auth/show-video-name',

    ANSWERS: 'api/auth/get-answers',
    GET_ANSWERS: 'api/auth/get-answer',
    ANSWER: 'api/auth/answer',
    SHOW_TEST_NAME: 'api/auth/show-test-name',

    GET_MENU: 'api/client/get-menu',
    CLIENT_COURSES: 'api/client/get-courses',
    CLIENT_SUBJECT: 'api/client/get-subject',
    CLIENT_PAYMENT_COURSE: 'api/client/payment-register',
    CLIENT_PAYMENT_SUBJECT: 'api/client/payment-subject',
    CLIENT_SEARCH: 'api/client/search',
    COURSE_PAYMENT: 'api/client/payment-subject',
    COURSE_VIDEO: 'api/client/get-videos',

    COUNT_VIDEO: 'api/client/count-video',
    UPDATE_VIDEO_USER: 'api/client/update-video-user',
    GET_QUIZ: 'api/client/get-tests',
    CHECK_ANSWER: '/api/client/check-answer',
    REGISTER_USER: 'api/auth/register'
  },
};
