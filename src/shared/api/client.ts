import { tokenService } from '@/features/auth/model/token';
import { Auth } from './generated/Auth';
import { Users } from './generated/Users';
import { Projects } from './generated/Projects';
import { Windows } from './generated/Windows';
import { Classes } from './generated/Classes';
import { Interfaces } from './generated/Interfaces';

const apiConfig = {
  baseURL: import.meta.env.VITE_API_URL,
  securityWorker: async () => {
    const access = tokenService.getAccess();
    return access ? { headers: { Authorization: `Bearer ${access}` } } : {};
  },
};

export const api = {
  auth: new Auth(apiConfig),
  users: new Users(apiConfig),
  projects: new Projects(apiConfig),
  windows: new Windows(apiConfig),
  classes: new Classes(apiConfig),
  interfaces: new Interfaces(apiConfig),
};

export const authApi = api.auth;
export const usersApi = api.users;
export const projectsApi = api.projects;
