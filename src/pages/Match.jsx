import React, { useState } from 'react';
import MatchType from '../components/Matchtype';
import TeamInvite from '../components/Teaminvite';
import Sport from '../components/Sport';
import Timelist from '../components/Timelist';
import Matching from '../components/Matching';
import './css/Match.css';
import axios from 'axios';

const Match = () => {
  const [matchType, setMatchType] = useState('');
  const [selectedSport, setSelectedSport] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [matchingInProgress, setMatchingInProgress] = useState(false);

  const handleMatchTypeClick = (type) => {
    setMatchType(type);
  };

  const handleSportClick = (sport) => {
    setSelectedSport(sport);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const onStartMatching = () => {

    setMatchingInProgress(true);
    axios.post('/api/matching', {
      sport: selectedSport,
      matching_start_time: selectedTime
    })
    .then((response) => {
      console.log(response);

    })
    .then((error) => {
      console.error(error);

    });

    console.log('매칭 시작');
  };

  return (
    <div className="container match-container">
      <h2 className="match-title">매치 생성</h2>
      <div className="match-type-buttons">
        <MatchType matchType="솔로" isSelected={matchType === '솔로'} onClick={handleMatchTypeClick} disabled={matchingInProgress} />
        <MatchType matchType="팀" isSelected={matchType === '팀'} onClick={handleMatchTypeClick} disabled={matchingInProgress} />
      </div>
      {matchType === '팀' && <TeamInvite disabled={matchingInProgress} />}
      <div>
        <h3>종목 선택</h3>
        <Sport selectedSport={selectedSport} onClick={handleSportClick} disabled={matchingInProgress} />
      </div>
      <div>
        <Timelist onChange={handleTimeChange} disabled={matchingInProgress} />
      </div>
      <Matching 
        onStartMatching={onStartMatching}
        matchType={matchType}
        selectedSport={selectedSport}
        selectedTime={selectedTime}
        matchingInProgress={matchingInProgress}
      />
    </div>
  );
};

export default Match;