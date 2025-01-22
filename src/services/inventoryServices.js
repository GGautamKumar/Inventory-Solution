import { getRequest, postRequest } from "../utils/request";

export const getInventoryListAPI = (data) => getRequest(`/all-product`, data);
export const CreateInventoryListAPI = (data) =>
  postRequest(`/add-product`, data);
export const UpdateInventoryListAPI = (data) =>
  postRequest(`/update-product`, data);
export const DeleteInventoryListAPI = (data) =>
  postRequest(`/delete-product`, data);
