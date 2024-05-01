import React from 'react';
import Match from './Match';
import KakaoMap from "../components/KaKaoMap.jsx";
import "./css/Main.css";
import ApiTest from "../apis/ApiTest";

function Main() {
  return (
    <div className="main">
      <div className="content">
        <KakaoMap />
      </div>
      <div className="main-container">
        <div className="match-container">
          <Match />
        </div>
      </div>
      <ApiTest></ApiTest>
    </div>
  );
}

export default Main;

// 조건 설명 적기
