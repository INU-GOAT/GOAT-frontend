import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import Match from './Match_club';
import './css/ClubInfo.css'; 

function ClubInfo() {
  const location = useLocation();

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [preferCourt, setPreferCourt] = useState('');

  const handleLocationChange = (lat, lng, courtName) => {
    setLatitude(lat);
    setLongitude(lng);
    setPreferCourt(courtName);
  };
  const { clubname, intro, majorSport, members } = location.state || {};

  return (
    <div className="main">
      <div className="club-info">
        <h2>클럽 정보</h2>
        <p className="club-name">클럽명: {clubname}</p>
        <p>소개문: {intro}</p>
        <p>주요 스포츠: {majorSport}</p>
        <div className="club-members">
          <h3>클럽 인원</h3>
          <ul>
            {members && members.length > 0 ? (
              members.map((member, index) => (
                <li key={index}>{member}</li>
              ))
            ) : (
              <li>등록된 인원이 없습니다.</li>
            )}
          </ul>
        </div>
      </div>
      <div className="main-container">
        <div className="m-match-container">
          <Match latitude={latitude} longitude={longitude} preferCourt={preferCourt} />
        </div>
      </div>
    </div>
  );
}

export default ClubInfo;
