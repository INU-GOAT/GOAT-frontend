import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./css/Club.css";
import Sport from "../components/Sport";

function Club() {
  const [clubname, setClubname] = useState("");
  const [intro, setIntro] = useState("");
  const [selectedSport, setSelectedSport] = useState("");
  const [preferSport, setPreferSport] = useState("");
  const [matchingInProgress, setMatchingInProgress] = useState(false);

  const [clubs, setClubs] = useState([]);
  const [selectedClub, setSelectedClub] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getClubs();
  }, []);

  const getClubs = async () => {
    try {
      const response = await axios.get("http://15.165.113.9:8080/api/clubs", {
        headers: { auth: localStorage.getItem("accessToken") },
      });
      setClubs(response.data.data || []);
    } catch (error) {
      console.error("Error fetching clubs", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sportMapping = {
      soccer: "축구",
      basketBall: "농구",
      badminton: "배드민턴",
      tableTennis: "탁구",
    };

    try {
      const response = await axios.post(
        "http://15.165.113.9:8080/api/clubs",
        {
          name: clubname,
          sport: sportMapping[selectedSport] || selectedSport,
          clubMaster: localStorage.getItem("userId"),
        },
        {
          headers: { auth: localStorage.getItem("accessToken") },
        }
      );
      const newClub = response.data.data;
      setClubs([...clubs, newClub]);
      navigate("/ClubInfo", { state: { clubId: newClub.id } });
    } catch (error) {
      console.error("Error creating club", error);
      if (error.response) {
        console.error("Server response:", error.response.data);
      }
    }
  };

  const handleClubClick = (clubId) => {
    const club = clubs.find((c) => c.id === clubId);
    if (club) {
      setSelectedClub(club);
    }
  };

  const handleJoinRequest = async () => {
    try {
      await axios.post(
        `http://15.165.113.9:8080/api/clubs/applicant/${selectedClub.id}`,
        {},
        {
          headers: { auth: localStorage.getItem("accessToken") },
        }
      );
      alert(`가입 신청이 ${selectedClub.name}에 제출되었습니다.`);
    } catch (error) {
      console.error("Error joining club", error);
    }
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
          <input type="submit" className="submit" />
        </form>
      </div>
      <div className="clublist">
        <h1>클럽 목록</h1>
        {clubs.map((club) => (
          <div key={club.id}>
            <div className="clubItem" onClick={() => handleClubClick(club.id)}>
              <h3>{club.name}</h3>
              <p>{club.intro}</p>
              {selectedClub && selectedClub.id === club.id && (
                <div className="clubDetails">
                  <div className="clubDetailsContent">
                    <p>
                      <strong>클럽명:</strong> {selectedClub.name}
                    </p>
                    <p>
                      <strong>소개문:</strong> {selectedClub.intro}
                    </p>
                    <p>
                      <strong>메이저 스포츠:</strong> {selectedClub.majorSport}
                    </p>
                    <p>
                      <strong>클럽 인원:</strong>{" "}
                      {selectedClub.members
                        ? selectedClub.members.join(", ")
                        : "없음"}
                    </p>
                  </div>
                  <button className="joinButton" onClick={handleJoinRequest}>
                    가입 신청
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Club;
