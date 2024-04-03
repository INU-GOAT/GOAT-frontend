import React from "react";
import { useNavigate } from "react-router";

const Kakao = window;

function LogOut() {
  const navigate = useNavigate();

  const kakaoLogOut = () => {
    Kakao.Auth.logout()
      .then(function (response) {
        console.log(Kakao.Auth.getAccessToken()); // null
        //쿠키 지우기
        navigate("/");
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
