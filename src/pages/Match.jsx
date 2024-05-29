import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import MatchType from '../components/Matchtype';
import Teaminvite from '../components/Teaminvite';
import Sport from '../components/Sport';
import Timelist from '../components/Timelist';
import Matching from '../components/Matching';
import { startMatching, cancelMatching, getMatching } from '../apis/matching';
import getUser from '../apis/getUser';
import { getGroupMembers } from '../apis/group';
import './css/Match.css';

const Match = ({ latitude, longitude, preferCourt }) => {
  const [matchType, setMatchType] = useState('');
  const [selectedSport, setSelectedSport] = useState('');
  const [selectedTime, setSelectedTime] = useState([]);
  const [matchingInProgress, setMatchingInProgress] = useState(false);
  const [gaming, setGaming] = useState(false);
  const [notification, setNotification] = useState('');
  const [preferSport, setPreferSport] = useState('');
  const [matchStartTimes, setMatchStartTimes] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUser();
        console.log("User data fetched:", userData);
        if (userData && userData.status === "GAMING") {
          setGaming(true);
          setNotification('매칭이 잡혔습니다.');

          const matchingData = await getMatching();
          if (matchingData) {
            setSelectedSport(matchingData.sport);
            setMatchStartTimes(matchingData.matchStartTimes);
            setMatchType(matchingData.isClubMatching ? '팀' : '솔로');
            setMatchingInProgress(true);
          }

          if (Notification.permission === 'granted') {
            new Notification('매칭이 잡혔습니다.');
          } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then(permission => {
              if (permission === 'granted') {
                new Notification('매칭이 잡혔습니다.');
              }
            });
          }
        } else if (userData && userData.status === "WAITING") {
          const matchingData = await getMatching();
          if (matchingData) {
            setSelectedSport(matchingData.sport);
            setMatchStartTimes(matchingData.matchStartTimes);
          }
        }
      } catch (error) {
        console.error("User data fetch failed:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleMatchTypeClick = (type) => {
    setMatchType(type);
  };

  const handleSportClick = (sport) => {
    setSelectedSport(sport);
  };

  const handleTimeChange = useCallback((time) => {
    setSelectedTime(time);
  }, []);

  const sportMap = {
    soccer: "축구",
    basketBall: "농구",
    badminton: "배드민턴",
    tableTennis: "탁구"
  };

  const onStartMatching = async () => {
    if (!latitude || !longitude) {
      alert("위치를 설정하세요.");
      return;
    }

    let groupMembers = [];

    if (matchType === '팀') {
      groupMembers = await getGroupMembers();
      if (!groupMembers) {
        alert("그룹원 조회 실패");
        return;
      }
    } else if (matchType === '솔로') {
      const userData = await getUser();
      if (userData) {
        groupMembers = [{ id: userData.id }];
      } else {
        alert("유저 정보를 불러오지 못했습니다.");
        return;
      }
    }

    const requestBody = {
      sport: sportMap[selectedSport],
      latitude: latitude,
      longitude: longitude,
      matchStartTimes: selectedTime,
      preferCourt: preferCourt,
      isClubMatching: matchType === '팀'
    };

    setMatchingInProgress(true);

    try {
      const response = await startMatching(requestBody);
      if (!response) {
        setMatchingInProgress(false);
      }
      console.log('매칭 시작');
    } catch (error) {
      console.error("매칭 시작 실패:", error);
      setMatchingInProgress(false);
    }
  };

  const onCancelMatching = async () => {
    try {
      const response = await cancelMatching();
      if (response) {
        setMatchingInProgress(false);
        const userData = await getUser();
        if (userData && userData.status === "WAITING") {
          const matchingData = await getMatching();
          if (matchingData) {
            setSelectedSport(matchingData.sport);
            setMatchStartTimes(matchingData.matchStartTimes);
          }
        }
      }
      console.log('매칭 취소');
    } catch (error) {
      console.error("매칭 취소 실패:", error);
    }
  };

  const handleAcceptNotification = () => {
    navigate('/ChatHandler');
  };

  return (
    <div className="container match-container">
      <h2 className="match-title">매치 생성</h2>
      <div className="match-type-buttons">
        <MatchType matchType="솔로" isSelected={matchType === '솔로'} onClick={handleMatchTypeClick} disabled={matchingInProgress || gaming} />
        <MatchType matchType="팀" isSelected={matchType === '팀'} onClick={handleMatchTypeClick} disabled={matchingInProgress || gaming} />
      </div>
      {matchType === '팀' && (
        <>
          <Teaminvite disabled={matchingInProgress || gaming} />
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
          disabled={matchingInProgress || gaming}
          matchType={matchType}
        />
      </div>
      <br />
      <div>
        <Timelist onChange={handleTimeChange} disabled={matchingInProgress || gaming} />
      </div>
      <Matching 
        onStartMatching={onStartMatching}
        onCancelMatching={onCancelMatching}
        matchType={matchType}
        selectedSport={selectedSport}
        selectedTime={selectedTime}
        matchingInProgress={matchingInProgress}
        gaming={gaming}
      />
      {notification && (
        <div className="notification-popup">
          <p>{notification}</p>
          <button onClick={handleAcceptNotification}>수락</button>
        </div>
      )}
    </div>
  );
};

export default Match;