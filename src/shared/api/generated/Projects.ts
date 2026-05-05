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
  ErrorResponse,
  ForbiddenError,
  InlineResponse2001,
  InlineResponse2002,
  InternalServerError,
  NotFoundError,
  Project,
  ProjectCreate,
  ProjectUpdate,
  UnauthorizedError,
  Window,
  WindowCreate,
  WindowUpdate,
} from './data-contracts';
import { HttpClient, ContentType } from './http-client';
import type { RequestParams } from './http-client';


export class Projects<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Projects
   * @name ProjectsList
   * @summary Получить список проектов текущего пользователя
   * @request GET:/projects
   * @secure
   */
  projectsList = (
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
      /** Фильтр по названию проекта (частичное совпадение) */
      name?: string;
      /** Фильтр по флагу импорта */
      is_imported?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<InlineResponse2001, UnauthorizedError | InternalServerError>({
      path: `/projects`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Projects
   * @name ProjectsCreate
   * @summary Создать новый проект
   * @request POST:/projects
   * @secure
   */
  projectsCreate = (data: ProjectCreate, params: RequestParams = {}) =>
    this.request<
      Project,
      UnauthorizedError | ErrorResponse | InternalServerError
    >({
      path: `/projects`,
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
   * @tags Projects
   * @name ProjectsDetail
   * @summary Получить проект по ID
   * @request GET:/projects/{id}
   * @secure
   */
  projectsDetail = (id: string, params: RequestParams = {}) =>
    this.request<
      Project,
      UnauthorizedError | ForbiddenError | NotFoundError | InternalServerError
    >({
      path: `/projects/${id}`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Projects
   * @name ProjectsUpdate
   * @summary Обновить данные проекта
   * @request PUT:/projects/{id}
   * @secure
   */
  projectsUpdate = (
    id: string,
    data: ProjectUpdate,
    params: RequestParams = {},
  ) =>
    this.request<
      Project,
      | UnauthorizedError
      | ForbiddenError
      | NotFoundError
      | ErrorResponse
      | InternalServerError
    >({
      path: `/projects/${id}`,
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
   * @tags Projects
   * @name ProjectsDelete
   * @summary Удалить проект
   * @request DELETE:/projects/{id}
   * @secure
   */
  projectsDelete = (id: string, params: RequestParams = {}) =>
    this.request<
      void,
      UnauthorizedError | ForbiddenError | NotFoundError | InternalServerError
    >({
      path: `/projects/${id}`,
      method: 'DELETE',
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Windows
   * @name WindowsList
   * @summary Получить все окна проекта
   * @request GET:/projects/{projectId}/windows
   * @secure
   */
  windowsList = (
    projectId: string,
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
      /** Фильтр по типу окна */
      type?: 'class_diagram' | 'sequence_diagram' | 'use_case_diagram';
    //уточнить типы
    },
    params: RequestParams = {},
  ) =>
    this.request<
      InlineResponse2002,
      UnauthorizedError | ForbiddenError | NotFoundError | InternalServerError
    >({
      path: `/projects/${projectId}/windows`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Windows
   * @name WindowsCreate
   * @summary Создать новое окно в проекте
   * @request POST:/projects/{projectId}/windows
   * @secure
   */
  windowsCreate = (
    projectId: string,
    data: WindowCreate,
    params: RequestParams = {},
  ) =>
    this.request<
      Window,
      | UnauthorizedError
      | ForbiddenError
      | NotFoundError
      | ErrorResponse
      | InternalServerError
    >({
      path: `/projects/${projectId}/windows`,
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
   * @tags Windows
   * @name WindowsDetail
   * @summary Получить окно по ID
   * @request GET:/projects/{projectId}/windows/{id}
   * @secure
   */
  windowsDetail = (projectId: string, id: string, params: RequestParams = {}) =>
    this.request<
      Window,
      UnauthorizedError | ForbiddenError | NotFoundError | InternalServerError
    >({
      path: `/projects/${projectId}/windows/${id}`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Windows
   * @name WindowsUpdate
   * @summary Обновить данные окна
   * @request PUT:/projects/{projectId}/windows/{id}
   * @secure
   */
  windowsUpdate = (
    projectId: string,
    id: string,
    data: WindowUpdate,
    params: RequestParams = {},
  ) =>
    this.request<
      Window,
      | UnauthorizedError
      | ForbiddenError
      | NotFoundError
      | ErrorResponse
      | InternalServerError
    >({
      path: `/projects/${projectId}/windows/${id}`,
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
   * @tags Windows
   * @name WindowsDelete
   * @summary Удалить окно
   * @request DELETE:/projects/{projectId}/windows/{id}
   * @secure
   */
  windowsDelete = (projectId: string, id: string, params: RequestParams = {}) =>
    this.request<
      void,
      UnauthorizedError | ForbiddenError | NotFoundError | InternalServerError
    >({
      path: `/projects/${projectId}/windows/${id}`,
      method: 'DELETE',
      secure: true,
      ...params,
    });
}
