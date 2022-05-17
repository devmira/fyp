import axios from "axios";
import TokenService from "./token.service";
const api = axios.create({
  baseURL: "http://localhost:5000",
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

// if (expire * 1000 < currentDate.getTime()) {
//   const response = await axios.get('http://localhost:5000/token');
//   setToken(response.data.accessToken);
//   const decoded = jwt_decode(response.data.accessToken);
//   setName(decoded.name);
//   setExpire(decoded.exp);
// }