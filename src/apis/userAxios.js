import axios from "axios";

const userAxios = axios.create({
  baseURL: "http://15.165.113.9:8080/api/users",
});

export default userAxios;

//요청 인터셉터
userAxios.interceptors.request.use(
  (config) => {
    //요청 보내기 전에 수행 로직
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.common["Auth"] = accessToken;
    }
    return config;
  },
  (err) => {
    //요청 에러 시 수행 로직
    return Promise.reject(err);
  }
);

//응답 인터셉터
userAxios.interceptors.response.use(
  (response) => {
    //응답에 대한 로직
    const res = response.data;
    return res;
  },
  (err) => {
    return Promise.reject(err);
  }
);
