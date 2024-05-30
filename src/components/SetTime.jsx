import { Box, Button, Slider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
const createTimeMarks = () => {
  const marks = [];
  for (let i = 9; i <= 21; i++) {
    marks.push({ value: (i - 9) * 2, label: `${i}` });
    marks.push({ value: (i - 9) * 2 + 1, label: `` });
  }
  return marks;
};

const valueLabelFormat = (value) => {
  const hour = Math.floor(value / 2) + 9;
  const minute = value % 2 === 0 ? "00" : "30";
  return `${hour}:${minute}`;
};

const getCurrentTimeValue = () => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  if (hours >= 21) {
    return 0;
  }

  const roundedMinutes = Math.ceil(minutes / 30) * 30;
  const adjustedMinutes = roundedMinutes === 60 ? 0 : roundedMinutes;
  const adjustedHours = roundedMinutes === 60 ? hours + 1 : hours;

  const value = (adjustedHours - 9) * 2 + (adjustedMinutes === 30 ? 1 : 0);
  return value < 0 ? 0 : value;
};

const convertRangeToTimeArray = (start, end) => {
  const timeArray = [];
  for (let i = start; i <= end; i++) {
    const hour = Math.floor(i / 2) + 9;
    const minute = i % 2 === 0 ? "00" : "30";
    const formattedTime = `${hour.toString().padStart(2, "0")}${minute}`;
    timeArray.push(formattedTime);
  }
  return timeArray;
};

const SetTime = (props) => {
  const [value, setValue] = useState([0, 24]);
  const [minValue, setMinValue] = useState(0);

  useEffect(() => {
    const currentValue = getCurrentTimeValue();
    setValue([currentValue, 24]);
    setMinValue(currentValue);
  }, []);
  const handleChange = (event, newValue) => {
    if (newValue[0] >= minValue && newValue[1] >= minValue) {
      setValue(newValue);
      props.setTimeArray(convertRangeToTimeArray(newValue[0], newValue[1]));
    }
  };

  return (
    <div style={{ width: 500, margin: "50px auto", textAlign: "center" }}>
      <h3 id="range-slider" style={{ fontSize: "24px", margin: "20px auto" }}>
        시간 설정
      </h3>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        valueLabelFormat={valueLabelFormat}
        step={1}
        marks={createTimeMarks()}
        min={0}
        max={24}
        aria-labelledby="range-slider"
        disableSwap
        disabled={props.disabled}
      />
      <Typography style={{ margin: "20px auto" }}>
        선택한 시간 : {valueLabelFormat(value[0])} -{" "}
        {valueLabelFormat(value[1])}
      </Typography>
    </div>
  );
};

export default SetTime;
