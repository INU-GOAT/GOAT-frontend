import styled from "styled-components";

const Layout = styled.div`
  max-width: 1300px;
  margin: 100px auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
`;

const Title = styled.div`
  font-size: 36px;
  color: #000;
  font-weight: 700;
  display: flex;
  align-items: center;
`;

const Button = styled.div`
  margin: 0 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CalendarBox = styled.div`
  margin-top: 40px;
`;

const WeekLayout = styled.div`
  display: flex;
`;

const Week = styled.div`
  width: 14.28%;
  color: #8f8f8f;
  display: flex;
  justify-content: center;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 10px;
`;

const DayLayout = styled.div`
  width: 100%;
  margin-top: 10px;
`;

const DayBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Day = styled.div`
  width: 14.28%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #ddd;
`;

const DaySpan = styled.span`
  padding: 10px;
  border-radius: 50%;
  position: relative;
  font-weight: 700;
`;

export {
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
};