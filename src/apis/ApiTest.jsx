import React from "react";
import userAxios from "./userAxios";
import getUser from "./getUser";

function ApiTest() {
  const postUser = async () => {
    try {
      const result = await userAxios.post(
        "",
        {
          age: localStorage.get("age"),
          gender: localStorage.get("gender"),
          nickname: localStorage.get("nickName"),
          prefer_sport: localStorage.get("preferSport"),
          soccer_tier: localStorage.get("soccerTier"),
          basketball_tier: localStorage.get("basketballTier"),
          badminton_tier: localStorage.get("badmintonTier"),
          tableTennis_tier: localStorage.get("tableTennisTier"),
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
          age: localStorage.get("age"),
          gender: localStorage.get("gender"),
          nickname: localStorage.get("nickName"),
          prefer_sport: localStorage.get("preferSport"),
          soccer_tier: localStorage.get("soccerTier"),
          basketball_tier: localStorage.get("basketballTier"),
          badminton_tier: localStorage.get("badmintonTier"),
          tableTennis_tier: localStorage.get("tableTennisTier"),
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
  return (
    <>
      <button onClick={getUser}>get</button>
      <button onClick={putUser}>put</button>
      <button onClick={postUser}>post</button>
      <button onClick={deleteUser}>delete</button>
    </>
  );
}

export default ApiTest;
