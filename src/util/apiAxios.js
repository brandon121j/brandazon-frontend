import axios from "axios";

const ApiAxios = axios.create({
  baseURL: 'http://localhost:3001/api/',
  withCredentials: true,
});

export default ApiAxios;