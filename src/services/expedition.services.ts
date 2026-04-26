import { deleteAPI, getAPI, postAPI, putAPI } from './axios';

export const getAllExpedition = (params: any) => {
  const queryParams = new URLSearchParams();
  queryParams.append("pagination", String(params.pagination));
  queryParams.append("page", String(params.page));
  queryParams.append("row", String(params.row));
  if (params.search && params.search !== "") {
    queryParams.append("search", String(params.search));
  }
  if (params.sort_by && params.sort_by !== "") {
    queryParams.append("sort_by", String(params.sort_by));
  }
  if (params.sort_type && params.sort_type !== "") {
    queryParams.append("sort_type", String(params.sort_type));
  }
  if (params.role_id && params.role_id !== "") {
    queryParams.append("role_id", String(params.role_id));
  }
  return getAPI(`expeditions?${queryParams}`, {});
};

export const getExpeditionById = (id: string) => {
  return getAPI(`expeditions/${id}`, {});
};

export const createExpedition = (data: any) => {
  return postAPI("expeditions", data);
};

export const updateExpedition = (id: string, data: any) => {
  return putAPI(`expeditions/${id}`, data);
};

export const deleteExpedition = (id: string) => {
  return deleteAPI(`expeditions/${id}`, {});
};
