import React, { useState, useEffect } from "react";
import "./Timelist.css";
import { Slider, Box, Typography } from "@mui/material";

function Timelist() {
  const now = new Date();
  const startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
  const endTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
  const [sliderValue, setSliderValue] = useState(0);

  useEffect(() => {
    const currentTimeIndex = Math.floor((now - startTime) / (1000 * 60 * 30));
    setSliderValue(currentTimeIndex);
  }, []);

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

  const handleChange = (_, newValue) => {
    if (now.getTime() >= timeSlots[newValue].getTime()) return; // 현재 시간 이전의 시간으로 이동할 수 없도록 설정
    setSliderValue(newValue);
  };

  return (
    <div className="card-conteiner">
      <div className="card-content">
        <div className="card-title">
          <span>시간 설정</span>
        </div>
        <Box sx={{ width: 230 }}>
          <Slider
            step={1}
            min={0}
            max={sliderMaxValue}
            value={sliderValue}
            onChange={handleChange}
          />
        </Box>
        <div className="values">
          <Typography variant="body2">
            {timeSlots[sliderValue].toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default Timelist;