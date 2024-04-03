import { useNavigate, useSearchParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
import axios from "axios";

function LogInHandler() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get("code");
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  console.log(code);

  useEffect(() => {
    const getToken = async () => {
      console.log(code);
      await axios
        .post("http://15.165.113.9:8080/api/users/code", { code: { code } })
        .then((res) => {
          console.log(res);
          setAccessToken(res.data.accessToken);
          setRefreshToken(res.data.refreshToken);
        })
        .catch((error) => {
          console.log(code);
          console.error("getToken 실패");
        });
    };
    const getUserId = async () => {
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
          console.error("getId 실패");
        });
    };
    getToken();
    getUserId();
  }, [accessToken, code, navigate]);

  return (
    <div backgroundcolor="#9376E0">
      <p>로그인 중입니다.</p>
      <SyncLoader color="#EAEBFF" />
    </div>
  );
}

export default LogInHandler;
