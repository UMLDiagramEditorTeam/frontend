import { createBrowserRouter } from 'react-router-dom';

import { routePaths } from '@/shared/config/routePaths';

import { MainPage } from '@/pages/main/ui/MainPage';
import { LoginPage } from '@/pages/auth/login';
import { RegisterPage } from '@/pages/auth/register';
import { ConfirmAccountPage } from '@/pages/auth/confirm-account';
import { ForgotPasswordPage } from '@/pages/auth/forgot-password';
import { ChangePasswordPage } from '@/pages/auth/change-password';
import { ProjectsPage } from '@/pages/projects/projects-list';
import { EditorPage } from '@/pages/editor/diagram-editor';
import { ProfilePage } from '@/pages/profile';
import { CodeUploadPage } from '@/pages/code-upload';
import { ExportPage } from '@/pages/export';
import { CodeGenerationPage } from '@/pages/code-generation';
import { NotFoundPage } from '@/pages/not-found';

import { PrivateRoute } from './PrivateRoute';

export const router = createBrowserRouter([
  // public
  {
    path: routePaths.login,
    element: <LoginPage />,
  },
  {
    path: routePaths.register,
    element: <RegisterPage />,
  },
  // auth-флоу по ссылкам из писем (тоже публичные — юзер ещё не залогинен)
  {
    path: routePaths.confirmAccount,
    element: <ConfirmAccountPage />,
  },
  {
    path: routePaths.forgotPassword,
    element: <ForgotPasswordPage />,
  },
  {
    path: routePaths.changePassword,
    element: <ChangePasswordPage />,
  },

  {
    path: '/',
    element: <MainPage />,
  },

  // private
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
    element: (
      <PrivateRoute>
        <ExportPage />
      </PrivateRoute>
    ),
  },
  {
    path: routePaths.codeGeneration,
    element: (
      <PrivateRoute>
        <CodeGenerationPage />
      </PrivateRoute>
    ),
  },
  {
    path: routePaths.codeUpload,
    element: (
      <PrivateRoute>
        <CodeUploadPage />
      </PrivateRoute>
    ),
  },

  // catch-all всегда последним
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
