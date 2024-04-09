import React from "react";
import { useNavigate } from "react-router";

function LogOut() {
  const navigate = useNavigate();
  const logOut = () => {};
  return <button onClick={logOut}>로그아웃</button>;
}

export default LogOut;
