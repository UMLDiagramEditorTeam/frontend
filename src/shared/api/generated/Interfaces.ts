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
  Attribute,
  AttributeCreate,
  AttributeUpdate,
  ErrorResponse,
  ForbiddenError,
  InlineResponse2005,
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
   * @tags Attributes
   * @name AttributesList
   * @summary Получить все атрибуты интерфейса
   * @request GET:/interfaces/{interfaceId}/attributes
   * @secure
   */
  attributesList = (
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
      InlineResponse2005,
      UnauthorizedError | ForbiddenError | NotFoundError | InternalServerError
    >({
      path: `/interfaces/${interfaceId}/attributes`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Attributes
   * @name AttributesCreate
   * @summary Создать новый атрибут для интерфейса
   * @request POST:/interfaces/{interfaceId}/attributes
   * @secure
   */
  attributesCreate = (
    interfaceId: string,
    data: AttributeCreate,
    params: RequestParams = {},
  ) =>
    this.request<
      Attribute,
      | UnauthorizedError
      | ForbiddenError
      | NotFoundError
      | ErrorResponse
      | InternalServerError
    >({
      path: `/interfaces/${interfaceId}/attributes`,
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
   * @tags Attributes
   * @name AttributesDetail
   * @summary Получить атрибут интерфейса по ID
   * @request GET:/interfaces/{interfaceId}/attributes/{attributeId}
   * @secure
   */
  attributesDetail = (
    interfaceId: string,
    attributeId: string,
    params: RequestParams = {},
  ) =>
    this.request<
      Attribute,
      UnauthorizedError | ForbiddenError | NotFoundError | InternalServerError
    >({
      path: `/interfaces/${interfaceId}/attributes/${attributeId}`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Attributes
   * @name AttributesUpdate
   * @summary Обновить атрибут интерфейса
   * @request PUT:/interfaces/{interfaceId}/attributes/{attributeId}
   * @secure
   */
  attributesUpdate = (
    interfaceId: string,
    attributeId: string,
    data: AttributeUpdate,
    params: RequestParams = {},
  ) =>
    this.request<
      Attribute,
      | UnauthorizedError
      | ForbiddenError
      | NotFoundError
      | ErrorResponse
      | InternalServerError
    >({
      path: `/interfaces/${interfaceId}/attributes/${attributeId}`,
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
   * @tags Attributes
   * @name AttributesDelete
   * @summary Удалить атрибут интерфейса
   * @request DELETE:/interfaces/{interfaceId}/attributes/{attributeId}
   * @secure
   */
  attributesDelete = (
    interfaceId: string,
    attributeId: string,
    params: RequestParams = {},
  ) =>
    this.request<
      void,
      UnauthorizedError | ForbiddenError | NotFoundError | InternalServerError
    >({
      path: `/interfaces/${interfaceId}/attributes/${attributeId}`,
      method: 'DELETE',
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Methods
   * @name MethodsList
   * @summary Получить все методы интерфейса
   * @request GET:/interfaces/{interfaceId}/methods
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
   * @request POST:/interfaces/{interfaceId}/methods
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
   * @request GET:/interfaces/{interfaceId}/methods/{methodId}
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
   * @request PUT:/interfaces/{interfaceId}/methods/{methodId}
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
   * @request DELETE:/interfaces/{interfaceId}/methods/{methodId}
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
