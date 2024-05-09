import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Matching = ({ onStartMatching, matchType, selectedSport, selectedTime, matchingInProgress }) => {
  const handleStartMatching = () => {
    if (!matchType || !selectedSport || !selectedTime) {
      alert('매치 실패: 매치 유형, 종목, 시간을 선택하세요.');
      return;
    }
    onStartMatching();
  };

  return (
    <div>
      {matchingInProgress ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      ) : (
        <div>
          <button 
            onClick={handleStartMatching} 
            disabled={matchingInProgress}
            className="matching-button"
          >
            매칭 시작
          </button>
        </div>
      )}
    </div>
  );
};

export default Matching;