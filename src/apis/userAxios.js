import axios from 'axios';
import refreshTokens from './refreshTokens';

const userAxios = axios.create({
  baseURL: "http://15.165.113.9:8080/api/users",
});

// 요청 인터셉터
userAxios.interceptors.request.use(
  (config) => {
    // 요청 보내기 전에 수행 로직
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Auth = accessToken;
    }
    console.log(config);
    return config;
  },
  (error) => {
    // 요청 에러 시 수행 로직
    console.log(error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터
userAxios.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await refreshTokens(originalRequest);
        return userAxios(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed", refreshError);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default userAxios;