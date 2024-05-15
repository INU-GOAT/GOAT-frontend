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
    const result = await matchingAxios.get('/');
    return result.data;
  } catch (error) {
    console.error('매칭 조회 실패: ', error);
    return null;
  }
};

export const startMatching = async (data) => {
  try {
    const result = await matchingAxios.post('/', data);
    return result.data;
  } catch (error) {
    console.error('매칭 시작 실패: ', error);
    return null;
  }
};

export const cancelMatching = async () => {
  try {
    const result = await matchingAxios.delete('/');
    return result.data;
  } catch (error) {
    console.error('매칭 취소 실패: ', error);
    return null;
  }
};