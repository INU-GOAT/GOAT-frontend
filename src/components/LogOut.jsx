import React from "react";
import { useNavigate } from "react-router";
import { isLoginStore } from "../utils/store";

function LogOut() {
  const navigate = useNavigate();
  const { setIsLogin } = isLoginStore();
  const logOut = () => {
    localStorage.clear();
    setIsLogin(false);
    navigate("/");
  };
  return <button onClick={logOut}>로그아웃</button>;
}

export default LogOut;
