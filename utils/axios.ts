/**
 * axios setup to use mock service
 */

import axios from "axios";

const axiosServices = axios.create({
  baseURL: 'https://api.example.com', // เปลี่ยนเป็น URL API ของคุณ
})

axiosServices.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') // หรือดึงจาก Vuex, Pinia หรือ composable

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

axiosServices.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject((error.response && error.response.data) || "Wrong Services")
);

export default axiosServices;

