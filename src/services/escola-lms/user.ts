// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/**  GET /api/admin/users */
export async function users(
  params: {
    // query
    page?: number;
    per_page?: number;
    search?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.UserList>('/api/admin/users', {
    params,
    method: 'GET',
    ...(options || {}),
  });
}

/**  GET /api/admin/users */
export async function user(id: number, options?: { [key: string]: any }) {
  return request<API.UserRow>(`/api/admin/users/${id}`, {
    method: 'GET',
    ...(options || {}),
  });
}
