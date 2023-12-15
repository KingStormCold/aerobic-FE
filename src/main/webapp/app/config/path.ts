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
    }
  },
  API: {
    GET_CATEGORY: '/api/auth/get-categories',
    GET_PARENT_CATEGORY: '/api/auth/get-parent-categories',
    CATEGORY: 'api/auth/category'
  }
};
