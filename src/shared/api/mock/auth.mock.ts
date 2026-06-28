import type { User } from '@/shared/api/generated/data-contracts';

// fake USERS !!!
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
let currentUserId: string | null = null;

const delay = <T>(data: T, ms = 400): Promise<T> =>
  new Promise((res) => setTimeout(() => res(data), ms));

export const mockAuthApi = {
  async loginCreate({ email, password }: { email: string; password: string }) {
    await delay(null);
    const user = fakeUsers.find(
      (u) => u.email === email && u.password === password,
    );
    if (!user) {
      throw new Error('Неверный email или пароль');
    }

    currentUserId = user.id;

    return {
      data: {
        access: 'mock-access-token',
        message: 'Успешный вход в систему',
      },
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

    if (!email.includes('@')) {
      throw new Error('Некорректный формат email');
    }

    if (fakeUsers.find((u) => u.email === email)) {
      throw new Error('Пользователь с таким email уже существует');
    }

    if (password.length < 8) {
      throw new Error('Пароль должен быть не менее 8 символов');
    }

    const newUser: User & { password: string } = {
      id: `mock-uuid-${nextId++}`,
      name,
      email,
      password,
      created_at: new Date().toISOString(),
    };

    fakeUsers.push(newUser);

    currentUserId = newUser.id;

    return {
      data: {
        access: 'mock-access-token',
        message: 'Пользователь успешно зарегистрирован',
      },
    };
  },

  async getAuth() {
    await delay(null);

    const user = currentUserId
      ? fakeUsers.find((u) => u.id === currentUserId)
      : fakeUsers[0];

    if (!user) {
      throw new Error('Пользователь не найден');
    }

    const { password, ...userWithoutPassword } = user;
    void password;

    return { data: userWithoutPassword as User };
  },

  async logoutCreate() {
    await delay(null);

    currentUserId = null;

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

    if (_data.new_password !== _data.confirm_password) {
      throw new Error('Пароли не совпадают');
    }

    if (_data.new_password.length < 8) {
      throw new Error('Новый пароль должен быть не менее 8 символов');
    }

    return {
      data: { message: 'Пароль успешно изменен', status: 'success' },
    };
  },
};
