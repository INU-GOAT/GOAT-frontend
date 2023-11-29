import { useNavigate } from "react-router-dom";

import "./css/Home.css";

function Home() {
  const navigate = useNavigate();
  const goToLogIn = () => {
    navigate("/LogIn");
  };

  return (
    <div class="bg">
      <h1>Goat</h1>
      <h1 className="text">당신의 스포츠 매칭을 위한 완벽한 애플리케이션</h1>
      <h3 className="text">
        실시간 다양한 스포츠 종목 선택과 실력별 매칭으로 공정한 경기를 빠르고
        쉽게 즐기세요!
      </h3>
      <button className="btn" onClick={goToLogIn}>
        <div>로그인</div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25px"
          height="25px"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M11.6801 14.62L14.2401 12.06L11.6801 9.5"
            stroke="black"
            stroke-width="2"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M4 12.0601H14.17"
            stroke="black"
            stroke-width="2"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M12 4C16.42 4 20 7 20 12C20 17 16.42 20 12 20"
            stroke="black"
            stroke-width="2"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      </button>
    </div>
  );
}

export default Home;
