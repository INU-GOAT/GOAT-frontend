import { useNavigate } from "react-router-dom";
import { useState } from 'react'

function Club() {
    const [clubname, setClubname] = useState('');
    const [intro, setIntro] = useState('');
    const [sport, setSport] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(`submit! ${clubname} ${setIntro}`);
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
          <input
            type="radio"
            name="soccer"
            value={sport}
            id="soccer"
            onChange={(e) => setIntro(e.target.value)}
            />
           <label htmlFor="축구">Large</label>
           <input
            type="radio"
            name="pingpong"
            value={sport}
            id="pingpong"
            onChange={(e) => setIntro(e.target.value)}
            />
           <label htmlFor="탁구">Large</label>
           <input
            type="radio"
            name="basketball"
            value={sport}
            id="basketball"
            onChange={(e) => setIntro(e.target.value)}
            />
           <label htmlFor="농구">Large</label>
           <input
            type="radio"
            name="sport"
            value={sport}
            id="badminton"
            onChange={(e) => setIntro(e.target.value)}
            />
           <label htmlFor="배드민턴">Large</label>

          <input type="submit" />
        </form>
      </div>
    );
  }
  export default Club;