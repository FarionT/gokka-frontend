import { deleteAPI, getAPI, postAPI, putAPI } from './axios';

export const getAllFAQ = (params: any) => {
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
  return getAPI(`faq?${queryParams}`, {});
};

export const getFAQById = (id: string) => {
  return getAPI(`faq/${id}`, {});
};

export const createFAQ = (data: any) => {
  return postAPI("faq", data);
};

export const updateFAQ = (id: string, data: any) => {
  return putAPI(`faq/${id}`, data);
};

export const deleteFAQ = (id: string) => {
  return deleteAPI(`faq/${id}`, {});
};
