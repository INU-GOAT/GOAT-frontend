import React from 'react';

const MatchType = ({ matchType, isSelected, onClick }) => {
  const handleClick = () => {
    onClick(matchType);
  };

  return (
    <button className={isSelected ? 'selected' : ''} onClick={handleClick}>
      {matchType}
    </button>
  );
};

export default MatchType;