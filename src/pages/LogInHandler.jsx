import { useNavigate, useSearchParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

import userAxios from "../apis/userAxios";
import setUser from "../utils/setUser";
import { isLoginStore } from "../utils/store";
import { CircularProgress, Stack } from "@mui/material";

function LogInHandler() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get("code");
  const { setIsLogin } = isLoginStore();
  console.log(code);

  useEffect(() => {
    //await 바꾸기
    const getToken = async () => {
      await userAxios
        .post("/code", null, {
          headers: { code: code },
        })
        .then((res) => {
          console.log(res);

          localStorage.setItem("accessToken", res.data.accessToken);
          localStorage.setItem("refreshToken", res.data.refreshToken);
          getUserId();
        })
        .catch((error) => {
          console.log(error);
          console.error("getToken 실패");
        });
    };
    const getUserId = async () => {
      await userAxios
        .get()
        .then((res) => {
          console.log(res);
          if (res.data === -1) {
            alert("회원가입이 필요합니다.");
            navigate("/SignUp");
          } else {
            localStorage.setItem("isLogin", true);
            setIsLogin(true);
            setUser(res.data);
            navigate("/Main");
          }
        })
        .catch((error) => {
          console.log(error);
          console.error("getId 실패");
        });
    };
    getToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack sx={{ alignItems: "center", mt: 5 }}>
      <h1>로그인 중입니다.</h1>
      <CircularProgress />
    </Stack>
  );
}

export default LogInHandler;
