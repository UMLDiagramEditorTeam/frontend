export const routePaths = {
  home: '/',
  login: '/login',
  register: '/register',

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
