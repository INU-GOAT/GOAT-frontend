import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Main from "./pages/Main";
import Menu from "./pages/Menu";
import Chat from "./pages/Chat";
import Schedule from "./pages/Schedule";
import Club from "./pages/Club";
import ClubInfo from "./pages/ClubInfo";
import LogInHandler from "./pages/LogInHandler";
import MyPage from "./pages/MyPage";
import isLoginStore from "./utils/store";
import UserResponse from "./apis/UserResponse";
import ChatHandler from "./pages/ChatHandler";

function App() {
  const { isLogin, setIsLogin } = isLoginStore();

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
              <Route path="/ClubInfo" element={<ClubInfo />} />
            </Route>
            <Route path="/ChatHandler" element={<ChatHandler />} />
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
