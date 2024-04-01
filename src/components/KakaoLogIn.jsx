import React, { useEffect } from "react";

function KakaoLogIn() {
  const { Kakao } = window;
  const JS_KEY = process.env.REACT_APP_JS_KEY;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
  console.log(JS_KEY);

  const initKakao = () => {
    const { Kakao } = window;
    const JS_KEY = process.env.REACT_APP_JS_KEY;
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
