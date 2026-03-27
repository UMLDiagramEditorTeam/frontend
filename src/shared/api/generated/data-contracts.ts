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

export interface ValidationErrorItem {
  /**
   * Путь к полю с ошибкой
   * @example "body.email"
   */
  field: string;
  /**
   * Описание ошибки
   * @example "Must be a valid email address"
   */
  message: string;
  /**
   * Код ошибки для программной обработки
   * @example "INVALID_FORMAT"
   */
  code?: string;
}

export interface ErrorResponse {
  error: ErrorResponseError;
}

export interface UnauthorizedError {
  error: UnauthorizedErrorError;
}

export interface ForbiddenError {
  error: ForbiddenErrorError;
}

export interface NotFoundError {
  error: NotFoundErrorError;
}

export interface ConflictError {
  error: ConflictErrorError;
}

export interface InternalServerError {
  error: InternalServerErrorError;
}

export interface LoginRequest {
  /**
   * @format email
   * @example "user@example.com"
   */
  email: string;
  /**
   * @format password
   * @example "securePassword123"
   */
  password: string;
}

export interface LoginResponse {
  /** @example "Успешный вход в систему" */
  message: string;
}

export interface RegisterRequest {
  /**
   * @maxLength 100
   * @example "Jane Doe"
   */
  name: string;
  /**
   * @format email
   * @maxLength 100
   * @example "jane@example.com"
   */
  email: string;
  /**
   * @format password
   * @minLength 6
   * @maxLength 50
   * @example "securePassword123"
   */
  password: string;
}

export interface RegisterResponse {
  /** @example "Пользователь успешно зарегистрирован" */
  message: string;
}

export interface LogoutResponse {
  /** @example "Успешный выход из системы" */
  message: string;
}

export interface User {
  /**
   * @format int64
   * @example 1
   */
  id: number;
  /**
   * @maxLength 100
   * @example "John Doe"
   */
  name: string;
  /**
   * @format email
   * @maxLength 100
   * @example "user@example.com"
   */
  email: string;
  /** @format date-time */
  created_at: string;
  /** @format date-time */
  updated_at?: string;
}

export interface UserCreate {
  /**
   * @maxLength 100
   * @example "Jane Doe"
   */
  name: string;
  /**
   * @format email
   * @maxLength 100
   * @example "jane@example.com"
   */
  email: string;
  /**
   * @format password
   * @minLength 6
   * @maxLength 50
   */
  password: string;
}

export interface UserUpdate {
  /** @maxLength 100 */
  name?: string;
  /**
   * @format email
   * @maxLength 100
   */
  email?: string;
  /**
   * @format password
   * @minLength 6
   * @maxLength 50
   */
  password?: string;
}

export interface Project {
  /**
   * @format int64
   * @example 10
   */
  id: number;
  /**
   * @maxLength 200
   * @example "E-commerce System"
   */
  name: string;
  /** @example "Online store UML diagram" */
  description?: string | null;
  /** @default false */
  is_imported: boolean;
  /** @format date-time */
  created_at: string;
  /** @format date-time */
  updated_at?: string;
  /** @format int64 */
  user_id: number;
}

export interface ProjectCreate {
  /**
   * @maxLength 200
   * @example "New Project"
   */
  name: string;
  description?: string | null;
  /** @default false */
  is_imported?: boolean;
}

export interface ProjectUpdate {
  /** @maxLength 200 */
  name?: string;
  description?: string | null;
  is_imported?: boolean;
}

export interface Window {
  /**
   * @format int64
   * @example 5
   */
  id: number;
  /**
   * @maxLength 200
   * @example "Main Class Diagram"
   */
  name: string;
  /** @example "class_diagram" */
  type: "class_diagram" | "sequence_diagram" | "use_case_diagram";
  /** @format date-time */
  created_at: string;
  /** @format date-time */
  updated_at?: string;
  /** @format int64 */
  project_id: number;
}

export interface WindowCreate {
  /**
   * @maxLength 200
   * @example "New Window"
   */
  name: string;
  /** @default "class_diagram" */
  type?: "class_diagram" | "sequence_diagram" | "use_case_diagram";
}

export interface WindowUpdate {
  /** @maxLength 200 */
  name?: string;
  type?: "class_diagram" | "sequence_diagram" | "use_case_diagram";
}

