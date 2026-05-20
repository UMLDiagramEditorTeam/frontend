export const routePaths = {
  home: '/',
  login: '/login',
  register: '/register',

  projects: '/projects',

  editor: '/projects/:projectId',

  projectEditor: (projectId: string | number) => `/projects/${projectId}`,

  codeUpload: '/import-code',
  export: '/export',
  codeGeneration: '/generate-code',

  profile: '/profile',
};
