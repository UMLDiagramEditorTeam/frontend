/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import {
  AccountConfirmationRequest,
  ChangePasswordRequest,
  ConflictError,
  ErrorResponse,
  InternalServerError,
  LoginRequest,
  PasswordResetRequest,
  RegisterRequest,
  SuccessResponse,
  TokenResponse,
  UnauthorizedError,
  User,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Auth<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Auth
   * @name RegisterCreate
   * @summary Регистрация нового пользователя
   * @request POST:/auth/register
   * @secure
   */
  registerCreate = (data: RegisterRequest, params: RequestParams = {}) =>
    this.request<User, ConflictError | ErrorResponse | InternalServerError>({
      path: `/auth/register`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth
   * @name ConfirmAccountCreate
   * @summary Подтверждение аккаунта
   * @request POST:/auth/confirm-account
   * @secure
   */
  confirmAccountCreate = (
    data: AccountConfirmationRequest,
    params: RequestParams = {},
  ) =>
    this.request<User, ErrorResponse | InternalServerError>({
      path: `/auth/confirm-account`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth
   * @name LoginCreate
   * @summary Вход в систему
   * @request POST:/auth/login
   * @secure
   */
  loginCreate = (data: LoginRequest, params: RequestParams = {}) =>
    this.request<
      TokenResponse,
      UnauthorizedError | ErrorResponse | InternalServerError
    >({
      path: `/auth/login`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.UrlEncoded,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth
   * @name LogoutCreate
   * @summary Выход из системы
   * @request POST:/auth/logout
   * @secure
   */
  logoutCreate = (params: RequestParams = {}) =>
    this.request<SuccessResponse, UnauthorizedError | InternalServerError>({
      path: `/auth/logout`,
      method: 'POST',
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth
   * @name RefreshCreate
   * @summary Обновление access-токена
   * @request POST:/auth/refresh
   * @secure
   */
  refreshCreate = (params: RequestParams = {}) =>
    this.request<TokenResponse, UnauthorizedError | InternalServerError>({
      path: `/auth/refresh`,
      method: 'POST',
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth
   * @name GetAuth
   * @summary Информация о текущем пользователе
   * @request GET:/auth/me
   * @secure
   */
  getAuth = (params: RequestParams = {}) =>
    this.request<User, UnauthorizedError | InternalServerError>({
      path: `/auth/me`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth
   * @name PasswordResetCreate
   * @summary Запрос сброса пароля
   * @request POST:/auth/password/reset
   * @secure
   */
  passwordResetCreate = (
    data: PasswordResetRequest,
    params: RequestParams = {},
  ) =>
    this.request<SuccessResponse, ErrorResponse | InternalServerError>({
      path: `/auth/password/reset`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth
   * @name PasswordChangeCreate
   * @summary Смена пароля пользователя
   * @request POST:/auth/password/change
   * @secure
   */
  passwordChangeCreate = (
    data: ChangePasswordRequest,
    params: RequestParams = {},
  ) =>
    this.request<
      SuccessResponse,
      ErrorResponse | UnauthorizedError | InternalServerError
    >({
      path: `/auth/password/change`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
}
