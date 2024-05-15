// Club.jsx

import React from 'react';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import "./css/Club.css";
import Sport from '../components/Sport';

function Club() {
    const [clubname, setClubname] = useState('');
    const [intro, setIntro] = useState('');
    const [selectedSport, setSelectedSport] = useState('');
    const [preferSport, setPreferSport] = useState('');
    const [matchingInProgress, setMatchingInProgress] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`submit! ${clubname} ${intro} ${selectedSport}`);
        navigate("/ClubInfo"); // ClubInfo 페이지로 이동
    };

    return (
        <div className="Club">
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
    );
}

export default Club;
