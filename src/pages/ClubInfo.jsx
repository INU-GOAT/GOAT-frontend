import React from 'react';
import './ClubInfo.css'; 

function ClubInfo({ clubname, intro, selectedSport }) {
  return (
    <div className="club-info">
      <h2>클럽 정보</h2>
      <p>클럽명: {clubname}</p>
      <p>소개문: {intro}</p>
      <p>선택된 스포츠: {selectedSport}</p>
    </div>
  );
}

export default ClubInfo;
