import { useNavigate } from "react-router-dom";

import "./css/Home.css";
import KakaoLogIn from "./button/KakaoLogIn";

function Home() {
  const navigate = useNavigate();

  return (
    <div class="bg">
      <h1>Goat</h1>
      <KakaoLogIn></KakaoLogIn>
    </div>
  );
}

export default Home;
