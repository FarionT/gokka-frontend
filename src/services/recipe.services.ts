import { deleteAPI, getAPI, postFileAPI, putFileAPI } from './axios';

export const getAllRecipes = (params: any) => {
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
  return getAPI(`recipes?${queryParams}`, {});
};

export const getRecipeById = (id: string) => {
  return getAPI(`recipes/${id}`, {});
};
export const getRecipeDetailById = (id: string) => {
  return getAPI(`recipes/detail/${id}`, {});
};
export const getRecipeStepById = (params: any) => {
  const queryParams = new URLSearchParams();
  queryParams.append("step", params.step);
  return getAPI(`recipes/step/${params.id}?${queryParams}`, {});
};

export const createRecipe = (data: any) => {
  return postFileAPI("recipes", data);
};

export const updateRecipe = (id: string, data: any) => {
  return putFileAPI(`recipes/${id}`, data);
};

export const deleteRecipe = (id: string) => {
  return deleteAPI(`recipes/${id}`, {});
};
