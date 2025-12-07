import { deleteAPI, getAPI, postFileAPI, putFileAPI } from './axios';

export const getAllTestimonials = (params: any) => {
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
  return getAPI(`testimonials?${queryParams}`, {});
};

export const getTestimonialById = (id: string) => {
  return getAPI(`testimonials/${id}`, {});
};
export const createTestimonial = (data: any) => {
  return postFileAPI("testimonials", data);
};

export const updateTestimonial = (id: string, data: any) => {
  return putFileAPI(`testimonials/${id}`, data);
};

export const deleteTestimonial = (id: string) => {
  return deleteAPI(`testimonials/${id}`, {});
};
