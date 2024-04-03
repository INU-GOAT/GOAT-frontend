import { useNavigate, useSearchParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
import axios from "axios";

function LogInHandler() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get("code");

  console.log(code);

  useEffect(() => {
    const getToken = async () => {
      console.log(code);
      await axios
        .post("http://15.165.113.9:8080/api/users/code", null, {
          headers: { code: code, withCredentials: true },
        })
        .then((res) => {
          console.log(res);
          const accessToken = res.data.accessToken;
          console.log(accessToken);
          const refreshToken = res.data.refreshToken;
          getUserId(accessToken);
        })
        .catch((error) => {
          console.log(error);
          console.error("getToken 실패");
        });
    };
    const getUserId = async (accessToken) => {
      console.log(accessToken);
      await axios
        .get(`http://15.165.113.9:8080/api/users?Auth=${accessToken}`)
        .then((res) => {
          console.log(res);
          if (res.data === -1) {
            alert("회원가입이 필요합니다.");
            navigate("/SignUp");
          } else {
            //id 값 이용 코드 추가 작성하기
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
