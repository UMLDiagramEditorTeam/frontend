import type { User } from '@/shared/api/generated/data-contracts';

// fake USER !!!
const fakeUsers: (User & { password: string })[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440000',
    name: 'Test User',
    email: 'test@example.com',
    password: '123456',
    created_at: new Date('2025-01-01').toISOString(),
  },
];

let nextId = 2;

const delay = <T>(data: T, ms = 400): Promise<T> =>
  new Promise((res) => setTimeout(() => res(data), ms));

export const mockAuthApi = {
  async loginCreate({ email, password }: { email: string; password: string }) {
    await delay(null);
    const user = fakeUsers.find(
      (u) => u.email === email && u.password === password,
    );
    if (!user) {
      throw new Error('Invalid credentials');
    }
    return {
      data: { access: 'mock-access-token', message: 'Успешный вход в систему' },
    };
  },

  async registerCreate({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) {
    await delay(null);
    if (fakeUsers.find((u) => u.email === email)) {
      throw new Error('Email already exists');
    }

    const newUser: User & { password: string } = {
      id: `mock-uuid-${nextId++}`,
      name,
      email,
      password,
      created_at: new Date().toISOString(),
    };
    fakeUsers.push(newUser);

    return {
      data: {
        access: 'mock-access-token',
        message: 'Пользователь успешно зарегистрирован',
      },
    };
  },

  async getAuth() {
    await delay(null);
    const { password, ...user } = fakeUsers[0];
    void password;
    return { data: user as User };
  },

  async logoutCreate() {
    await delay(null);
    return {
      data: { message: 'Успешный выход из системы', status: 'success' },
    };
  },

  async passwordChangeCreate(_data: {
    current_password: string;
    new_password: string;
    confirm_password: string;
  }) {
    void _data;
    await delay(null);
    return {
      data: { message: 'Password changed successfully', status: 'success' },
    };
  },
};
