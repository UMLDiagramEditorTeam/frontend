const ACCESS_KEY = 'access_token';

export const tokenService = {
  getAccess: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(ACCESS_KEY);
  },

  set: (access: string): void => {
    localStorage.setItem(ACCESS_KEY, access);
  },

  clear: (): void => {
    localStorage.removeItem(ACCESS_KEY);
  },

  isAuthenticated: (): boolean => {
    return !!tokenService.getAccess();
  },
};
