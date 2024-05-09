import React from 'react';
import { SoccerCard, BasketBallCard, BadmintonCard, TableTennisCard } from './../components/SportsCards';

const Sport = ({ sport, setSport, disabled }) => (
  <div className="sports-card-group">
    <SoccerCard sportState={{ sport, setSport }} label="축구" disabled={disabled} />
    <BasketBallCard sportState={{ sport, setSport }} label="농구" disabled={disabled} />
    <BadmintonCard sportState={{ sport, setSport }} label="배드민턴" disabled={disabled} />
    <TableTennisCard sportState={{ sport, setSport }} label="탁구" disabled={disabled} />
  </div>
);

export default Sport;