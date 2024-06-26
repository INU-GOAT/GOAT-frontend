import React, { useState } from 'react';
import MatchType from '../components/Matchtype';
import Teaminvite from '../components/Teaminvite';
import Sport from '../components/Sport';
import SetTime from "./../components/SetTime";
import Matching from '../components/Matching';
import TeamMemberActions from '../components/TeamMemberActions';
import { startMatching, cancelMatching } from '../apis/matching';
import './css/Match_club.css';

const Match = ({ latitude, longitude, preferCourt }) => {
  const [matchType, setMatchType] = useState('');
  const [selectedSport, setSelectedSport] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [matchingInProgress, setMatchingInProgress] = useState(false);
  const [preferSport, setPreferSport] = useState('');
  const [matchingStartTime, setMatchingStartTime] = useState('');
  const [matchStartTimes, setMatchStartTimes] = useState([]);
  const [preferCourtName, setPreferCourtName] = useState(preferCourt || '');

  const handleMatchTypeClick = (type) => {
    setMatchType(type);
  };

  const handleSportClick = (sport) => {
    setSelectedSport(sport);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const handleCourtChange = (court) => {
    setPreferCourtName(court);
  };

  const sportMap = {
    soccer: "축구",
    basketBall: "농구",
    badminton: "배드민턴",
    tableTennis: "탁구"
  };

  const roundToTwoDecimals = (value) => {
    return Math.round(value * 100) / 100;
  };

  const formatDateToISOString = (date) => {
    return new Date(date).toISOString();
  };

  const onStartMatching = async () => {
    if (!latitude || !longitude) {
      alert("위치를 설정하세요.");
      return;
    }

    const requestBody = {
      sport: sportMap[selectedSport],
      latitude: roundToTwoDecimals(latitude),
      longitude: roundToTwoDecimals(longitude),
      matchingStartTime: new Date().toISOString(),
      matchStartTimes: [formatDateToISOString(selectedTime)],
      preferCourt: preferCourtName
    };

    setMatchingInProgress(true);

    const response = await startMatching(requestBody);
    if (!response) {
      setMatchingInProgress(false);
    }

    console.log('매칭 시작');
  };

  const onCancelMatching = async () => {
    const response = await cancelMatching();
    if (response) {
      setMatchingInProgress(false);
    }

    console.log('매칭 취소');
  };

  return (
    <div className="container match-container">
      <h2 className="match-title">매치 생성</h2>
      <div className="match-type-buttons">
        <MatchType matchType="클럽" isSelected={matchType === '클럽'} onClick={handleMatchTypeClick} disabled={matchingInProgress} />
      </div>
      {matchType === '클럽' && (
        <>
          <Teaminvite disabled={matchingInProgress} />
          <TeamMemberActions disabled={matchingInProgress} />
        </>
      )}
      <div>
        <br />
        <h3 className="match-title">종목 선택</h3>
        <Sport
          sport={selectedSport}
          setSport={setSelectedSport}
          preferSport={preferSport}
          setPreferSport={setPreferSport}
          disabled={matchingInProgress}
        />
      </div>
      <br />
      <div>
        <SetTime
          setTimeArray={setSelectedTime}
          disabled={matchingInProgress}
        />
      </div>
      <Matching 
        onStartMatching={onStartMatching}
        onCancelMatching={onCancelMatching}
        matchType={matchType}
        selectedSport={selectedSport}
        selectedTime={selectedTime}
        matchingInProgress={matchingInProgress}
      />
    </div>
  );
};

export default Match;