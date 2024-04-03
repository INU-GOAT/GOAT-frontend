import React from "react";
import { Navigate, useNavigate } from "react-router";

const Kakao = window;

function LogOut() {
  Navigate = useNavigate();
  const kakaoLogOut = () => {
    Kakao.Auth.logout()
      .then(function (response) {
        console.log(Kakao.Auth.getAccessToken()); // null
        //쿠키 지우기
        Navigate("/Home");
      })
      .catch(function (error) {
        console.log("Not logged in.");
      });
  };
  return (
    <button className="api-btn" onClick={kakaoLogOut}>
      로그아웃
    </button>
  );
}

export default LogOut;
