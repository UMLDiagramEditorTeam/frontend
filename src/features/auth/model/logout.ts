import { tokenService } from './token';

export const logout = async (): Promise<void> => {
  // уточнить у бэка будет ли инвалидации cookie
  // пока просто убираю access на клиенте
  tokenService.clear();
};
