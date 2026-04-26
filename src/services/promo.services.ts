import { deleteAPI, getAPI, postFileAPI, putFileAPI } from './axios';

export const getAllPromos = (params: any) => {
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
  return getAPI(`promos?${queryParams}`, {});
};

export const getAllPromosForAdmin = (params: any) => {
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
  return getAPI(`promos/list?${queryParams}`, {});
};

export const getPromoById = (id: string) => {
  return getAPI(`promos/detail/${id}`, {});
};

export const createPromo = (data: any) => {
  return postFileAPI("promos", data);
};

export const updatePromo = (id: string, data: any) => {
  return putFileAPI(`promos/${id}`, data);
};

export const deletePromo = (id: string) => {
  return deleteAPI(`promos/${id}`, {});
};
