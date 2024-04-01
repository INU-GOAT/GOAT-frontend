import { useState } from "react";
import { useNavigate } from "react-router-dom";

import mapImage from "../assets/map.png";
import "./css/Main.css";
import Gender from "../components/Gender";
import Sport from "../components/Sport";
import Time from "../components/Time";
import Matching from "../components/Matching";

function Main() {
  const [matching, setMatching] = useState(false);
  const [btnName, setBtnName] = useState("매칭 시작");

  const navigate = useNavigate();
  const startMatch = () => {
    setMatching(true);
    let timer = setTimeout(() => {
      setMatching(false);
      setBtnName("매칭 완료!");
    }, 3000);
    timer = setTimeout(() => {
      navigate("/Chat");
    }, 4500);
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
            {btnName}
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
