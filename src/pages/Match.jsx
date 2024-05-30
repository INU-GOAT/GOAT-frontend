import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MatchType from "../components/Matchtype";
import Teaminvite from "../components/Teaminvite";
import Sport from "../components/Sport";
import Matching from "../components/Matching";
import TeamMemberActions from "../components/TeamMemberActions";
import { startMatching, cancelMatching, getMatching } from "../apis/matching";
import getUser from "../apis/getUser";
import { getGroupMembers } from "../apis/group";
import Notification from "../components/Notification";
import { getNotifications, deleteNotification, connectSSE, disconnectSSE } from "../apis/notification";
import "./css/Match.css";
import SetTime from "./../components/SetTime";

const Match = ({ latitude, longitude, preferCourt }) => {
  const [matchType, setMatchType] = useState("");
  const [selectedSport, setSelectedSport] = useState("");
  const [selectedTime, setSelectedTime] = useState([]);
  const [matchingInProgress, setMatchingInProgress] = useState(false);
  const [gaming, setGaming] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [preferSport, setPreferSport] = useState("");
  const [matchStartTimes, setMatchStartTimes] = useState([]);
  const [isInGroup, setIsInGroup] = useState(false);
  const [groupMembers, setGroupMembers] = useState([]);
  const [isGroupMaster, setIsGroupMaster] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUser();
        console.log("User data fetched:", userData);
        if (userData && userData.status === "GAMING") {
          setGaming(true);
          setNotifications([{ id: 0, content: "매칭이 잡혔습니다." }]);

          const matchingData = await getMatching();
          if (matchingData) {
            setSelectedSport(matchingData.sport);
            setMatchStartTimes(matchingData.matchStartTimes);
            setMatchType(matchingData.isClubMatching ? "팀" : "솔로");
            setMatchingInProgress(true);
          }

          if (Notification.permission === "granted") {
            new Notification("매칭이 잡혔습니다.");
          } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then((permission) => {
              if (permission === "granted") {
                new Notification("매칭이 잡혔습니다.");
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

        const membersData = await getGroupMembers();
        if (membersData && Array.isArray(membersData.members) && membersData.members.length > 0) {
          setIsInGroup(true);
          setGroupMembers(membersData.members);
          if (membersData.members[0] === userData.nickname) {
            setIsGroupMaster(true);
          } else {
            setIsGroupMaster(false);
          }
        } else {
          setIsInGroup(false);
          setGroupMembers([]);
        }
      } catch (error) {
        console.error("User data fetch failed:", error);
      }
    };

    const fetchNotifications = async () => {
      try {
        const notifications = await getNotifications();
        setNotifications(notifications);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    const handleSSEMessage = (newNotification) => {
      setNotifications((prevNotifications) => [newNotification, ...prevNotifications]);
    };

    const sse = connectSSE(handleSSEMessage);

    fetchUserData();
    fetchNotifications();

    return () => {
      disconnectSSE(sse);
    };
  }, []);

  const handleMatchTypeClick = async (type) => {
    if (type === "솔로" && isInGroup) {
      return;
    }

    if (type === "팀") {
      try {
        const membersData = await getGroupMembers();
        const userData = await getUser();

        if (!membersData || !Array.isArray(membersData.members) || membersData.members.length === 0) {
          setIsInGroup(false);
          setGroupMembers([]);
          setIsGroupMaster(false);
        } else {
          if (!membersData.members.includes(userData.nickname)) {
            membersData.members.unshift(userData.nickname);
          }
          setIsInGroup(true);
          setGroupMembers(membersData.members);
          setIsGroupMaster(membersData.members[0] === userData.nickname);
        }
      } catch (error) {
        console.error("그룹 멤버 조회 실패:", error);
        return;
      }
    }

    setMatchType(type);
  };

  const handleSportClick = (sport) => {
    setSelectedSport(sport);
  };

  const sportMap = {
    soccer: "축구",
    basketBall: "농구",
    badminton: "배드민턴",
    tableTennis: "탁구",
  };

  const onStartMatching = async () => {
    if (!latitude || !longitude) {
      alert("위치를 설정하세요.");
      return;
    }

    let members = [];

    if (matchType === "팀") {
      members = await getGroupMembers();
      if (!members || members.length === 0) {
        alert("그룹원 조회 실패");
        return;
      }
    } else if (matchType === "솔로") {
      const userData = await getUser();
      if (userData) {
        members = [{ id: userData.id }];
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
      isClubMatching: matchType === "팀",
    };

    setMatchingInProgress(true);

    try {
      const response = await startMatching(requestBody);
      if (!response) {
        setMatchingInProgress(false);
      }
      console.log("매칭 시작");
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
      console.log("매칭 취소");
    } catch (error) {
      console.error("매칭 취소 실패:", error);
    }
  };

  const handleAcceptNotification = (notificationId) => {
    deleteNotification(notificationId);
    navigate("/ChatHandler");
  };

  return (
    <div className="container match-container">
      <h2 className="match-title">매치 생성</h2>
      <div className="match-type-buttons">
        <MatchType
          matchType="솔로"
          isSelected={matchType === "솔로"}
          onClick={handleMatchTypeClick}
          disabled={matchingInProgress || gaming || isInGroup}
        />
        <MatchType
          matchType="팀"
          isSelected={matchType === "팀"}
          onClick={handleMatchTypeClick}
          disabled={matchingInProgress || gaming}
        />
      </div>
      {matchType === "팀" && isInGroup && (
        <>
          <Teaminvite disabled={matchingInProgress || gaming} />
          <TeamMemberActions disabled={matchingInProgress || gaming} />
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
          disabled={matchingInProgress || gaming || !isGroupMaster}
          matchType={matchType}
        />
      </div>
      <br />
      <div>
        <SetTime
          setTimeArray={setSelectedTime}
          disabled={matchingInProgress || gaming}
        />
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
      {notifications.length > 0 && (
        <div className="notifications-popup">
          {notifications.map((notification) => (
            <div key={notification.id} className="notification-item">
              <p>{notification.content}</p>
              <button onClick={() => handleAcceptNotification(notification.id)}>이동</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Match;