import React from 'react';
import Menu from './Menu';
import Match from './Match';
import KakaoMap from "../components/KaKaoMap";
import "./css/Main.css";

function Main() {
  return (
    <div className="main">
      <Menu />
      <div className="content">
        <KakaoMap />
      </div>
      <div className="main-container">
        <div className="match-container">
          <Match />
        </div>
      </div>
    </div>
  );
}

export default Main;

// 조건 설명 적기
