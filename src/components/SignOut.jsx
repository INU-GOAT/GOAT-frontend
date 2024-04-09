import axios from "axios";

import React from "react";
import { useNavigate } from "react-router";
import userAxios from "../apis/userAxios";
const Kakao = window;

function SignOut() {
  const navigate = useNavigate();

  const unlinkApp = () => {
    axios.post(
      "https://kapi.kakao.com/v1/user/unlink",
      {
        target_id_type: "user_id",
        target_id: sessionStorage.getItem("id"),
      },
      {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "KakaoAK b14a35797a307e94557e9076d3068a57",
      }
    );
  };

  const deleteUser = async () => {
    await userAxios
      .delete()
      .then((res) => {
        alert("회원탈퇴완료");
        navigate("/Home");
      })
      .catch((error) => {
        console.error(error);
        alert("회원탈퇴실패");
      });
  };

  const signOuthandler = () => {
    unlinkApp();
    deleteUser();
    localStorage.clear();
    sessionStorage.clear();
  };
  return <button onClick={signOuthandler}>SignOut</button>;
}

export default SignOut;
