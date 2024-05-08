import { create } from "zustand";

export const isLoginStore = create((set) => ({
  isLogin: localStorage.getItem("isLogin") === "true" ? true : false,
  setIsLogin: (newValue) => set({ isLogin: newValue }),
}));

//사용한 곳 app, 로그인, 로그아웃, 회원가입, 회원탈퇴

export default isLoginStore;
