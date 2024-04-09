import React from "react";
import { useNavigate } from "react-router";
import userAxios from "../apis/userAxios";

function SignOut() {
  const navigate = useNavigate();

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
    deleteUser();
    localStorage.clear();
    sessionStorage.clear();
  };
  return <button onClick={signOuthandler}>SignOut</button>;
}

export default SignOut;
