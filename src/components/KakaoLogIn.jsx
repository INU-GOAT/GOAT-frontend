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
    });
  };

  return (
    <a id="kakao-login-btn" onClick={kakaoLoginHandler}>
      <img
        src="https://k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
        width="222"
        alt="카카오 로그인 버튼"
      />
    </a>
  );
}

export default KakaoLogIn;
