import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router';

import { tokenService } from '@/features/auth/model/token';
import { getMe } from '@/features/auth/model/getMe';

const initAuth = async () => {
  const access = tokenService.getAccess();

  if (access) {
    try {
      await getMe();
    } catch {
      tokenService.clear();
    }
  }
};

initAuth().finally(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
});
