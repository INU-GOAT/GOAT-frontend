import axios from 'axios';

const matchingAxios = axios.create({
  baseURL: "http://15.165.113.9:8080/api/matching",
});

matchingAxios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Auth = accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getMatching = async () => {
  try {
    const response = await matchingAxios.get();
    return response.data;
  } catch (error) {
    console.error('매칭 조회 실패:', error);
    return null;
  }
};

export const startMatching = async (data) => {
  try {
    const response = await matchingAxios.post('/', data);
    return response.data;
  } catch (error) {
    console.error('매칭 시작 실패:', error);
    return null;
  }
};

export const cancelMatching = async () => {
  try {
    const response = await matchingAxios.delete('/');
    return response.data;
  } catch (error) {
    console.error('매칭 중단 실패:', error);
    return null;
  }
};