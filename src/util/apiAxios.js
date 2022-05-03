import axios from "axios";

const ApiAxios = axios.create({
  baseURL: process.env.REACT_APP_AXIOS === 'development' ? 'http://localhost:3001/api' : '/api',
  withCredentials: true,
});

export default ApiAxios;