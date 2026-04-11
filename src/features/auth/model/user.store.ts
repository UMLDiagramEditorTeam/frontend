import type { User } from '@/shared/api/generated/data-contracts';

let currentUser: User | null = null;

export const getUser = () => currentUser;

export const setUser = (user: User | null) => {
  currentUser = user;
};

export const clearUser = () => {
  currentUser = null;
};
