import React, { useEffect } from "react";

function KakaoLogIn() {
  const { Kakao } = window;
  const JS_KEY = "37417980d0926f07576f94eecf89bebf";
  const REDIRECT_URI = "http://15.165.113.9:8080/login/oauth2/code/kakao";
  console.log(JS_KEY);
  console.log(REDIRECT_URI);

  const initKakao = () => {
    const { Kakao } = window;
    const JS_KEY = "37417980d0926f07576f94eecf89bebf";
    if (Kakao && !Kakao.isInitialized()) {
      Kakao.init(JS_KEY);
    }
  };

  useEffect(() => {
    initKakao();
  }, []);

  const kakaoLoginHandler = () => {
    Kakao.Auth.authorize({
      REDIRECT_URI,
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
