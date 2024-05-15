import React from 'react';
import { RadioGroup } from "@mui/material";
import { SoccerCard, BasketBallCard, BadmintonCard, TableTennisCard } from './../components/SportsCards';

const Sport = ({ sport, setSport, preferSport, setPreferSport, disabled }) => {
  const handleCardClick = (value) => {
    setPreferSport(value);
    setSport(value);
  };

  return (
    <div className="sport-selection-group">
      <RadioGroup
        name="preferSport"
        value={preferSport}
        sx={{
          flexDirection: "row",
          mt: 2,
          justifyContent: "space-around",
          alignContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        <SoccerCard sportState={{ sport, setSport: () => handleCardClick('soccer') }} disabled={disabled} />
        <BasketBallCard sportState={{ sport, setSport: () => handleCardClick('basketball') }} disabled={disabled} />
        <BadmintonCard sportState={{ sport, setSport: () => handleCardClick('badminton') }} disabled={disabled} />
        <TableTennisCard sportState={{ sport, setSport: () => handleCardClick('tabletennis') }} disabled={disabled} />
      </RadioGroup>
    </div>
  );
};

export default Sport;