import { CircularProgress, Stack } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import getUser from "./../apis/getUser";
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
      if (result.data.data.clubGame) {
        goClubChat(result.data);
      } else {
        goChat(result.data);
      }
    } catch (error) {
      console.error(error);
      console.error("진행 중인 게임 불러오기 실패");
      alert("진행중인 게임이 존재하지 않습니다.");
      navigate("/Main");
    }
  };
  const goClubChat = (props) => {};
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
    let court = null;
    if (props.data.court) {
      court = [
        {
          court: props.data.court,
          latitude: props.data.latitude,
          longitude: props.data.longitude,
        },
      ];
    }
    const data = {
      gameId: props.data.gameId,
      sportName: props.data.sportName,
      startTime: props.data.startTime,
      preferCourts: props.data.preferCourts,
      team1: team1,
      team2: team2,
      user: user,
      court: court,
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

  return (
    <Stack sx={{ alignItems: "center", mt: 5 }}>
      <h1>채팅방으로 연결 중입니다.</h1>
      <CircularProgress />
    </Stack>
  );
}

export default ChatHandler;
