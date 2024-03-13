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
      <button className="cta" onClick={goToLogIn}>
        <span>로그인</span>
          <svg svg viewBox="0 0 13 10" height="10px" width="15px">
            <path d="M1,5 L11,5"></path>
            <polyline polyline points="8 1 12 5 8 9"></polyline>
          </svg>
      </button>
    </div>
  );
}

export default Home;
