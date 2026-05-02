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
  /** JWT access token */
  access: string;
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
  /** JWT access token */
  access: string;
}

export interface LogoutResponse {
  /** @example "Успешный выход из системы" */
  message: string;
  /** @example "success" */
  status?: string;
}

export interface User {
  /**
   * @format uuid
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  id: string;
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
  name: string;
  /**
   * @format email
   * @maxLength 100
   */
  email: string;
}

export interface Project {
  /**
   * @format uuid
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  id: string;
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
  /** @format uuid */
  user_id: string;
}

export interface ProjectCreate {
  /**
   * @maxLength 200
   * @example "New Project"
   */
  name: string;
  description?: string | null;
  /** @default false */
  is_imported: boolean;
}

export interface ProjectUpdate {
  /** @maxLength 200 */
  name: string;
  description?: string | null;
  is_imported: boolean;
}

export interface Window {
  /**
   * @format uuid
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  id: string;
  /**
   * @maxLength 200
   * @example "Main Class Diagram"
   */
  name: string;
  /** @example "class_diagram" */
  type: 'class_diagram' | 'sequence_diagram';
  /** @format date-time */
  created_at: string;
  /** @format date-time */
  updated_at?: string;
  /** @format uuid */
  project_id: string;
}

export interface WindowCreate {
  /**
   * @maxLength 200
   * @example "New Window"
   */
  name: string;
  /** @default "class_diagram" */
  type: 'class_diagram' | 'sequence_diagram';
}

export interface WindowUpdate {
  /** @maxLength 200 */
  name: string;
  type: 'class_diagram' | 'sequence_diagram';
}

export interface Tile {
  /** @format uuid */
  id: string;
  /** @default false */
  is_correct?: boolean;
  /** @example 100 */
  position_x?: number;
  /** @example 150 */
  position_y?: number;
  /** @default 200 */
  width?: number;
  /** @default 150 */
  height?: number;
  /** @format date-time */
  created_at?: string;
  /** @format date-time */
  updated_at?: string;
}

export interface TileCreate {
  /** @format uuid */
  id: string;
  /** @default false */
  is_correct?: boolean;
  /** @example 100 */
  position_x?: number;
  /** @example 150 */
  position_y?: number;
  /** @default 200 */
  width?: number;
  /** @default 150 */
  height?: number;
}

export interface TileUpdate {
  /** @default false */
  is_correct?: boolean;
  position_x?: number;
  position_y?: number;
  width?: number;
  height?: number;
}

export interface Class {
  /** @format uuid */
  id: string;
  /**
   * @maxLength 100
   * @example "UserService"
   */
  name: string;
  /** @example "public" */
  access_modifier?: 'public' | 'private' | 'protected' | null;
  /** @default false */
  is_abstract?: boolean;
  /** @format uuid */
  window_id: string;
  /** @format uuid */
  tile_id: string;
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
  access_modifier?: 'public' | 'private' | 'protected' | null;
  /** @default false */
  is_abstract?: boolean;
}

export interface ClassUpdate {
  /** @maxLength 100 */
  name: string;
  access_modifier?: 'public' | 'private' | 'protected' | null;
  is_abstract?: boolean;
}

export interface Interface {
  /** @format uuid */
  id: string;
  /**
   * @maxLength 100
   * @example "UserRepository"
   */
  name: string;
  /** @format uuid */
  tile_id: string;
  /** @format uuid */
  window_id: string;
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
}

export interface InterfaceUpdate {
  /** @maxLength 100 */
  name: string;
}

export interface Attribute {
  /** @format uuid */
  id: string;
  /**
   * @maxLength 100
   * @example "userName"
   */
  name: string;
  /** @default "public" */
  access_modifier?: 'public' | 'private' | 'protected' | null;
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
  /** @format uuid */
  class_id?: string | null;
  /** @format uuid */
  interface_id?: string | null;
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
  access_modifier?: 'public' | 'private' | 'protected' | null;
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
  name: string;
  access_modifier?: 'public' | 'private' | 'protected' | null;
  /** @maxLength 100 */
  type: string;
  is_final?: boolean;
  is_static?: boolean;
  default_value?: string | null;
}

