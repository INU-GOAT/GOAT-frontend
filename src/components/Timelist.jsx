import React from "react";
import "./Timelist.css";

function Timelist() {
  // 현재 시간을 가져오는 함수
  const now = new Date();

  // 하루 중 시작 시간과 종료 시간 설정
  const startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
  const endTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);

  // 30분 단위로 각각의 시간을 생성하는 함수
  const generateTimeSlots = () => {
    const timeSlots = [];
    let currentTime = new Date(startTime);

    while (currentTime <= endTime) {
      timeSlots.push(new Date(currentTime));
      currentTime.setMinutes(currentTime.getMinutes() + 30);
    }

    return timeSlots;
  };

  // 슬라이더의 값 설정
  const timeSlots = generateTimeSlots();
  const sliderMaxValue = timeSlots.length - 1;

  // 슬라이더의 현재 값을 가져오는 함수
  const getCurrentValue = (index) => timeSlots[index].getTime();

  // 이미 지난 시간을 계산하여 슬라이더에서 움직일 수 없게 함
  const disabledBefore = now.getTime() < startTime.getTime();

  return (
    <div className="card-conteiner">
      <div className="card-content">
        <div className="card-title">
          <span>시간 설정</span>
        </div>
        <div className="values">
          <div>
            <span id="first">{startTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
          </div>
          {" - "}
          <div>
            <span id="second">{endTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
          </div>
        </div>
        <small className="current-range">
          시간범위:
          <div>
            <span id="third">{timeSlots[sliderMaxValue].toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}</span>
          </div>
        </small>
        <div
          data-range="#third"
          data-value-1="#second"
          data-value-0="#first"
          className="slider"
        >
          <label className="label-min-value">{startTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</label>
          <label className="label-max-value">{endTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</label>
        </div>
        <div className="rangeslider">
          <input
            className="min input-ranges"
            name="range_1"
            type="range"
            min="0"
            max={sliderMaxValue}
            value={disabledBefore ? "0" : undefined}
            disabled={disabledBefore}
          />
          <input
            className="max input-ranges"
            name="range_1"
            type="range"
            min="0"
            max={sliderMaxValue}
            value={sliderMaxValue}
            disabled={true}
          />
        </div>
      </div>
    </div>
  );
}

export default Timelist;
