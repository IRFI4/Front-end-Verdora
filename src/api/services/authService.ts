import instance from '@api/axiosInstance';
import type { UserType } from '@/types/user';
import type { ApiResponse } from '@/types/api';
import type { RegisterPayload } from '@/types/auth';

export const authService = {
  register: (data: RegisterPayload) =>
    instance.post<ApiResponse<UserType>>('/auth/register', data),

  login: (data: { email: string; password: string }) =>
    instance.post<ApiResponse<UserType>>('/auth/login', data),

  logout: () => instance.post('/auth/logout'),

  fetchMe: () => instance.get<ApiResponse<UserType>>('/users/current-user'),
};