export interface MethodArgument {
  /** @example "userId" */
  name: string;
  /** @example "int" */
  type: string;
  /** @example "0" */
  default_value?: string | null;
}

export interface Method {
  /** @format uuid */
  id: string;
  /**
   * @maxLength 100
   * @example "calculateTotal"
   */
  name: string;
  /** @default "public" */
  access_modifier?: 'public' | 'private' | 'protected' | null;
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
  parameters?: MethodArgument[];
  /** @format uuid */
  class_id?: string | null;
  /** @format uuid */
  interface_id?: string | null;
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
  access_modifier?: 'public' | 'private' | 'protected' | null;
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
  parameters?: MethodArgument[];
}

export interface MethodUpdate {
  /** @maxLength 100 */
  name: string;
  access_modifier?: 'public' | 'private' | 'protected' | null;
  /** @maxLength 100 */
  return_type: string;
  is_final?: boolean;
  is_static?: boolean;
  is_abstract?: boolean;
  parameters?: MethodArgument[];
}

export interface Relation {
  /** @format uuid */
  id: string;
  type: 'relation' | 'realization';
  /** @format uuid */
  begin_class_id?: string;
  /** @format uuid */
  end_class_id?: string;
  /** @format uuid */
  begin_interface_id?: string;
  /** @format uuid */
  end_interface_id?: string;
  begin_type:
    | 'one'
    | 'many'
    | 'one_only_one'
    | 'one_or_many'
    | 'zero_or_one'
    | 'zero_or_many'
    | null;
  end_type:
    | 'one'
    | 'many'
    | 'one_only_one'
    | 'one_or_many'
    | 'zero_or_one'
    | 'zero_or_many'
    | null;
  /** @format uuid */
  window_id: string;
  /** @format date-time */
  created_at?: string;
  /** @format date-time */
  updated_at?: string;
}

export interface RelationCreate {
  type: 'relation' | 'realization';
  /** @format uuid */
  begin_class_id?: string;
  /** @format uuid */
  end_class_id?: string;
  /** @format uuid */
  begin_interface_id?: string;
  /** @format uuid */
  end_interface_id?: string;
  begin_type:
    | 'one'
    | 'many'
    | 'one_only_one'
    | 'one_or_many'
    | 'zero_or_one'
    | 'zero_or_many'
    | null;
  end_type:
    | 'one'
    | 'many'
    | 'one_only_one'
    | 'one_or_many'
    | 'zero_or_one'
    | 'zero_or_many'
    | null;
}

export interface RelationUpdate {
  type: 'relation' | 'realization';
  begin_type:
    | 'one'
    | 'many'
    | 'one_only_one'
    | 'one_or_many'
    | 'zero_or_one'
    | 'zero_or_many'
    | null;
  end_type:
    | 'one'
    | 'many'
    | 'one_only_one'
    | 'one_or_many'
    | 'zero_or_one'
    | 'zero_or_many'
    | null;
}

export interface ChangePasswordRequest {
  /**
   * Текущий пароль пользователя
   * @format password
   * @minLength 8
   * @example "oldPassword123"
   */
  current_password: string;
  /**
   * Новый пароль
   * @format password
   * @minLength 8
   * @example "newPassword456"
   */
  new_password: string;
  /**
   * Подтверждение нового пароля
   * @format password
   * @minLength 8
   * @example "newPassword456"
   */
  confirm_password: string;
}

export interface ChangePasswordResponse {
  /**
   * Сообщение об успешной смене пароля
   * @example "Password changed successfully"
   */
  message?: string;
  /** @example "success" */
  status?: string;
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
