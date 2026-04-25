export type ApiResponse<T> = {
  timestamp: string;
  status: number;
  message: string;
  data: T;
};
