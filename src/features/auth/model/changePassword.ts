import { authApi } from '@/shared/api/client';

/**
 * установка нового пароля по коду из письма (завершение сброса).
 * несмотря на название эндпоинта "change", это НЕ смена пароля
 * зная старый — это завершение reset-флоу по ссылке из письма.
 *
 * user_id и code фронт берёт из query-параметров ссылки
 * (/auth/password/change?user_id=...&code=...).
 *
 * password и passwordConfirm бэк сверяет сам; мы их тоже сверяем
 * на форме до отправки, чтобы не гонять заведомо плохой запрос.
 */
export const changePassword = async (
  userId: string,
  code: string,
  password: string,
  passwordConfirm: string,
): Promise<void> => {
  await authApi.passwordChangeCreate({
    user_id: userId,
    code,
    password,
    password_confirm: passwordConfirm,
  });
};
