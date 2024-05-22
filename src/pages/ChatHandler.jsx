import { CircularProgress, Stack } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "./../apis/getUser";
import setUser from "../utils/setUser";

function ChatHandler() {
  const navigate = useNavigate();
  
  const getUserData = async () => {
    try {
      const userData = await getUser();
      setUser(userData);
    } catch (error) {
      console.error(error);
      console.error("유저정보 불러오기 실패");
    }
  };
  
  const gameData = async () => {
    try {
      const result = await axios.get(`http://15.165.113.9:8080/api/game`, {
        headers: { auth: localStorage.getItem("accessToken") },
      });
      console.log(result.data);
      console.log(result.data.data);
      goChat(result.data);
    } catch (error) {
      console.error(error);
      console.error("진행 중인 게임 불러오기 실패");
      alert("진행중인 게임이 존재하지 않습니다.");
      navigate("/Main");
    }
  };
  
  const goChat = (props) => {
    const team1 = {};
    const team2 = {};
    props.data.team1.forEach((user, index) => {
      team1[user.nickname] = {
        number: index,
        tier: user.ratingScore,
        team: 1,
      };
    });
    props.data.team2.forEach((user, index) => {
      team2[user.nickname] = {
        number: index + props.data.team1.length,
        tier: user.ratingScore,
        team: 2,
      };
    });
    const user = { ...team1, ...team2 };
    const data = {
      gameId: props.data.gameId,
      sportName: props.data.sportName,
      startTime: props.data.startTime,
      preferCourts: props.data.preferCourts,
      team1: team1,
      team2: team2,
      user: user,
    };
    navigate("/Chat", { state: data });
  };

  useEffect(() => {
    const fetchData = async () => {
      await getUserData();
      gameData();
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const game = {
    data: {
      gameId: 2,
      sportName: "농구",
      startTime: "2024-05-18T01:30:00",
      latitude: 33.11,
      longitude: 124.61,
      court: null,
      winTeam: null,
      preferCourts: [
        "청와대",
        "문학 경기장",
        "우리집 앞",
        "설악산",
        "인천대",
        "정보대",
        "백두산",
      ],
      team1: [
        {
          userId: 5,
          nickname: "이태식",
          ratingScore: 800,
        },
        {
          userId: 6,
          nickname: "이혜성",
          ratingScore: 300,
        },
        {
          userId: 2,
          nickname: "인천 호날두",
          ratingScore: 500,
        },
        {
          userId: 3,
          nickname: "김승섭",
          ratingScore: 48,
        },
        {
          userId: 1,
          nickname: "더미#1",
          ratingScore: 52,
        },
      ],
      team2: [
        {
          userId: 10,
          nickname: "로컬이태식",
          ratingScore: 19,
        },
        {
          userId: 8,
          nickname: "김준원",
          ratingScore: 700,
        },
        {
          userId: 9,
          nickname: "조백선",
          ratingScore: 410,
        },
        {
          userId: 7,
          nickname: "o.o",
          ratingScore: 54,
        },
        {
          userId: 4,
          nickname: "더미#4",
          ratingScore: 52,
        },
      ],
    },
    msg: "성공",
  };
  
  const goChatSample = () => {
    const team1 = {};
    const team2 = {};
    game.data.team1.forEach((user, index) => {
      team1[user.nickname] = {
        number: index,
        tier: user.ratingScore,
        team: 1,
      };
    });
    game.data.team2.forEach((user, index) => {
      team2[user.nickname] = {
        number: index + game.data.team1.length,
        tier: user.ratingScore,
        team: 2,
      };
    });
    const user = { ...team1, ...team2 };
    const data = {
      gameId: game.data.gameId,
      sportName: game.data.sportName,
      startTime: game.data.startTime,
      preferCourts: game.data.preferCourts,
      team1: team1,
      team2: team2,
      user: user,
    };
    navigate("/Chat", { state: data });
  };

  return (
    <Stack sx={{ alignItems: "center", mt: 5 }}>
      <h1>채팅방으로 연결 중입니다.</h1>
      <CircularProgress />
      <button onClick={goChatSample}>채팅방으로</button>
    </Stack>
  );
}

export default ChatHandler;