import { Auth } from './generated/Auth';
import { Users } from './generated/Users';
import { Projects } from './generated/Projects';
import { Windows } from './generated/Windows';
import { Classes } from './generated/Classes';
import { Interfaces } from './generated/Interfaces';

const TOKEN_KEY = 'accessToken';

export const setAccessToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getAccessToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const clearAccessToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

const apiConfig = {
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',

  withCredentials: true,

  securityWorker: async () => {
    const token = getAccessToken();
    if (token) {
      return {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    }
  },
};

const authApiInstance = new Auth(apiConfig);
const usersApiInstance = new Users(apiConfig);
const projectsApiInstance = new Projects(apiConfig);
const windowsApiInstance = new Windows(apiConfig);
const classesApiInstance = new Classes(apiConfig);
const interfacesApiInstance = new Interfaces(apiConfig);

export const api = {
  auth: authApiInstance,
  users: usersApiInstance,
  projects: projectsApiInstance,
  windows: windowsApiInstance,
  classes: classesApiInstance,
  interfaces: interfacesApiInstance,
};

export const authApi = authApiInstance;
