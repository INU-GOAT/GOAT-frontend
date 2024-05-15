import React from 'react';
import { RadioGroup } from "@mui/material";
import { SoccerCard, BasketBallCard, BadmintonCard, TableTennisCard } from './../components/SportsCards';

const Sport = ({ sport, setSport, preferSport, setPreferSport, disabled }) => {
  const handleRadioChange = (event) => {
    setPreferSport(event.target.value);
    setSport(event.target.value);
  };

  return (
    <div className="sport-selection-group">
      <RadioGroup
        name="preferSport"
        value={preferSport}
        onChange={handleRadioChange}
        sx={{
          flexDirection: "row",
          mt: 2,
          justifyContent: "space-around",
          alignContent: "space-around",
          flexWrap: "wrap", // 한 줄로 다 표시되지 않을 때, 다음 줄로 넘어가도록 설정
        }}
      >
        <SoccerCard sportState={{ sport, setSport }} label="축구" disabled={disabled} value="soccer" />
        <BasketBallCard sportState={{ sport, setSport }} label="농구" disabled={disabled} value="basketball" />
        <BadmintonCard sportState={{ sport, setSport }} label="배드민턴" disabled={disabled} value="badminton" />
        <TableTennisCard sportState={{ sport, setSport }} label="탁구" disabled={disabled} value="tabletennis" />
      </RadioGroup>
    </div>
  );
};

export default Sport;