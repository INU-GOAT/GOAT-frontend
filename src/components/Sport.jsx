import React from 'react';

const Sport = ({ sport, isSelected, onClick }) => (
  <button className={isSelected ? 'selected' : ''} onClick={() => onClick(sport)}>
    {sport}
  </button>
);

export default Sport;