import React from 'react';
import { RadioTileGroup, RadioTile } from '@itwin/itwinui-react';

const Sport = ({ selectedSport, onClick }) => (
  <RadioTileGroup className='demo-radio-tile-group'>
    <RadioTile
      label='축구'
      checked={selectedSport === '축구'}
      onChange={() => onClick('축구')}
    />
    <RadioTile
      label='농구'
      checked={selectedSport === '농구'}
      onChange={() => onClick('농구')}
    />
    <RadioTile
      label='배드민턴'
      checked={selectedSport === '배드민턴'}
      onChange={() => onClick('배드민턴')}
    />
    <RadioTile
      label='탁구'
      checked={selectedSport === '탁구'}
      onChange={() => onClick('탁구')}
    />
  </RadioTileGroup>
);

export default Sport;