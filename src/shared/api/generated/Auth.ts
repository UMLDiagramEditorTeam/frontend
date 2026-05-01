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

import type {
  ConflictError,
  ErrorResponse,
  InternalServerError,
  LoginRequest,
  LoginResponse,
  LogoutResponse,
  RegisterRequest,
  RegisterResponse,
  UnauthorizedError,
  User,
} from './data-contracts';
import { HttpClient, ContentType } from './http-client';
import type { RequestParams } from './http-client';

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
    this.request<
      RegisterResponse,
      ConflictError | ErrorResponse | InternalServerError
    >({
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
   * @name LoginCreate
   * @summary Вход в систему
   * @request POST:/auth/login
   * @secure
   */
  loginCreate = (data: LoginRequest, params: RequestParams = {}) =>
    this.request<
      LoginResponse,
      UnauthorizedError | ErrorResponse | InternalServerError
    >({
      path: `/auth/login`,
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
   * @name LogoutCreate
   * @summary Выход из системы
   * @request POST:/auth/logout
   * @secure
   */
  logoutCreate = (params: RequestParams = {}) =>
    this.request<LogoutResponse, UnauthorizedError | InternalServerError>({
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
}
