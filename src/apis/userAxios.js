import axios from "axios";
import refreshTokens from "./refreshTokens";
import { useNavigate } from "react-router-dom";
import LogOut from "../components/LogOut";

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
    console.log(config);
    return config;
  },
  (error) => {
    //요청 에러 시 수행 로직
    console.log(error);
    return Promise.reject(error);
  }
);
