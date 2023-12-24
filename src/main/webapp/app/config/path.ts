export const URL_PATH = {
  LOGIN: '/login',
  LOGOUT: '/logout',
  ADMIN: {
    ENDPOINT: '/admin',
    USER: {
      MANAGEMENT: '/admin/user-management',
      CREATE: '/admin/user-create',
      EDIT: '/admin/user-edit'
    },
    CATEGORY: {
      MANAGEMENT: '/admin/category-management',
      CREATE: '/admin/category-create',
      EDIT: '/admin/category-edit'
    },
    COURSE: {
      MANAGEMENT: '/admin/course-management',
      CREATE: '/admin/course-create',
      EDIT: '/admin/course-edit'
    },
    SUBJECT: {
      MANAGEMENT: '/admin/subject-management',
      CREATE: '/admin/subject-create',
      EDIT: '/admin/subject-edit'
    },
    VIDEO: {
      MANAGEMENT: '/admin/video-management',
      CREATE: '/admin/video-create',
      EDIT: '/admin/video-edit'
    }
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

  }
};
