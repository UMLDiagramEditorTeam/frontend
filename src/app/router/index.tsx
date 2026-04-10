import { createBrowserRouter } from 'react-router-dom';

import { routePaths } from '@/shared/config/routePaths';

import { LoginPage } from '@/pages/auth/login';
import { RegisterPage } from '@/pages/auth/register';
import { ProjectsPage } from '@/pages/projects/projects-list';
import { ProjectDetailsPage } from '@/pages/projects/project-details';
import { EditorPage } from '@/pages/editor/diagram-editor';
import { ProfilePage } from '@/pages/profile';

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

  // private
  {
    path: routePaths.home,
    element: (
      <PrivateRoute>
        <ProjectsPage />
      </PrivateRoute>
    ),
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
    path: routePaths.project,
    element: (
      <PrivateRoute>
        <ProjectDetailsPage />
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
]);
