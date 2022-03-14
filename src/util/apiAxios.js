import axios from "axios";

const ApiAxios = axios.create({
  baseURL: 'http://localhost:3001/',
  withCredentials: true,
});

export default ApiAxios;