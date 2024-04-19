import React from "react";
import userAxios from "./userAxios";
import getUser from "./getUser";

function ApiTest() {
  const postUser = async () => {
    try {
      const result = await userAxios.post(
        "",
        {
          age: localStorage.getItem("age"),
          gender: localStorage.getItem("gender"),
          nickname: localStorage.getItem("nickName"),
          prefer_sport: localStorage.getItem("preferSport"),
          soccer_tier: localStorage.getItem("soccerTier"),
          basketball_tier: localStorage.getItem("basketballTier"),
          badminton_tier: localStorage.getItem("badmintonTier"),
          tableTennis_tier: localStorage.getItem("tableTennisTier"),
        },
        {
          "Content-Type": "application/json",
        }
      );
      console.log(result);
    } catch (error) {
      console.error(error);
      alert("회원가입 실패");
    }
  };
  const putUser = async () => {
    try {
      const result = await userAxios.put(
        "",
        {
          age: localStorage.getItem("age"),
          gender: localStorage.getItem("gender"),
          nickname: localStorage.getItem("nickName"),
          prefer_sport: localStorage.getItem("preferSport"),
          soccer_tier: localStorage.getItem("soccerTier"),
          basketball_tier: localStorage.getItem("basketballTier"),
          badminton_tier: localStorage.getItem("badmintonTier"),
          tableTennis_tier: localStorage.getItem("tableTennisTier"),
        },
        {
          "Content-Type": "application/json",
        }
      );
      console.log(result);
    } catch (error) {
      console.error(error);
      alert("회원가입 실패");
    }
  };

  const deleteUser = async () => {
    try {
      const res = await userAxios.delete();
      console.log(res);
      alert("회원탈퇴완료");
      localStorage.clear();
    } catch (error) {
      console.error(error);
      alert("회원탈퇴실패");
    }
  };
  const refresh = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    try {
      const result = await userAxios.post("/refresh", null, {
        headers: { refresh: refreshToken },
      });
      console.log(result);
      localStorage.setItem("accessToken", result.data.accessToken);
      localStorage.setItem("refreshToken", result.data.refreshToken);
    } catch (error) {
      console.error(error);
      console.error("refreshTokens 실패");
    }
  };

  return (
    <>
      <button onClick={getUser}>get</button>
      <button onClick={putUser}>put</button>
      <button onClick={postUser}>post</button>
      <button onClick={deleteUser}>delete</button>
      <button onClick={refresh}>refresh</button>
    </>
  );
}

export default ApiTest;
