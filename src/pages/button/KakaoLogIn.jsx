import KakaoLogin from "react-kakao-login";

function KakaoLogIn() {
  const kakaoClientId = "37417980d0926f07576f94eecf89bebf";
  const kakaoOnSuccess = async (data) => {
    console.log(data);
    const idToken = data.response.access_token; // 엑세스 토큰 백엔드로 전달
    console.log(idToken);
  };
  const kakaoOnFailure = (error) => {
    console.log(error);
  };
  return (
    <>
      <KakaoLogin
        token={kakaoClientId}
        onSuccess={kakaoOnSuccess}
        onFail={kakaoOnFailure}
      />
    </>
  );
}

export default KakaoLogIn;
