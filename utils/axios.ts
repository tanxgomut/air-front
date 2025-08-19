import axios from "axios";

const axiosServices = axios.create({
  baseURL: process.env.NUXT_PUBLIC_API_BASE_URL || 'https://api.example.com',
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

