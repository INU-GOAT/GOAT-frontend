import axios from "axios";

import React from "react";
import { Navigate, useNavigate } from "react-router";
const Kakao = window;

function SignOut() {
  Navigate = useNavigate();

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
    //유저 토큰 가져오기
    const accessToken = "";
    await axios
      .delete("http://15.165.113.9:8080/api/users", { accessToken })
      .then((res) => {
        alert("회원탈퇴완료");
        Navigate("/Home");
      })
      .catch((error) => {
        console.error(error);
        alert("회원탈퇴실패");
      });
  };

  //토큰?세션?쿠키? 삭제하기

  const signOuthandler = () => {
    unlinkApp();
    deleteUser();
  };
  return <button onClick={signOuthandler}>SignOut</button>;
}

export default SignOut;
