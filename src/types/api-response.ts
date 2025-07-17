export interface ISuccessResponse<T> {
  data: T;
  message: string;
  status_code: number;
  success: boolean;
}

export interface IErrorResponse {
  errors: string[];
  message: string;
  path: string;
  timestamp: string;
  title: string;
  status_code: number;
}
