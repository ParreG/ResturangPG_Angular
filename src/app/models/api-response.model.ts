export interface ApiErrorResponse {
  message: string;
  errors?: { [key: string]: string[] };
}

export interface ApiSuccessResponse<T> {
  data: T;
  message?: string;
}
