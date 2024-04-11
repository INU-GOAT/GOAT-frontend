import axios from "axios";
import refreshTokens from "./refreshTokens";
import { useNavigate } from "react-router-dom";

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
      config.headers.Auth = accessToken;
    }
    return config;
  },
  (error) => {
    //요청 에러 시 수행 로직
    return Promise.reject(error);
  }
);

//응답 인터셉터
userAxios.interceptors.response.use(
  (response) => {
    //응답에 대한 로직
    const res = response.data;
    return res;
  },
  async (error) => {
    if (error.response.status === 401) {
      if (error.response.data.msg === "만료된 토큰입니다.") {
        localStorage.clear();
        const navigate = useNavigate();
        alert("토큰이 만료되어 로그아웃 되었습니다.");
        navigate("/");
      } else {
        await refreshTokens();
        return userAxios(error.config);
      }
    }
    return Promise.reject(error);
  }
);
