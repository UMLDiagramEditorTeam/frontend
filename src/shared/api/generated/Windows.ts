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
  Class,
  ClassCreate,
  ClassUpdate,
  ConflictError,
  ErrorResponse,
  ForbiddenError,
  InlineResponse2003,
  InlineResponse2004,
  InlineResponse2007,
  Interface,
  InterfaceCreate,
  InterfaceUpdate,
  InternalServerError,
  NotFoundError,
  Relation,
  RelationCreate,
  RelationUpdate,
  UnauthorizedError,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Windows<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Classes
   * @name ClassesList
   * @summary Получить все классы в окне
   * @request GET:/windows/{windowId}/classes
   * @secure
   */
  classesList = (
    windowId: number,
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
      /** Фильтр по имени класса (частичное совпадение) */
      name?: string;
      /** Фильтр по абстрактности класса */
      is_abstract?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      InlineResponse2003,
      UnauthorizedError | ForbiddenError | NotFoundError | InternalServerError
    >({
      path: `/windows/${windowId}/classes`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Classes
   * @name ClassesCreate
   * @summary Создать новый класс в окне
   * @request POST:/windows/{windowId}/classes
   * @secure
   */
  classesCreate = (
    windowId: number,
    data: ClassCreate,
    params: RequestParams = {},
  ) =>
    this.request<
      Class,
      | UnauthorizedError
      | ForbiddenError
      | NotFoundError
      | ConflictError
      | ErrorResponse
      | InternalServerError
    >({
      path: `/windows/${windowId}/classes`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Classes
   * @name ClassesDetail
   * @summary Получить класс по ID
   * @request GET:/windows/{windowId}/classes/{id}
   * @secure
   */
  classesDetail = (windowId: number, id: number, params: RequestParams = {}) =>
    this.request<
      Class,
      UnauthorizedError | ForbiddenError | NotFoundError | InternalServerError
    >({
      path: `/windows/${windowId}/classes/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Classes
   * @name ClassesUpdate
   * @summary Обновить данные класса
   * @request PUT:/windows/{windowId}/classes/{id}
   * @secure
   */
  classesUpdate = (
    windowId: number,
    id: number,
    data: ClassUpdate,
    params: RequestParams = {},
  ) =>
    this.request<
      Class,
      | UnauthorizedError
      | ForbiddenError
      | NotFoundError
      | ConflictError
      | ErrorResponse
      | InternalServerError
    >({
      path: `/windows/${windowId}/classes/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Classes
   * @name ClassesDelete
   * @summary Удалить класс
   * @request DELETE:/windows/{windowId}/classes/{id}
   * @secure
   */
  classesDelete = (windowId: number, id: number, params: RequestParams = {}) =>
    this.request<
      void,
      UnauthorizedError | ForbiddenError | NotFoundError | InternalServerError
    >({
      path: `/windows/${windowId}/classes/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Interfaces
   * @name InterfacesList
   * @summary Получить все интерфейсы в окне
   * @request GET:/windows/{windowId}/interfaces
   * @secure
   */
  interfacesList = (
    windowId: number,
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
      /** Фильтр по имени интерфейса (частичное совпадение) */
      name?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      InlineResponse2004,
      UnauthorizedError | ForbiddenError | NotFoundError | InternalServerError
    >({
      path: `/windows/${windowId}/interfaces`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Interfaces
   * @name InterfacesCreate
   * @summary Создать новый интерфейс в окне
   * @request POST:/windows/{windowId}/interfaces
   * @secure
   */
  interfacesCreate = (
    windowId: number,
    data: InterfaceCreate,
    params: RequestParams = {},
  ) =>
    this.request<
      Interface,
      | UnauthorizedError
      | ForbiddenError
      | NotFoundError
      | ConflictError
      | ErrorResponse
      | InternalServerError
    >({
      path: `/windows/${windowId}/interfaces`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Interfaces
   * @name InterfacesDetail
   * @summary Получить интерфейс по ID
   * @request GET:/windows/{windowId}/interfaces/{id}
   * @secure
   */
  interfacesDetail = (
    windowId: number,
    id: number,
    params: RequestParams = {},
  ) =>
    this.request<
      Interface,
      UnauthorizedError | ForbiddenError | NotFoundError | InternalServerError
    >({
      path: `/windows/${windowId}/interfaces/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Interfaces
   * @name InterfacesUpdate
   * @summary Обновить данные интерфейса
   * @request PUT:/windows/{windowId}/interfaces/{id}
   * @secure
   */
  interfacesUpdate = (
    windowId: number,
    id: number,
    data: InterfaceUpdate,
    params: RequestParams = {},
  ) =>
    this.request<
      Interface,
      | UnauthorizedError
      | ForbiddenError
      | NotFoundError
      | ConflictError
      | ErrorResponse
      | InternalServerError
    >({
      path: `/windows/${windowId}/interfaces/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Interfaces
   * @name InterfacesDelete
   * @summary Удалить интерфейс
   * @request DELETE:/windows/{windowId}/interfaces/{id}
   * @secure
   */
  interfacesDelete = (
    windowId: number,
    id: number,
    params: RequestParams = {},
  ) =>
    this.request<
      void,
      UnauthorizedError | ForbiddenError | NotFoundError | InternalServerError
    >({
      path: `/windows/${windowId}/interfaces/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Relations
   * @name RelationsList
   * @summary Получить все связи в окне
   * @request GET:/windows/{windowId}/relations
   * @secure
   */
  relationsList = (
    windowId: number,
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
      /** Фильтр по типу связи */
      type?:
        | "association"
        | "aggregation"
        | "composition"
        | "inheritance"
        | "realization"
        | "dependency";
      /** Фильтр по исходному элементу */
      source_id?: number;
      /** Фильтр по целевому элементу */
      target_id?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      InlineResponse2007,
      UnauthorizedError | ForbiddenError | NotFoundError | InternalServerError
    >({
      path: `/windows/${windowId}/relations`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Relations
   * @name RelationsCreate
   * @summary Создать новую связь в окне
   * @request POST:/windows/{windowId}/relations
   * @secure
   */
  relationsCreate = (
    windowId: number,
    data: RelationCreate,
    params: RequestParams = {},
  ) =>
    this.request<
      Relation,
      | UnauthorizedError
      | ForbiddenError
      | NotFoundError
      | ConflictError
      | ErrorResponse
      | InternalServerError
    >({
      path: `/windows/${windowId}/relations`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Relations
   * @name RelationsDetail
   * @summary Получить связь по ID
   * @request GET:/windows/{windowId}/relations/{id}
   * @secure
   */
  relationsDetail = (
    windowId: number,
    id: number,
    params: RequestParams = {},
  ) =>
    this.request<
      Relation,
      UnauthorizedError | ForbiddenError | NotFoundError | InternalServerError
    >({
      path: `/windows/${windowId}/relations/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Relations
   * @name RelationsUpdate
   * @summary Обновить данные связи
   * @request PUT:/windows/{windowId}/relations/{id}
   * @secure
   */
  relationsUpdate = (
    windowId: number,
    id: number,
    data: RelationUpdate,
    params: RequestParams = {},
  ) =>
    this.request<
      Relation,
      | UnauthorizedError
      | ForbiddenError
      | NotFoundError
      | ErrorResponse
      | InternalServerError
    >({
      path: `/windows/${windowId}/relations/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Relations
   * @name RelationsDelete
   * @summary Удалить связь
   * @request DELETE:/windows/{windowId}/relations/{id}
   * @secure
   */
  relationsDelete = (
    windowId: number,
    id: number,
    params: RequestParams = {},
  ) =>
    this.request<
      void,
      UnauthorizedError | ForbiddenError | NotFoundError | InternalServerError
    >({
      path: `/windows/${windowId}/relations/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
}
