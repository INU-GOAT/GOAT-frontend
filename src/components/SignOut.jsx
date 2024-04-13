import React from "react";
import { useNavigate } from "react-router";
import userAxios from "../apis/userAxios";
import { isLoginStore } from "../utils/store";

function SignOut() {
  const navigate = useNavigate();
  const { setIsLogin } = isLoginStore();
  const deleteUser = async () => {
    await userAxios
      .delete()
      .then((res) => {
        alert("회원탈퇴완료");
        localStorage.clear();
        setIsLogin(false);
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        alert("회원탈퇴실패");
      });
  };

  const signOuthandler = async () => {
    await deleteUser();
  };
  return <button onClick={signOuthandler}>SignOut</button>;
}

export default SignOut;
