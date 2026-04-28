export type ApiResponse<T> = {
  timestamp: string;
  status: number;
  message: string;
  data: T;
};

export type ApiErrorResponse = {
  timestamp: string;
  status: number;
  message: string;
  errors?: Record<string, string>;
};
