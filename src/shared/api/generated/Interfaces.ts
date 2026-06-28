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
  ErrorResponse,
  ForbiddenError,
  InlineResponse2006,
  InternalServerError,
  Method,
  MethodCreate,
  MethodUpdate,
  NotFoundError,
  UnauthorizedError,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Interfaces<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Methods
   * @name MethodsList
   * @summary Получить все методы интерфейса
   * @request GET:/interfaces/{interface_id}/methods
   * @secure
   */
  methodsList = (
    interfaceId: string,
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
      InlineResponse2006,
      UnauthorizedError | ForbiddenError | NotFoundError | InternalServerError
    >({
      path: `/interfaces/${interfaceId}/methods`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Methods
   * @name MethodsCreate
   * @summary Создать новый метод для интерфейса
   * @request POST:/interfaces/{interface_id}/methods
   * @secure
   */
  methodsCreate = (
    interfaceId: string,
    data: MethodCreate,
    params: RequestParams = {},
  ) =>
    this.request<
      Method,
      | UnauthorizedError
      | ForbiddenError
      | NotFoundError
      | ErrorResponse
      | InternalServerError
    >({
      path: `/interfaces/${interfaceId}/methods`,
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
   * @tags Methods
   * @name MethodsDetail
   * @summary Получить метод интерфейса по ID
   * @request GET:/interfaces/{interface_id}/methods/{method_id}
   * @secure
   */
  methodsDetail = (
    interfaceId: string,
    methodId: string,
    params: RequestParams = {},
  ) =>
    this.request<
      Method,
      UnauthorizedError | ForbiddenError | NotFoundError | InternalServerError
    >({
      path: `/interfaces/${interfaceId}/methods/${methodId}`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Methods
   * @name MethodsUpdate
   * @summary Обновить метод интерфейса
   * @request PUT:/interfaces/{interface_id}/methods/{method_id}
   * @secure
   */
  methodsUpdate = (
    interfaceId: string,
    methodId: string,
    data: MethodUpdate,
    params: RequestParams = {},
  ) =>
    this.request<
      Method,
      | UnauthorizedError
      | ForbiddenError
      | NotFoundError
      | ErrorResponse
      | InternalServerError
    >({
      path: `/interfaces/${interfaceId}/methods/${methodId}`,
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
   * @tags Methods
   * @name MethodsDelete
   * @summary Удалить метод интерфейса
   * @request DELETE:/interfaces/{interface_id}/methods/{method_id}
   * @secure
   */
  methodsDelete = (
    interfaceId: string,
    methodId: string,
    params: RequestParams = {},
  ) =>
    this.request<
      void,
      UnauthorizedError | ForbiddenError | NotFoundError | InternalServerError
    >({
      path: `/interfaces/${interfaceId}/methods/${methodId}`,
      method: 'DELETE',
      secure: true,
      ...params,
    });
}
