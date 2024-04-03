import React from 'react';

const MatchType = ({ matchType, isSelected, onClick }) => (
  <button className={isSelected ? 'selected' : ''} onClick={() => onClick(matchType)}>
    {matchType}
  </button>
);

export default MatchType;