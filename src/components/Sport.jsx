import React from 'react';
import { RadioTileGroup, RadioTile } from '@itwin/itwinui-react';

const Sport = ({ selectedSport, onClick }) => (
  <RadioTileGroup className='demo-radio-tile-group'>
    <RadioTile
      label='축구'
      icon={
        <svg aria-hidden='true' viewBox='0 0 24 24'>
            <path
              d='m12 0a7.98189 7.98189 0 0 0 -6.9688 11.906c.1079.192.221.381.3438.563l6.625 11.531 6.625-11.531c.102-.151.19-.311.281-.469l.063-.094a7.98217 7.98217 0 0 0 -6.969-11.906zm0 4a4 4 0 1 1 -4 4 4.00011 4.00011 0 0 1 4-4z'
              fill='#e74c3c'
            />
          </svg>
      }
      checked={selectedSport === '축구'}
      onChange={() => onClick('축구')}
    />
    <RadioTile
      label='농구'
      icon={
        <svg aria-hidden='true' viewBox='0 0 24 24'>
          <path
            d='m12 0a7.98189 7.98189 0 0 0 -6.9688 11.906c.1079.192.221.381.3438.563l6.625 11.531 6.625-11.531c.102-.151.19-.311.281-.469l.063-.094a7.98217 7.98217 0 0 0 -6.969-11.906zm0 4a4 4 0 1 1 -4 4 4.00011 4.00011 0 0 1 4-4z'
            fill='#e74c3c'
          />
        </svg>
      }
      checked={selectedSport === '농구'}
      onChange={() => onClick('농구')}
    />
    <RadioTile
      label='배드민턴'
      icon={
        <svg aria-hidden='true' viewBox='0 0 24 24'>
          <path
            d='m12 0a7.98189 7.98189 0 0 0 -6.9688 11.906c.1079.192.221.381.3438.563l6.625 11.531 6.625-11.531c.102-.151.19-.311.281-.469l.063-.094a7.98217 7.98217 0 0 0 -6.969-11.906zm0 4a4 4 0 1 1 -4 4 4.00011 4.00011 0 0 1 4-4z'
            fill='#e74c3c'
          />
        </svg>
      }
      checked={selectedSport === '배드민턴'}
      onChange={() => onClick('배드민턴')}
    />
    <RadioTile
      label='탁구'
      icon={
        <svg aria-hidden='true' viewBox='0 0 24 24'>
          <path
            d='m12 0a7.98189 7.98189 0 0 0 -6.9688 11.906c.1079.192.221.381.3438.563l6.625 11.531 6.625-11.531c.102-.151.19-.311.281-.469l.063-.094a7.98217 7.98217 0 0 0 -6.969-11.906zm0 4a4 4 0 1 1 -4 4 4.00011 4.00011 0 0 1 4-4z'
            fill='#e74c3c'
          />
        </svg>
      }
      checked={selectedSport === '탁구'}
      onChange={() => onClick('탁구')}
    />
  </RadioTileGroup>
);

export default Sport;