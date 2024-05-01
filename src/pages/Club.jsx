import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import "./css/Club.css";

function Club() {
    const [clubname, setClubname] = useState('');
    const [intro, setIntro] = useState('');
    const [sport, setSport] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`submit! ${clubname} ${intro} ${sport}`);
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
                <label>
                    <input
                        type="radio"
                        name="sport"
                        value="soccer"
                        checked={sport === "soccer"}
                        onChange={(e) => setSport(e.target.value)}
                    />
                    축구
                </label>
                <label>
                    <input
                        type="radio"
                        name="sport"
                        value="pingpong"
                        checked={sport === "pingpong"}
                        onChange={(e) => setSport(e.target.value)}
                    />
                    탁구
                </label>
                <label>
                    <input
                        type="radio"
                        name="sport"
                        value="basketball"
                        checked={sport === "basketball"}
                        onChange={(e) => setSport(e.target.value)}
                    />
                    농구
                </label>
                <label>
                    <input
                        type="radio"
                        name="sport"
                        value="badminton"
                        checked={sport === "badminton"}
                        onChange={(e) => setSport(e.target.value)}
                    />
                    배드민턴
                </label>
                <input type="submit" />
            </form>
        </div>
    );
}

export default Club;
