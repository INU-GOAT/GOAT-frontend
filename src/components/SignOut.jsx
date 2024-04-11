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
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        alert("회원탈퇴실패");
      });
  };

  const signOuthandler = async () => {
    await deleteUser();
    localStorage.clear();
  };
  return <button onClick={signOuthandler}>SignOut</button>;
}

export default SignOut;
