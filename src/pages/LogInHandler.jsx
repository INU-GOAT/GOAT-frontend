import { useNavigate } from "react-router-dom";
import React from "react";
import { SyncLoader } from "react-spinners";

function LogInHandler() {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");

  return (
    <div backgroundcolor="#9376E0">
      <p>로그인 중입니다.</p>
      <SyncLoader color="#EAEBFF" />
    </div>
  );
}

export default LogInHandler;
