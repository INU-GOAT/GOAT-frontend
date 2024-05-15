import React, { useState, useEffect } from 'react';
import MatchType from '../components/Matchtype';
import Teaminvite from '../components/Teaminvite';
import Sport from '../components/Sport';
import Timelist from '../components/Timelist';
import Matching from '../components/Matching';
import TeamMemberActions from '../components/TeamMemberActions';
import { getMatching, startMatching, cancelMatching } from '../apis/matching';
import './css/Match.css';

const Match = ({ latitude, longitude }) => {
  const [matchType, setMatchType] = useState('');
  const [selectedSport, setSelectedSport] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [matchingInProgress, setMatchingInProgress] = useState(false);
  const [preferSport, setPreferSport] = useState('');
  const [matchingStartTime, setMatchingStartTime] = useState('');
  const [matchStartTimes, setMatchStartTimes] = useState([]);
  const [preferCourt, setPreferCourt] = useState('');

  useEffect(() => {
    const fetchMatching = async () => {
      const data = await getMatching();
      if (data) {
        const { sport, latitude, longitude, matchingStartTime, matchStartTimes, preferCourt } = data;
        setSelectedSport(sport);
        setMatchingStartTime(matchingStartTime);
        setMatchStartTimes(matchStartTimes);
        setPreferCourt(preferCourt);
        setMatchingInProgress(true);
      }
    };

    fetchMatching();
  }, []);

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
    setPreferCourt(court);
  };

  const onStartMatching = async () => {
    if (!latitude || !longitude) {
      alert("위치를 설정하세요.");
      return;
    }

    const requestBody = {
      sport: selectedSport,
      latitude: latitude,
      longitude: longitude,
      matchingStartTime: new Date().toISOString(),
      matchStartTimes: [selectedTime],
      preferCourt: preferCourt,
      userCount: 1,
      groupId: 1
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
        <MatchType matchType="솔로" isSelected={matchType === '솔로'} onClick={handleMatchTypeClick} disabled={matchingInProgress} />
        <MatchType matchType="팀" isSelected={matchType === '팀'} onClick={handleMatchTypeClick} disabled={matchingInProgress} />
      </div>
      {matchType === '팀' && <Teaminvite disabled={matchingInProgress} />}
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
        <Timelist onChange={handleTimeChange} disabled={matchingInProgress} />
      </div>
      <Matching 
        onStartMatching={onStartMatching}
        onCancelMatching={onCancelMatching}
        matchType={matchType}
        selectedSport={selectedSport}
        selectedTime={selectedTime}
        matchingInProgress={matchingInProgress}
      />
      <TeamMemberActions disabled={matchingInProgress} />
    </div>
  );
};

export default Match;