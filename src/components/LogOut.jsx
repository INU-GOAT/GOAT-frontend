import React from "react";
import { useNavigate } from "react-router";

const { Kakao } = window;

function LogOut() {
  const navigate = useNavigate();

  const initKakao = () => {
    if (Kakao && !Kakao.isInitialized()) {
      Kakao.init(process.env.REACT_APP_JS_KEY);
    }
  };
  initKakao();
  console.log(Kakao.Auth.getAccessToken());
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
  return <button onClick={kakaoLogOut}>로그아웃</button>;
}

export default LogOut;
