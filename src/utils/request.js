
import axios from "axios";

import { apiBaseUrl } from "./enviroment";
export const postRequest = (url, data) => {
 
  
  const config = {
    headers: {
    //   Authorization: //auth,
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
  };
  return axios
    .post(`${apiBaseUrl}${url}`, data, config)
    .then((res) => res.data);
};
export const postRequest1 = (url, data) => {

  const config = {
    headers: {
   

      "Content-Type": "multipart/form-data",

      "Access-Control-Allow-Origin": "*",
    },
  };
  return axios
    .post(`${apiBaseUrl}${url}`, data, config)
    .then((res) => res.data);
};

export const getRequest = (url, data) => {
  //   const assestData = [];
  const config = {
    headers: {
  
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
  };
  return axios.get(`${apiBaseUrl}${url}`, config).then((res) => res.data);
};
