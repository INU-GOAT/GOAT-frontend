import React, { useState } from 'react';
import MatchType from '../components/Matchtype';
import TeamInvite from '../components/Teaminvite';
import Sport from '../components/Sport';
import Timelist from '../components/Timelist';
import Matching from '../components/Matching';
import './css/Match.css';

const Match = () => {
  const [matchType, setMatchType] = useState('');
  const [selectedSport, setSelectedSport] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const handleMatchTypeClick = (type) => {
    setMatchType(type);
  };

  const handleSportClick = (sport) => {
    setSelectedSport(sport);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  return (
    <div className="container">
      <h2>매치 생성</h2>
      <div className="match-type-buttons">
        <MatchType matchType="솔로" isSelected={matchType === '솔로'} onClick={handleMatchTypeClick} />
        <MatchType matchType="팀" isSelected={matchType === '팀'} onClick={handleMatchTypeClick} />
      </div>
      {matchType === '팀' && <TeamInvite />}
      <div>
        <h3>종목 선택</h3>
        <Sport selectedSport={selectedSport} onClick={handleSportClick} />
      </div>
      <div>
        <h3>시간 선택</h3>
        <Timelist onChange={handleTimeChange} />
      </div>
      <Matching />
    </div>
  );
};

export default Match;