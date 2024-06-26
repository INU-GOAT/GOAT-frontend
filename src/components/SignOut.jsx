import React from "react";
import { useNavigate } from "react-router";
import userAxios from "../apis/userAxios";
import isLoginStore from "../utils/store";
import { Button } from "@mui/material";

function SignOut() {
  const navigate = useNavigate();
  const { setIsLogin } = isLoginStore();
  const deleteUser = async () => {
    try {
      const res = await userAxios.delete();
      console.log(res);
      alert("회원탈퇴완료");
      localStorage.clear();
      setIsLogin(false);
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("회원탈퇴실패");
    }
  };

  const signOuthandler = () => {
    deleteUser();
  };
  return (
    <Button color="error" variant="contained" onClick={signOuthandler}>
      회원탈퇴
    </Button>
  );
}

export default SignOut;
