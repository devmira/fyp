import axios from "axios";
import TokenService from "./token.service";
const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});
api.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken();
    if (token) {
      // config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
api.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (originalConfig.url !== "/login" && err.response) {
      // Access Token was expired
      if (err.response.status === 403 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const rs = await api.get("/token");
          const { accessToken } = rs.data;
          TokenService.updateLocalAccessToken(accessToken);
          return api(originalConfig);
        } catch (_error) {
          TokenService.removeUser();
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(err);
  }
);
export default api;