export interface Class {
  /** @format int64 */
  id: number;
  /**
   * @maxLength 100
   * @example "UserService"
   */
  name: string;
  /** @example "public" */
  access_modifier?: "public" | "private" | "protected" | "package" | null;
  /** @default false */
  is_abstract?: boolean;
  /** @example 100 */
  position_x?: number;
  /** @example 150 */
  position_y?: number;
  /** @default 200 */
  width?: number;
  /** @default 150 */
  height?: number;
  /** @format int64 */
  window_id: number;
  /** @format date-time */
  created_at?: string;
  /** @format date-time */
  updated_at?: string;
}

export interface ClassCreate {
  /**
   * @maxLength 100
   * @example "NewClass"
   */
  name: string;
  /** @default "public" */
  access_modifier?: "public" | "private" | "protected" | "package" | null;
  /** @default false */
  is_abstract?: boolean;
  /** @default 0 */
  position_x?: number;
  /** @default 0 */
  position_y?: number;
  /** @default 200 */
  width?: number;
  /** @default 150 */
  height?: number;
}

export interface ClassUpdate {
  /** @maxLength 100 */
  name?: string;
  access_modifier?: "public" | "private" | "protected" | "package" | null;
  is_abstract?: boolean;
  position_x?: number;
  position_y?: number;
  width?: number;
  height?: number;
}

export interface Interface {
  /** @format int64 */
  id: number;
  /**
   * @maxLength 100
   * @example "UserRepository"
   */
  name: string;
  /** @example 100 */
  position_x?: number;
  /** @example 150 */
  position_y?: number;
  /** @default 200 */
  width?: number;
  /** @default 120 */
  height?: number;
  /** @format int64 */
  window_id: number;
  /** @format date-time */
  created_at?: string;
  /** @format date-time */
  updated_at?: string;
}

export interface InterfaceCreate {
  /**
   * @maxLength 100
   * @example "NewInterface"
   */
  name: string;
  /** @default 0 */
  position_x?: number;
  /** @default 0 */
  position_y?: number;
  /** @default 200 */
  width?: number;
  /** @default 120 */
  height?: number;
}

export interface InterfaceUpdate {
  /** @maxLength 100 */
  name?: string;
  position_x?: number;
  position_y?: number;
  width?: number;
  height?: number;
}

export interface Attribute {
  /** @format int64 */
  id: number;
  /**
   * @maxLength 100
   * @example "userName"
   */
  name: string;
  /** @default "public" */
  access_modifier?: "public" | "private" | "protected" | "package" | null;
  /**
   * Тип данных
   * @maxLength 100
   * @example "string"
   */
  type: string;
  /**
   * Константа (final/const)
   * @default false
   */
  is_final?: boolean;
  /** @default false */
  is_static?: boolean;
  /** @example ""guest"" */
  default_value?: string | null;
  /** @format int64 */
  class_id?: number | null;
  /** @format int64 */
  interface_id?: number | null;
  /** @format date-time */
  created_at?: string;
  /** @format date-time */
  updated_at?: string;
}

export interface AttributeCreate {
  /**
   * @maxLength 100
   * @example "count"
   */
  name: string;
  /** @default "public" */
  access_modifier?: "public" | "private" | "protected" | "package" | null;
  /**
   * @maxLength 100
   * @example "int"
   */
  type: string;
  /** @default false */
  is_final?: boolean;
  /** @default false */
  is_static?: boolean;
  default_value?: string | null;
}

export interface AttributeUpdate {
  /** @maxLength 100 */
  name?: string;
  access_modifier?: "public" | "private" | "protected" | "package" | null;
  /** @maxLength 100 */
  type?: string;
  is_final?: boolean;
  is_static?: boolean;
  default_value?: string | null;
}

export interface MethodParameter {
  /** @example "userId" */
  name: string;
  /** @example "int" */
  type: string;
  /** @example "0" */
  default_value?: string | null;
}

export interface Method {
  /** @format int64 */
  id: number;
  /**
   * @maxLength 100
   * @example "calculateTotal"
   */
  name: string;
  /** @default "public" */
  access_modifier?: "public" | "private" | "protected" | "package" | null;
  /**
   * @maxLength 100
   * @example "double"
   */
  return_type: string;
  /** @default false */
  is_final?: boolean;
  /** @default false */
  is_static?: boolean;
  /** @default false */
  is_abstract?: boolean;
  parameters?: MethodParameter[];
  /** @format int64 */
  class_id?: number | null;
  /** @format int64 */
  interface_id?: number | null;
  /** @format date-time */
  created_at?: string;
  /** @format date-time */
  updated_at?: string;
}

