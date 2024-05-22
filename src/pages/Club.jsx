import React, { useState } from 'react';
import { useNavigate,useLocation } from "react-router-dom";
import "./css/Club.css";
import Sport from '../components/Sport';

function Club() {
  const [clubname, setClubname] = useState('');
  const [intro, setIntro] = useState('');
  const [selectedSport, setSelectedSport] = useState('');
  const [preferSport, setPreferSport] = useState('');
  const [matchingInProgress, setMatchingInProgress] = useState(false);

  const [clubs, setClubs] = useState([
    { id: 1, name: '축구 클럽', intro: '우리는 축구를 사랑합니다.', majorSport:'soccer', members: ['김철수', '이영희'] },
    { id: 2, name: '농구 클럽', intro: '농구는 우리의 열정입니다.', majorSport:'basketball', members: ['박지성', '홍길동'] },
  ]);

  const [selectedClub, setSelectedClub] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`submit! ${clubname} ${intro} ${selectedSport}`);
    const newClub = { id: clubs.length + 1, name: clubname, intro, members: ['김철수', '이영희', '박지성'], majorSport: selectedSport };
    setClubs([...clubs, newClub]);
    navigate("/ClubInfo", { state: newClub }); 
  };

const handleClubClick = (clubId) => {
  const club = clubs.find(c => c.id === clubId);
  if (club) {
    setSelectedClub(club);
    navigate("/ClubInfo", { state: club });
  }
};


  const handleJoinRequest = () => {
    alert(`가입 신청이 ${selectedClub.name}에 제출되었습니다.`);
  };

  return (
    <div className="main">
      <div className="signup">
        <h1>클럽 제작</h1>
        <form onSubmit={handleSubmit}>
          <input
            name="clubname"
            value={clubname}
            placeholder="클럽명"
            onChange={(e) => setClubname(e.target.value)}
          />
          <input
            name="intro"
            value={intro}
            placeholder="소개문"
            onChange={(e) => setIntro(e.target.value)}
          />
          <Sport
            sport={selectedSport}
            setSport={setSelectedSport}
            preferSport={preferSport}
            setPreferSport={setPreferSport}
            disabled={matchingInProgress}
          />
          <input 
            type="submit"
            className="submit"
          />
        </form>
      </div>
      <div className="clublist">
        <h1>클럽 목록</h1>
        {clubs.map((club) => (
          <div key={club.id}>
            <div className="clubItem" onClick={() => handleClubClick(club.id)}>
              <h3>{club.name}</h3>
              <p>{club.intro}</p>
            </div>
            {selectedClub && selectedClub.id === club.id && (
              <div className="clubDetails">
                <div className="clubDetailsContent">
                  <p><strong>클럽명:</strong> {selectedClub.name}</p>
                  <p><strong>소개문:</strong> {selectedClub.intro}</p>
                  <p><strong>메이저 스포츠:</strong> {selectedClub.majorSport}</p>
                  <p><strong>클럽 인원:</strong> {selectedClub.members.join(', ')}</p>
                </div>
                <button className="joinButton" onClick={handleJoinRequest}>가입 신청</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Club;
