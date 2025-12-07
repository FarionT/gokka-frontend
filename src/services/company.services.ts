import { getAPI, putAPI } from './axios';

export const getCompanyData = () => {
  return getAPI(`companies`, {});
};

export const updateCompanyData = (data: any) => {
  return putAPI(`companies`, data);
};