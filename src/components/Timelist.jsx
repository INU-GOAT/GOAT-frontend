import React from 'react';

const Timelist = ({ onChange }) => {
  const times = [];
  for (let hour = 9; hour <= 21; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const formattedHour = String(hour).padStart(2, '0');
      const formattedMinute = String(minute).padStart(2, '0');
      times.push(`${formattedHour}:${formattedMinute}`);
    }
  }

  return (
    <select onChange={(e) => onChange(e.target.value)}>
      {times.map((time, index) => (
        <option key={index} value={time}>
          {time}
        </option>
      ))}
    </select>
  );
};

export default Timelist;