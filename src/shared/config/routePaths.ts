export const routePaths = {
  home: '/',
  login: '/login',
  register: '/register',

  // auth-флоу по ссылкам из писем.
  // ВАЖНО: эти пути ДОЛЖНЫ совпадать с тем, что бэк кладёт в письма:
  //   EMAIL__ACCOUNT_CONFIRMATION_PATH=/auth/confirm-account
  //   EMAIL__PASSWORD_RESET_PATH=/auth/password/change
  // если поменять здесь — ссылки из писем приведут на 404
  confirmAccount: '/auth/confirm-account',
  changePassword: '/auth/password/change',
  // эта страница в письме НЕ фигурирует — на неё юзер попадает с логина
  // по клику "Забыли пароль?", путь произвольный
  forgotPassword: '/auth/forgot-password',

  projects: '/projects',
  profile: '/profile',

  editor: '/projects/:projectId',
  codeUpload: '/projects/:projectId/import-code',
  export: '/projects/:projectId/export',
  codeGeneration: '/projects/:projectId/generate-code',

  projectEditor: (projectId: string | number) => `/projects/${projectId}`,
  projectCodeUpload: (projectId: string | number) =>
    `/projects/${projectId}/import-code`,
  projectExport: (projectId: string | number) =>
    `/projects/${projectId}/export`,
  projectCodeGeneration: (projectId: string | number) =>
    `/projects/${projectId}/generate-code`,
};
