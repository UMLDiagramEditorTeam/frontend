import { createBrowserRouter } from 'react-router-dom';

import { routePaths } from '@/shared/config/routePaths';

import { MainPage } from '@/pages/main/ui/MainPage';
import { LoginPage } from '@/pages/auth/login';
import { RegisterPage } from '@/pages/auth/register';
import { ProjectsPage } from '@/pages/projects/projects-list';
import { EditorPage } from '@/pages/editor/diagram-editor';
import { ProfilePage } from '@/pages/profile';
import { CodeUploadPage } from '@/pages/code-upload';
import { ExportPage } from '@/pages/export';
import { CodeGenerationPage } from '@/pages/code-generation';

import { PrivateRoute } from './PrivateRoute';

export const router = createBrowserRouter([
  {
    path: routePaths.login,
    element: <LoginPage />,
  },
  {
    path: routePaths.register,
    element: <RegisterPage />,
  },
  {
    path: routePaths.codeUpload,
    element: (
      <PrivateRoute>
        <CodeUploadPage />
      </PrivateRoute>
    ),
  },

  // private
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: routePaths.projects,
    element: (
      <PrivateRoute>
        <ProjectsPage />
      </PrivateRoute>
    ),
  },
  {
    path: routePaths.editor,
    element: (
      <PrivateRoute>
        <EditorPage />
      </PrivateRoute>
    ),
  },
  {
    path: routePaths.profile,
    element: (
      <PrivateRoute>
        <ProfilePage />
      </PrivateRoute>
    ),
  },
  {
    path: routePaths.export,
    element: <ExportPage />,
  },
  {
    path: routePaths.codeGeneration,
    element: <CodeGenerationPage />,
  },
]);
