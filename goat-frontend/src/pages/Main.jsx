import { useState } from "react";
import { useNavigate } from "react-router-dom";

import mapImage from "./map.png";
import "./css/Main.css";
import Gender from "./button/Gender";
import Sport from "./button/Sport";
import Time from "./button/Time";
import Matching from "./button/Matching";

function Main() {
  const [matching, setMatching] = useState(false);
  const navigate = useNavigate();
  const startMatch = () => {
    setMatching(true);
    let timer = setTimeout(() => {
      navigate("/Chat");
    }, 3000);
  };
  return (
    <div className="main">
      <div className="content">
        <img src={mapImage} width={500} />
      </div>
      <div className="rnb">
        <Sport />
        <Time />

        <Gender />
        {matching === false ? (
          <button onClick={startMatch} className="match">
            매칭 시작
          </button>
        ) : (
          <Matching onClick={startMatch} />
        )}
      </div>
    </div>
  );
}

export default Main;

// 조건 설명 적기
