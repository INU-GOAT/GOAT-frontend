import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import Match from './Match_club';
import './css/ClubInfo.css'; 

function ClubInfo() {
  const location = useLocation();

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [preferCourt, setPreferCourt] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([]); // 선택된 클럽 인원 목록
  const [joinRequests, setJoinRequests] = useState([]); // 클럽 가입 신청 목록

  const handleLocationChange = (lat, lng, courtName) => {
    setLatitude(lat);
    setLongitude(lng);
    setPreferCourt(courtName);
  };

  const toggleMemberSelection = (member) => {
    const isSelected = selectedMembers.includes(member);
    if (isSelected) {
      setSelectedMembers(selectedMembers.filter((selected) => selected !== member));
    } else {
      setSelectedMembers([...selectedMembers, member]);
    }
  };

  const handleJoinRequest = () => {
    setJoinRequests([...joinRequests, ...selectedMembers]);
    setSelectedMembers([]); // 선택된 클럽 인원 초기화
  };

  const { clubname, intro, majorSport, members } = location.state || {};

  return (
    <div className="main">
      <div className="club-info">
        <h2>클럽 정보</h2>
        <p>클럽명: {clubname}</p>
        <p>소개문: {intro}</p>
        <p>주요 스포츠: {majorSport}</p>
        <div className="club-members">
          <h2>클럽 인원</h2>
          <ul>
            {members && members.length > 0 ? (
              members.map((member, index) => (
                <li key={index} onClick={() => toggleMemberSelection(member)} className={selectedMembers.includes(member) ? 'selected' : ''}>
                  {member}
                </li>
              ))
            ) : (
              <li>등록된 인원이 없습니다.</li>
            )}
          </ul>
        </div>
        <div className="join-requests">
          <h2>클럽 가입 신청 목록</h2>
          <ul>
            {joinRequests.length > 0 ? (
              joinRequests.map((request, index) => (
                <li key={index}>{request}</li>
              ))
            ) : (
              <li>클럽 가입 신청이 없습니다.</li>
            )}
          </ul>
        </div>
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
