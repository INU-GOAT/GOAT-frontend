import React from 'react';
import { RadioGroup } from "@mui/material";
import { SoccerCard, BasketBallCard, BadmintonCard, TableTennisCard } from './../components/SportsCards';
import './Sport.css';

const Sport = ({ sport, setSport, preferSport, setPreferSport, disabled }) => {
  const handleCardClick = (value) => {
    setPreferSport(value);
    setSport(value);
  };

  return (
    <div className="sport-selection-group">
      <div className="sport-radio-container">
        <RadioGroup
          name="preferSport1"
          value={preferSport}
          className="sport-radio-group"
        >
          <div className="card-wrapper">
            <SoccerCard sportState={{ sport, setSport: () => handleCardClick('soccer') }} disabled={disabled} />
          </div>
          <div className="card-wrapper">
            <BasketBallCard sportState={{ sport, setSport: () => handleCardClick('basketBall') }} disabled={disabled} />
          </div>
        </RadioGroup>
        <RadioGroup
          name="preferSport2"
          value={preferSport}
          className="sport-radio-group"
        >
          <div className="card-wrapper">
            <BadmintonCard sportState={{ sport, setSport: () => handleCardClick('badminton') }} disabled={disabled} />
          </div>
          <div className="card-wrapper">
            <TableTennisCard sportState={{ sport, setSport: () => handleCardClick('tableTennis') }} disabled={disabled} />
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default Sport;