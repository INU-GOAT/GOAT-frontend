import React, { useEffect } from "react";

const { Kakao } = window;

function KakaoLogIn() {
  const initKakao = () => {
    if (Kakao && !Kakao.isInitialized()) {
      Kakao.init("37417980d0926f07576f94eecf89bebf");
    }
  };

  useEffect(() => {
    initKakao();
  }, []);

  const kakaoLoginHandler = () => {
    Kakao.Auth.authorize({
      redirectUri: "http://15.165.113.9:8080/login/oauth2/code/kakao",
      prompt: "login",
    });
  };

  return (
    <button onClick={kakaoLoginHandler}>
      <span>카카오 로그인</span>
    </button>
  );
}

export default KakaoLogIn;
