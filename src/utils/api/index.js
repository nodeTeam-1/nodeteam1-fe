/* eslint-disable */
import axios from 'axios';

const LOCAL_URL = process.env.REACT_APP_LOCAL_URL;
// const PRODUCT_URL = process.env.REACT_APP_PRODUCT_URL;

export const api = axios.create({
  baseURL: LOCAL_URL,
  // withCredentials: true,
  authorization: `Bearer ${sessionStorage.getItem("token")}`,
});


//api 호출 확인
api.interceptors.request.use(
  (request) => {
    console.log("Starting Request", request);
    request.headers.authorization = `Bearer ${sessionStorage.getItem("token")}`;
    return request;
  },
  function (error) {
    console.log("REQUEST ERROR", error);
  }
);
api.interceptors.response.use(
  (response) => {
    console.log(response);
    return response;
  },
  function (error) {
    error = error.response.data;
    console.log("RESPONSE ERROR", error);
    return Promise.reject(error);
  }
);
