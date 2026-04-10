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

export class Classes<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Attributes
   * @name AttributesList
   * @summary Получить все атрибуты класса
   * @request GET:/classes/{classId}/attributes
   * @secure
   */
  attributesList = (
    classId: string,
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
      path: `/classes/${classId}/attributes`,
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
   * @summary Создать новый атрибут для класса
   * @request POST:/classes/{classId}/attributes
   * @secure
   */
  attributesCreate = (
    classId: string,
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
      path: `/classes/${classId}/attributes`,
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
   * @summary Получить атрибут класса по ID
   * @request GET:/classes/{classId}/attributes/{attributeId}
   * @secure
   */
  attributesDetail = (
    classId: string,
    attributeId: string,
    params: RequestParams = {},
  ) =>
    this.request<
      Attribute,
      UnauthorizedError | ForbiddenError | NotFoundError | InternalServerError
    >({
      path: `/classes/${classId}/attributes/${attributeId}`,
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
   * @summary Обновить атрибут класса
   * @request PUT:/classes/{classId}/attributes/{attributeId}
   * @secure
   */
  attributesUpdate = (
    classId: string,
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
      path: `/classes/${classId}/attributes/${attributeId}`,
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
   * @summary Удалить атрибут класса
   * @request DELETE:/classes/{classId}/attributes/{attributeId}
   * @secure
   */
  attributesDelete = (
    classId: string,
    attributeId: string,
    params: RequestParams = {},
  ) =>
    this.request<
      void,
      UnauthorizedError | ForbiddenError | NotFoundError | InternalServerError
    >({
      path: `/classes/${classId}/attributes/${attributeId}`,
      method: 'DELETE',
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Methods
   * @name MethodsList
   * @summary Получить все методы класса
   * @request GET:/classes/{classId}/methods
   * @secure
   */
  methodsList = (
    classId: string,
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
      path: `/classes/${classId}/methods`,
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
   * @summary Создать новый метод для класса
   * @request POST:/classes/{classId}/methods
   * @secure
   */
  methodsCreate = (
    classId: string,
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
      path: `/classes/${classId}/methods`,
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
   * @summary Получить метод класса по ID
   * @request GET:/classes/{classId}/methods/{methodId}
   * @secure
   */
  methodsDetail = (
    classId: string,
    methodId: string,
    params: RequestParams = {},
  ) =>
    this.request<
      Method,
      UnauthorizedError | ForbiddenError | NotFoundError | InternalServerError
    >({
      path: `/classes/${classId}/methods/${methodId}`,
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
   * @summary Обновить метод класса
   * @request PUT:/classes/{classId}/methods/{methodId}
   * @secure
   */
  methodsUpdate = (
    classId: string,
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
      path: `/classes/${classId}/methods/${methodId}`,
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
   * @summary Удалить метод класса
   * @request DELETE:/classes/{classId}/methods/{methodId}
   * @secure
   */
  methodsDelete = (
    classId: string,
    methodId: string,
    params: RequestParams = {},
  ) =>
    this.request<
      void,
      UnauthorizedError | ForbiddenError | NotFoundError | InternalServerError
    >({
      path: `/classes/${classId}/methods/${methodId}`,
      method: 'DELETE',
      secure: true,
      ...params,
    });
}
