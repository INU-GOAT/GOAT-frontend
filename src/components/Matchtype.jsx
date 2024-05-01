import * as React from 'react';
import Button from '@mui/material/Button';
import './Matchtype.css';

const MatchType = ({ matchType, isSelected, onClick, disabled }) => {
  const handleClick = () => {
    if (!disabled) {
      onClick(matchType);
    }
  };

  return (
    <Button
      variant="contained"
      onClick={handleClick}
      className={`match-type-button ${isSelected ? 'selected' : ''}`}
      disabled={disabled}
    >
      {matchType}
    </Button>
  );
};

export default MatchType;