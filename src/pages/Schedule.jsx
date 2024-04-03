import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSaturday,
  isSunday,
} from "date-fns";

import {
  Layout,
  Header,
  Title,
  Button,
  CalendarBox,
  WeekLayout,
  Week,
  DayLayout,
  DayBox,
  Day,
  DaySpan,
} from "./CalendarElements";

import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

function Schedule() {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date()); 
  const monthStart = startOfMonth(currentDate); 
  const monthEnd = endOfMonth(monthStart); 
  const startDate = startOfWeek(monthStart); 
  const endDate = endOfWeek(monthEnd); 
  const week = ["일", "월", "화", "수", "목", "금", "토"]; 

  const weeks = week.map((item, index) => {
    return <Week key={index}>{item}</Week>;
  });

  const day = []; 
  let startDay = startDate; 
  let days = []; 
  let formattedDate = ""; 

  while (startDay <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(startDay, "d"); 
      days.push(
        <Day>
          <DaySpan
            style={{
              color:
               
                format(currentDate, "M") !== format(startDay, "M")
                  ? "#ddd"
                  : isSunday(startDay)
                  ? "red"
                  : isSaturday(startDay)
                  ? "blue"
                  : "#000",
            }}
          >
            {formattedDate}
          </DaySpan>
        </Day>
      );
      startDay = addDays(startDay, 1); 
    }

    day.push(<DayBox key={startDay}>{days}</DayBox>);

    days = [];
  }

  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  return (
    <Layout>
      <Header>
        <Button onClick={prevMonth}>
          <AiOutlineLeft size={24} color="#000" />
        </Button>
        <Title>
          {format(currentDate, "yyyy")}년 {format(currentDate, "M")}월
        </Title>
        <Button onClick={nextMonth}>
          <AiOutlineRight size={24} color="#000" />
        </Button>
      </Header>
      <CalendarBox>
        <CalendarBox>
          <WeekLayout>{weeks}</WeekLayout>
          <DayLayout>{day}</DayLayout>
        </CalendarBox>
      </CalendarBox>
    </Layout>
  );
};

export default Schedule;