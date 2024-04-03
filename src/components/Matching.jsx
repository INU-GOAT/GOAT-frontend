import React from 'react';

const Matching = ({ onStartMatching, matchType, selectedSport, selectedTime }) => {
  const handleStartMatching = () => {
    if (!matchType || !selectedSport || !selectedTime) {
      alert('매치 실패: 매치 유형, 종목, 시간을 선택하세요.');
      return;
    }
    onStartMatching();
  };

  return (
    <button onClick={handleStartMatching}>매칭 시작</button>
  );
};

export default Matching;