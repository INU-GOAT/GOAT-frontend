import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Main from "./pages/Main";
import Menu from "./pages/Menu";
import Chat from "./pages/Chat";
import Schedule from "./pages/Schedule";
import Club from "./pages/Club";
import LogInHandler from "./pages/LogInHandler";
import MyPage from "./pages/MyPage";
import isLoginStore from "./utils/store";
import { useEffect } from "react";
import UserResponse from "./apis/UserResponse";

function App() {
  const { isLogin, setIsLogin } = isLoginStore();
  useEffect(() => {
    if (localStorage.getItem("isLogin") === "true") {
      setIsLogin(true);
    }
  }, [setIsLogin]);
  return (
    <BrowserRouter>
      <UserResponse />
      <Routes>
        {isLogin === true ? (
          <>
            <Route element={<Menu />}>
              <Route path="/Main" element={<Main />} />
              <Route path="/Chat" element={<Chat />} />
              <Route path="/MyPage" element={<MyPage />} />
              <Route path="/Schedule" element={<Schedule />} />
              <Route path="/Club" element={<Club />} />
            </Route>
            <Route path="*" element={<Navigate to="/Main" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/login/oauth2/code/kakao" element={<LogInHandler />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;