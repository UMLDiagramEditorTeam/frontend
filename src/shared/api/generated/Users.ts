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
  ConflictError,
  ErrorResponse,
  ForbiddenError,
  InlineResponse200,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
  UpdateUserRolesRequest,
  User,
  UserCreate,
  UserUpdate,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

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
   * @request GET:/users/{user_id}
   * @secure
   */
  usersDetail = (userId: string, params: RequestParams = {}) =>
    this.request<
      User,
      UnauthorizedError | ForbiddenError | NotFoundError | InternalServerError
    >({
      path: `/users/${userId}`,
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
   * @request PUT:/users/{user_id}
   * @secure
   */
  usersUpdate = (
    userId: string,
    data: UserUpdate,
    params: RequestParams = {},
  ) =>
    this.request<
      User,
      | UnauthorizedError
      | ForbiddenError
      | NotFoundError
      | ConflictError
      | ErrorResponse
      | InternalServerError
    >({
      path: `/users/${userId}`,
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
   * @request DELETE:/users/{user_id}
   * @secure
   */
  usersDelete = (userId: string, params: RequestParams = {}) =>
    this.request<
      void,
      UnauthorizedError | ForbiddenError | NotFoundError | InternalServerError
    >({
      path: `/users/${userId}`,
      method: 'DELETE',
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Users
   * @name RolesPartialUpdate
   * @summary Обновить роли пользователя
   * @request PATCH:/users/{user_id}/roles
   * @secure
   */
  rolesPartialUpdate = (
    userId: string,
    data: UpdateUserRolesRequest,
    params: RequestParams = {},
  ) =>
    this.request<
      User,
      | UnauthorizedError
      | ForbiddenError
      | NotFoundError
      | ErrorResponse
      | InternalServerError
    >({
      path: `/users/${userId}/roles`,
      method: 'PATCH',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
}
