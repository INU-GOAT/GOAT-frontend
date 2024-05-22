import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Checkbox, FormControlLabel, FormGroup, Typography, Box } from '@mui/material';
import './Timelist.css';

const Timelist = ({ onChange, disabled }) => {
  const now = useMemo(() => new Date(), []);
  const startTime = useMemo(() => new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0), [now]);
  const endTime = useMemo(() => new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59), [now]);

  const generateTimeSlots = useCallback(() => {
    const timeSlots = [];
    let currentTime = new Date(startTime);
    while (currentTime <= endTime) {
      timeSlots.push(new Date(currentTime));
      currentTime.setMinutes(currentTime.getMinutes() + 30);
    }
    return timeSlots;
  }, [startTime, endTime]);

  const timeSlots = useMemo(() => generateTimeSlots(), [generateTimeSlots]);
  const sliderMaxValue = timeSlots.length - 1;

  const [selectedTimes, setSelectedTimes] = useState([]);

  const handleCheckboxChange = (time) => (event) => {
    const newSelectedTimes = event.target.checked
      ? [...selectedTimes, time]
      : selectedTimes.filter((t) => t !== time);

    if (newSelectedTimes.length > 2) {
      newSelectedTimes.shift();
    }

    setSelectedTimes(newSelectedTimes);
  };

  useEffect(() => {
    if (selectedTimes.length === 2) {
      const [start, end] = selectedTimes.sort((a, b) => a - b);
      const range = timeSlots.filter(time => time >= start && time <= end);
      onChange(range);
    } else {
      onChange(selectedTimes);
    }
  }, [selectedTimes, onChange, timeSlots]);

  const formatSelectedTimes = (times) => {
    if (times.length !== 2) return '';

    const [start, end] = times.sort((a, b) => a - b);

    return `${start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ~ ${end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  return (
    <div className="card-container" style={{ minWidth: '360px' }}>
      <div className="card-content">
        <div>
          <h3 className="match-title">시간 설정</h3>
        </div>
        <Box sx={{ height: 300, overflowY: 'auto' }}>
          <FormGroup className="time-slots-grid">
            {timeSlots.map((time, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={selectedTimes.includes(time)}
                    onChange={handleCheckboxChange(time)}
                    disabled={disabled}
                    sx={{
                      '& .MuiSvgIcon-root': {
                        fontSize: 28,
                        color: 'primary.main', 
                      },
                      '&.Mui-checked': {
                        color: 'primary.main', 
                      },
                    }}
                  />
                }
                label={time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                className="time-slot"
              />
            ))}
          </FormGroup>
        </Box>
        <div className="values">
          <Typography variant="body1" className="selected-time" style={{ minHeight: '24px' }}>
            선택한 시간: {formatSelectedTimes(selectedTimes)}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Timelist;