export interface MethodCreate {
  /**
   * @maxLength 100
   * @example "processData"
   */
  name: string;
  /** @default "public" */
  access_modifier?: "public" | "private" | "protected" | "package" | null;
  /**
   * @maxLength 100
   * @example "void"
   */
  return_type: string;
  /** @default false */
  is_final?: boolean;
  /** @default false */
  is_static?: boolean;
  /** @default false */
  is_abstract?: boolean;
  parameters?: MethodParameter[];
}

export interface MethodUpdate {
  /** @maxLength 100 */
  name?: string;
  access_modifier?: "public" | "private" | "protected" | "package" | null;
  /** @maxLength 100 */
  return_type?: string;
  is_final?: boolean;
  is_static?: boolean;
  is_abstract?: boolean;
  parameters?: MethodParameter[];
}

export interface Relation {
  /** @format int64 */
  id: number;
  /** @example "inheritance" */
  type:
    | "association"
    | "aggregation"
    | "composition"
    | "inheritance"
    | "realization"
    | "dependency";
  /**
   * ID исходного элемента
   * @format int64
   */
  source_id: number;
  source_type: "class" | "interface";
  /**
   * ID целевого элемента
   * @format int64
   */
  target_id: number;
  target_type: "class" | "interface";
  /** @example "1" */
  source_multiplicity?: string | null;
  /** @example "0..*" */
  target_multiplicity?: string | null;
  /** @example "owner" */
  source_role?: string | null;
  /** @example "items" */
  target_role?: string | null;
  /** @format int64 */
  window_id: number;
  /** @format date-time */
  created_at?: string;
  /** @format date-time */
  updated_at?: string;
}

export interface RelationCreate {
  type:
    | "association"
    | "aggregation"
    | "composition"
    | "inheritance"
    | "realization"
    | "dependency";
  /** @format int64 */
  source_id: number;
  source_type: "class" | "interface";
  /** @format int64 */
  target_id: number;
  target_type: "class" | "interface";
  source_multiplicity?: string | null;
  target_multiplicity?: string | null;
  source_role?: string | null;
  target_role?: string | null;
}

export interface RelationUpdate {
  type?:
    | "association"
    | "aggregation"
    | "composition"
    | "inheritance"
    | "realization"
    | "dependency";
  source_multiplicity?: string | null;
  target_multiplicity?: string | null;
  source_role?: string | null;
  target_role?: string | null;
}

export interface PaginatedResponse {
  /** Массив данных */
  data: object[];
  /**
   * Общее количество записей
   * @example 100
   */
  total: number;
  /**
   * Текущая страница
   * @example 1
   */
  page: number;
  /**
   * Количество элементов на странице
   * @example 20
   */
  limit: number;
  /**
   * Общее количество страниц
   * @example 5
   */
  total_pages: number;
}

export type InlineResponse200 = PaginatedResponse & {
  data?: User[];
};

export type InlineResponse2001 = PaginatedResponse & {
  data?: Project[];
};

export type InlineResponse2002 = PaginatedResponse & {
  data?: Window[];
};

export type InlineResponse2003 = PaginatedResponse & {
  data?: Class[];
};

export type InlineResponse2004 = PaginatedResponse & {
  data?: Interface[];
};

export type InlineResponse2005 = PaginatedResponse & {
  data?: Attribute[];
};

export type InlineResponse2006 = PaginatedResponse & {
  data?: Method[];
};

export type InlineResponse2007 = PaginatedResponse & {
  data?: Relation[];
};

export interface ErrorResponseError {
  /** @example "VALIDATION_ERROR" */
  code: string;
  /** @example "Ошибка валидации запроса" */
  message: string;
  details?: ValidationErrorItem[];
}

export interface UnauthorizedErrorError {
  /** @example "UNAUTHORIZED" */
  code: string;
  /** @example "Требуется аутентификация" */
  message: string;
}

export interface ForbiddenErrorError {
  /** @example "FORBIDDEN" */
  code: string;
  /** @example "Недостаточно прав для доступа к ресурсу" */
  message: string;
}

export interface NotFoundErrorError {
  /** @example "NOT_FOUND" */
  code: string;
  /** @example "Ресурс не найден" */
  message: string;
}

export interface ConflictErrorError {
  /** @example "CONFLICT" */
  code: string;
  /** @example "Ресурс с таким именем уже существует" */
  message: string;
}

export interface InternalServerErrorError {
  /** @example "INTERNAL_SERVER_ERROR" */
  code: string;
  /** @example "Внутренняя ошибка сервера" */
  message: string;
}
