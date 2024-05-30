import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import Match from './Match_club';
import './css/ClubInfo.css';

function ClubInfo() {
  const location = useLocation();
  const navigate = useNavigate();
  const [clubInfo, setClubInfo] = useState({});
  const [isClubMaster, setIsClubMaster] = useState(false);
  const [joinRequests, setJoinRequests] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [preferCourt, setPreferCourt] = useState('');

  const clubId = location.state?.clubId;
  const token = localStorage.getItem("accessToken");

  const fetchClubInfo = useCallback(async () => {
    try {
      const response = await axios.get(`http://15.165.113.9:8080/api/clubs/${clubId}`, {
        headers: { auth: token },
      });
      const clubData = response.data.data;
      setClubInfo(clubData);

      // 클럽장 여부를 바로 확인하여 상태 업데이트
      const userResponse = await axios.get("http://15.165.113.9:8080/api/users", {
        headers: { auth: token },
      });
      const userData = userResponse.data.data;
      setIsClubMaster(userData.id === clubData.clubMaster);
      console.log("클럽 정보:", clubData);
      console.log("클럽장 여부:", userData.id === clubData.clubMaster);
    } catch (error) {
      console.error("Error fetching club info", error);
    }
  }, [clubId, token]);

  useEffect(() => {
    fetchClubInfo();
  }, [fetchClubInfo]);

  const handleUpdateClubInfo = async () => {
    // 클럽 정보 수정 로직 구현
  };

  const handleDeleteClub = async () => {
    try {
      await axios.delete(`http://15.165.113.9:8080/api/clubs/${clubId}`, {
        headers: { auth: token },
      });
      // 클럽 삭제 후 페이지 이동 등 추가 처리
      navigate("/clubs");
    } catch (error) {
      console.error("Error deleting club", error);
    }
  };

  const handleKickMember = async (memberId) => {
    try {
      await axios.put(`http://15.165.113.9:8080/api/clubs/${clubId}/kick`, {}, {
        headers: { auth: token },
        params: { memberId }
      });
      // 클럽 구성원 추방 후 상태 업데이트 등 추가 처리
      fetchClubInfo();
    } catch (error) {
      console.error("Error kicking member", error);
    }
  };

  const fetchJoinRequests = async () => {
    try {
      const response = await axios.get(`http://15.165.113.9:8080/api/clubs/applicant/${clubId}`, {
        headers: { auth: token },
      });
      setJoinRequests(response.data.data);
    } catch (error) {
      console.error("Error fetching join requests", error);
    }
  };

  const handleJoinRequestDecision = async (applicantId, accept) => {
    try {
      await axios.put(`http://15.165.113.9:8080/api/clubs/applicant/${clubId}`, {}, {
        headers: { auth: token },
        params: { applicantId, accept }
      });
      // 가입 신청 처리 후 상태 업데이트 등 추가 처리
      fetchJoinRequests();
    } catch (error) {
      console.error("Error handling join request", error);
    }
  };

  const handleLeaveClub = async () => {
    try {
      const response = await axios.put("http://15.165.113.9:8080/api/users/club", {}, {
        headers: { auth: token },
      });
      console.log("클럽 탈퇴 성공:", response.data);
      // 클럽 탈퇴 후 페이지 이동 등 추가 처리
      navigate("/clubs");
    } catch (error) {
      console.error("Error leaving club", error);
      if (error.response) {
        console.error("서버 응답:", error.response.data);
      }
    }
  };

  return (
    <div className="main">
      <div className="club-info">
        <h2>클럽 정보</h2>
        <p>클럽명: {clubInfo.name}</p>
        <p>소개문: {clubInfo.intro}</p>
        <p>주요 스포츠: {clubInfo.sport}</p>
        <p>클럽장: {clubInfo.clubMaster}</p>
        <p>승/무/패: {clubInfo.win}/{clubInfo.draw}/{clubInfo.lose}</p>
        <div className="club-members">
          <h2>클럽 인원</h2>
          <ul>
            {clubInfo.members && clubInfo.members.length > 0 ? (
              clubInfo.members.map((member) => (
                <li key={member.userId} className={selectedMembers.includes(member) ? 'selected' : ''}>
                  {member.nickname}
                  {isClubMaster && (
                    <button onClick={() => handleKickMember(member.userId)}>추방</button>
                  )}
                </li>
              ))
            ) : (
              <li>등록된 인원이 없습니다.</li>
            )}
          </ul>
        </div>
        {isClubMaster ? (
          <>
            <button onClick={handleUpdateClubInfo}>클럽 정보 변경</button>
            <button onClick={handleDeleteClub}>클럽 삭제</button>
            <div className="join-requests">
              <h2>클럽 가입 신청 목록</h2>
              <ul>
                {joinRequests.length > 0 ? (
                  joinRequests.map((request) => (
                    <li key={request.id}>
                      {request.nickname}
                      <button onClick={() => handleJoinRequestDecision(request.id, true)}>수락</button>
                      <button onClick={() => handleJoinRequestDecision(request.id, false)}>거절</button>
                    </li>
                  ))
                ) : (
                  <li>클럽 가입 신청이 없습니다.</li>
                )}
              </ul>
            </div>
          </>
        ) : (
          <button onClick={handleLeaveClub}>클럽 탈퇴</button>
        )}
      </div>
      <div className="main-container">
        <div className="m-match-container">
          <Match latitude={latitude} longitude={longitude} preferCourt={preferCourt} selectedMembers={selectedMembers} />
        </div>
      </div>
    </div>
  );
}

export default ClubInfo;
