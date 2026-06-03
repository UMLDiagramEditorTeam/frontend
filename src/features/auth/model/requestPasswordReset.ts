import { authApi } from '@/shared/api/client';

/**
 * запрос на сброс пароля. юзер вводит email — бэк шлёт письмо
 * со ссылкой на /auth/password/change (см. EMAIL__PASSWORD_RESET_PATH в .env бэка).
 *
 * ничего осмысленного не возвращает (бэк отдаёт SuccessResponse).
 * НЕ бросаем ошибку если email не найден — это защита от перебора
 * (бэк обычно отвечает 200 в любом случае, чтобы нельзя было узнать
 * какие email зарегистрированы). но если бэк всё же вернёт ошибку —
 * она проксируется наверх через обычный throw.
 */
export const requestPasswordReset = async (email: string): Promise<void> => {
  await authApi.passwordResetCreate({ email });
};
