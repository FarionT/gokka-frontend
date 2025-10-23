import { deleteAPI, getAPI, postFileAPI, putFileAPI } from './axios';

export const getAllProducts = (params: any) => {
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
  if (params.category && params.category !== "") {
    queryParams.append("category", params.category);
  }
  if (params.subcategory && params.subcategory !== "") {
    queryParams.append("subcategory", params.subcategory);
  }
  return getAPI(`products?${queryParams}`, {});
};

export const getProductCategory = () => {
  return getAPI(`product-categories/`, {});
};

export const getProductByCategory = (category: string, subcategory: string) => {
  return getAPI(`products?pagination=false,category=${category},subcategory=${subcategory}`, {})
}

export const getProductById = (id: string) => {
  return getAPI(`products/${id}`, {});
};

export const getProductVariantById = (id: string) => {
  return getAPI(`products/variant/${id}`, {});
};

export const createProduct = (data: any) => {
  return postFileAPI("products", data);
};

export const updateProduct = (id: string, data: any) => {
  return putFileAPI(`products/${id}`, data);
};

export const deleteProduct = (id: string) => {
  return deleteAPI(`products/${id}`, {});
};
