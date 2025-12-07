import { getAPI, putFileAPI } from './axios';

export const getBerandaData = () => {
  return getAPI(`contents/beranda`, {});
};

export const updateBerandaData = (data: any) => {
  return putFileAPI(`contents/beranda`, data);
};