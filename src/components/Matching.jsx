import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const Matching = ({ onStartMatching, onCancelMatching, matchType, selectedSport, selectedTime, matchingInProgress, gaming }) => {
  const handleStartMatching = () => {
    if (!matchType || !selectedSport || !selectedTime) {
      alert('매치 실패: 매치 유형, 종목, 시간을 선택하세요.');
      return;
    }
    onStartMatching();
  };

  return (
    <div>
      {gaming ? (
        <p className="game-status">게임 중입니다</p>
      ) : matchingInProgress ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
          <Button
            variant="contained"
            color="secondary"
            onClick={onCancelMatching}
            sx={{ ml: 2 }}
          >
            매칭 취소
          </Button>
        </Box>
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={handleStartMatching}
          sx={{ mt: 2 }}
        >
          매칭 시작
        </Button>
      )}
    </div>
  );
};

export default Matching;