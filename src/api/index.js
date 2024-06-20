import axios from 'axios';

const LOCAL_URL = process.env.REACT_APP_LOCAL_URL;
// const PRODUCT_URL = process.env.REACT_APP_PRODUCT_URL;

export const api = axios.create({
  baseURL: LOCAL_URL,
  withCredentials: true
});
