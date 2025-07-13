export interface ISuccessResponse<T> {
  data: T;
  message: string;
  status_code: number;
  success: boolean;
}

export interface IErrorResponse<T> {
  errors: T;
  message: string;
  path: string;
  timestamp: string;
  title: string;
}
