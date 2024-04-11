import { useNavigate, useSearchParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";

import userAxios from "../apis/userAxios";
import setSession from "../utils/setUser";

function LogInHandler() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get("code");

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
            setSession(res.data);
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
    <div backgroundcolor="#9376E0">
      <p>로그인 중입니다.</p>
      <SyncLoader color="#EAEBFF" />
    </div>
  );
}

export default LogInHandler;
