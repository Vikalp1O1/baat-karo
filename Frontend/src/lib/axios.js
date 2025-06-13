import axios from 'axios';
// import dotenv from 'dotenv';
// dotenv.config();


const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
});

export {axiosInstance};