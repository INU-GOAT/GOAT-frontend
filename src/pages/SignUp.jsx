import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import "./css/SignUp.css";

function SignUp() {
  const { state } = useLocation();

  const [age, setAge] = useState(null);
  const [gender, setGender] = useState(null);
  const [preferSport, setPreferSport] = useState(null);
  const [soccerTier, setSoccerTier] = useState(null);
  const [basketballTier, setBasketballTier] = useState(null);
  const [badmintonTier, setBadmintonTier] = useState(null);
  const [tableTennisTier, setTableTennisTier] = useState(null);

  const navigate = useNavigate();

  const signUpHandler = async (e) => {
    e.preventDefault();
    console.log(state.accessToken);
    await axios
      .post(
        "http://15.165.113.9:8080/api/users",
        {
          age,
          gender,
          prefer_sport: preferSport,
          soccer_tier: soccerTier,
          basketball_tier: basketballTier,
          badminton_tier: badmintonTier,
          tableTennis_tier: tableTennisTier,
        },
        {
          "Content-Type": "application/json",
          headers: { Auth: state.accessToken },
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        //필요한 값 사용하기
        navigate("/Main");
      })
      .catch((error) => {
        console.error(error);
        console.error("회원가입 실패");
      });
  };

  return (
    <div className="box">
      <h1>회원가입</h1>
      <form onSubmit={signUpHandler}>
        <p />
        <label>나이대</label>
        <input
          onChange={(event) => {
            setAge(event.target.value);
          }}
          required
          type="text"
        ></input>
        <p />
        <label>성별</label>
        <input
          onChange={(event) => {
            setGender(event.target.value);
          }}
          required
        ></input>
        <p />
        <label>선호 스포츠</label>
        <input
          onChange={(event) => {
            setPreferSport(event.target.value);
          }}
          required
        ></input>
        <p />
        <label>축구실력</label>
        <input
          onChange={(event) => {
            setSoccerTier(event.target.value);
          }}
          required
          type="text"
        ></input>
        <p />
        <label>농구실력</label>
        <input
          onChange={(event) => {
            setBasketballTier(event.target.value);
          }}
          required
          type="text"
        ></input>
        <p />
        <label>배드민턴실력</label>
        <input
          onChange={(event) => {
            setBadmintonTier(event.target.value);
          }}
          required
          type="text"
        ></input>

        <label>탁구실력</label>
        <input
          onChange={(event) => {
            setTableTennisTier(event.target.value);
          }}
          required
          type="text"
        ></input>
        <button>가입하기</button>
      </form>
    </div>
  );
}

export default SignUp;

//수정 해야 할 부분 : 유효성 검사, 성멸선택, 나이
