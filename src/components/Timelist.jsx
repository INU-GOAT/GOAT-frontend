import React, { useState, useEffect } from 'react';
import { Slider, Box } from '@mui/material';

const Timelist = ({ onChange, disabled }) => {
  const now = new Date();
  const startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
  const endTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);

  const generateTimeSlots = () => {
    const timeSlots = [];
    let currentTime = new Date(startTime);
    while (currentTime <= endTime) {
      timeSlots.push(new Date(currentTime));
      currentTime.setMinutes(currentTime.getMinutes() + 30);
    }
    return timeSlots;
  };

  const timeSlots = generateTimeSlots();
  const sliderMaxValue = timeSlots.length - 1;

  const findInitialSliderValue = () => {
    const closestTimeSlot = timeSlots.reduce((closest, current) => {
      return Math.abs(current - now) < Math.abs(closest - now) ? current : closest;
    }, timeSlots[0]);

    return timeSlots.indexOf(closestTimeSlot);
  };

  const initialSliderValue = findInitialSliderValue();

  const [sliderValue, setSliderValue] = useState(initialSliderValue);

  useEffect(() => {
    onChange(timeSlots[initialSliderValue]);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (_, newValue) => {
    if (!disabled) {
      setSliderValue(newValue);
      onChange(timeSlots[newValue]);
    }
  };

  return (
    <div className="card-container">
      <div className="card-content">
        <div>
          <h3 className="match-title">시간 설정</h3>
        </div>
        <Box sx={{ width: 370 }}>
          <Slider
            step={1}
            min={0}
            max={sliderMaxValue}
            value={sliderValue}
            onChange={handleChange}
            disabled={disabled}
          />
        </Box>
        <div className="values">
          <h3 className="match-title">
            {timeSlots[sliderValue].toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Timelist;