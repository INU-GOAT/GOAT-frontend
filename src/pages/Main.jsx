import React from 'react';
import Match from './Match';
import KaKaoMap from "../components/KaKaoMap.jsx";
import "./css/Main.css";
import ApiTest from "../apis/ApiTest";

function Main() {
  return (
    <div className="main">
      <div className="content">
        <KaKaoMap />
      </div>
      <div className="main-container">
        <div className="m-match-container">
          <Match />
        </div>
      </div>
    </div>
  );
}

export default Main;

// 조건 설명 적기
