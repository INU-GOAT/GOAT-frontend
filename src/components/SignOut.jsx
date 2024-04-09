import axios from "axios";

import React from "react";
import { useNavigate } from "react-router";
import userAxios from "../apis/userAxios";
const Kakao = window;

function SignOut() {
  const navigate = useNavigate();

  const unlinkApp = () => {
    Kakao.API.request({
      url: "/v1/user/unlink",
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
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
