import React from 'react';
import { RadioGroup } from "@mui/material";
import { SoccerCard, BasketBallCard, BadmintonCard, TableTennisCard } from './../components/SportsCards';

const Sport = ({ sport, setSport, preferSport, setPreferSport, disabled, matchType }) => {
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
          flexWrap: "wrap",
        }}
      >
        <SoccerCard
          sportState={{ sport, setSport }}
          label="축구"
          disabled={disabled || (matchType === '솔로' && sport === 'soccer')}
          value="soccer"
        />
        <BasketBallCard
          sportState={{ sport, setSport }}
          label="농구"
          disabled={disabled || (matchType === '솔로' && sport === 'basketBall')}
          value="basketBall"
        />
      </RadioGroup>
      <RadioGroup
        name="preferSport"
        value={preferSport}
        onChange={handleRadioChange}
        sx={{
          flexDirection: "row",
          mt: 2,
          justifyContent: "space-around",
          alignContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        <BadmintonCard
          sportState={{ sport, setSport }}
          label="배드민턴"
          disabled={disabled || (matchType === '솔로' && sport === 'badminton')}
          value="badminton"
        />
        <TableTennisCard
          sportState={{ sport, setSport }}
          label="탁구"
          disabled={disabled || matchType === '팀'}
          value="tableTennis"
        />
      </RadioGroup>
    </div>
  );
};

export default Sport;