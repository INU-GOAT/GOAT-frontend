import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import "./css/SignUp.css";
import userAxios from "../apis/userAxios";
import getUser from "../apis/getUser";
import setUser from "../utils/setUser";
import { isLoginStore } from "../utils/store";
//폼 다시 만들기
function SignUp() {
  const [age, setAge] = useState(null);
  const [gender, setGender] = useState(null);
  const [nickname, setNickname] = useState(null);
  const [preferSport, setPreferSport] = useState(null);
  const [soccerTier, setSoccerTier] = useState(null);
  const [basketballTier, setBasketballTier] = useState(null);
  const [badmintonTier, setBadmintonTier] = useState(null);
  const [tableTennisTier, setTableTennisTier] = useState(null);

  const { setIsLogin } = isLoginStore();
  const navigate = useNavigate();

  const signUpHandler = async (e) => {
    e.preventDefault();

    await userAxios
      .post(
        "",
        {
          age,
          gender,
          nickname,
          prefer_sport: preferSport,
          soccer_tier: soccerTier,
          basketball_tier: basketballTier,
          badminton_tier: badmintonTier,
          tableTennis_tier: tableTennisTier,
        },
        {
          "Content-Type": "application/json",
        }
      )
      .then(async (res) => {
        console.log(res);
        const data = await getUser();
        setUser(data);
        localStorage.setItem("isLogin", true);
        setIsLogin(true);
        navigate("/Main");
      })
      .catch((error) => {
        console.error(error);
        alert("회원가입 실패");
        navigate("/");
      });
  };

  return (
    <div className="box">
      <h1>회원가입</h1>
      <form onSubmit={signUpHandler}>
        <p />
        <label>닉네임</label>
        <input
          onChange={(event) => {
            setNickname(event.target.value);
          }}
          required
        ></input>
        <p />
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
