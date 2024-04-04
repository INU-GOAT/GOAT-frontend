import { useNavigate } from "react-router-dom";

import "./css/Home.css";
import KakaoLogIn from "../components/KakaoLogIn";

function Home() {
  const navigate = useNavigate();

  return (
    <div class="bg">
      <div class="header">
        <h1>GOAT</h1>
      </div>
      <div className="body">
        <h1>스포츠를 사랑하는 이들을 위한 완벽한 매칭 플랫폼</h1>

        <h3>함께 스포츠를 즐기고자 하는 상대를 찾아드립니다 </h3>
      </div>
      <div id="kakao">
        <KakaoLogIn></KakaoLogIn>
      </div>
    </div>
  );
}

export default Home;
