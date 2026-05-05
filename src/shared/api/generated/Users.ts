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
  ForbiddenError,
  InlineResponse200,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
  User,
  UserCreate,
  UserUpdate,
} from './data-contracts';
import { HttpClient, ContentType } from './http-client';
import type { RequestParams } from './http-client';


export class Users<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Users
   * @name UsersList
   * @summary Получить список пользователей (только для админов)
   * @request GET:/users
   * @secure
   */
  usersList = (
    query?: {
      /**
       * Номер страницы (с 1)
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * Количество элементов на странице
       * @min 1
       * @max 100
       * @default 20
       */
      limit?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      InlineResponse200,
      UnauthorizedError | ForbiddenError | InternalServerError
    >({
      path: `/users`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Users
   * @name UsersCreate
   * @summary Создать нового пользователя (только для админов)
   * @request POST:/users
   * @secure
   */
  usersCreate = (data: UserCreate, params: RequestParams = {}) =>
    this.request<
      User,
      | UnauthorizedError
      | ForbiddenError
      | ConflictError
      | ErrorResponse
      | InternalServerError
    >({
      path: `/users`,
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
   * @tags Users
   * @name UsersDetail
   * @summary Получить пользователя по ID
   * @request GET:/users/{id}
   * @secure
   */
  usersDetail = (id: string, params: RequestParams = {}) =>
    this.request<
      User,
      UnauthorizedError | ForbiddenError | NotFoundError | InternalServerError
    >({
      path: `/users/${id}`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Users
   * @name UsersUpdate
   * @summary Обновить данные пользователя
   * @request PUT:/users/{id}
   * @secure
   */
  usersUpdate = (id: string, data: UserUpdate, params: RequestParams = {}) =>
    this.request<
      User,
      | UnauthorizedError
      | ForbiddenError
      | NotFoundError
      | ConflictError
      | ErrorResponse
      | InternalServerError
    >({
      path: `/users/${id}`,
      method: 'PUT',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Users
   * @name UsersDelete
   * @summary Удалить пользователя
   * @request DELETE:/users/{id}
   * @secure
   */
  usersDelete = (id: string, params: RequestParams = {}) =>
    this.request<
      void,
      UnauthorizedError | ForbiddenError | NotFoundError | InternalServerError
    >({
      path: `/users/${id}`,
      method: 'DELETE',
      secure: true,
      ...params,
    });
}
