import { Auth } from '@/shared/api/generated/Auth';
import { httpClient } from '@/shared/api/client';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const authApi = new Auth(httpClient as any);
