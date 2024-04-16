import React, { useEffect } from "react";
import userAxios from "./userAxios";

import refreshTokens from "./refreshTokens";
import { useNavigate } from "react-router-dom";
import isLoginStore from "../utils/store";

function UserResponse() {
  const navigate = useNavigate();
  const { setIsLogin } = isLoginStore();
  useEffect(() => {
    //응답 인터셉터
    userAxios.interceptors.response.use(
      (response) => {
        //응답에 대한 로직
        const res = response.data;
        return res;
      },
      async (error) => {
        console.log(error + "에러");
        console.log(error.response);
        if (error.response.status === 401) {
          console.log(error + "401");
          if (error.response.data.msg === "만료된 토큰입니다.") {
            alert("토큰이 만료되어 로그아웃 되었습니다.");
            localStorage.clear();
            setIsLogin(false);
            navigate("/");
          } else if (error.response.data.msg === "인증이 실패하였습니다.") {
            await refreshTokens(error.config);
          }
        } else if (
          error.response.data.msg === "토큰의 값이 존재하지 않습니다."
        ) {
          alert("토큰의 값이 존재하지 않습니다.");
          localStorage.clear();
          setIsLogin(false);
          navigate("/");
        }
        return Promise.reject(error);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
}

export default UserResponse;
