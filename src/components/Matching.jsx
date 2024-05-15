import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const Matching = ({ onStartMatching, onCancelMatching, matchType, selectedSport, selectedTime, matchingInProgress }) => {
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
        <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
          <CircularProgress />
          <Button variant="contained" onClick={onCancelMatching} sx={{ mt: 2 }}>
            매칭 취소
          </Button>
        </Box>
      ) : (
        <div>
          <Button
            variant="contained"
            onClick={handleStartMatching}
          >
            매칭 시작
          </Button>
        </div>
      )}
    </div>
  );
};

export default Matching;