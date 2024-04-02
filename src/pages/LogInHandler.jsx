import { useNavigate, useSearchParams } from "react-router-dom";
import React, { useEffect } from "react";
import { SyncLoader } from "react-spinners";
import axios from "axios";

function LogInHandler() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get("code");
  console.log(code);

  useEffect(() => {
    const LogIn = async () => {
      await axios
        .get("https://15.165.113.9:8080/api/users/code", code, {
          "Content-Type": "application/json",
          withCredentials: true,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.error("실패");
        });
      LogIn();
    };
  }, []);

  return (
    <div backgroundcolor="#9376E0">
      <p>로그인 중입니다.</p>
      <SyncLoader color="#EAEBFF" />
    </div>
  );
}

export default LogInHandler;
