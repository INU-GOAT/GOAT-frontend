import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Main from "./pages/Main";
import Menu from "./pages/Menu";
import Chat from "./pages/Chat";
import LogInHandler from "./pages/LogInHandler";
import MyPage from "./pages/MyPage";
import { useEffect } from "react";
import getUser from "./apis/getUser";
import setUser from "./utils/setUser";

function App() {
  useEffect(() => {
    console.log("앱 effect");
    if (localStorage.getItem("isLogin") === "true") {
      getUser().then((res) => {
        console.log(res);
        setUser(res);
      });
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {localStorage.getItem("isLogin") === "true" ? (
          <>
            <Route element={<Menu />}>
              <Route path="/Main" element={<Main />} />
              <Route path="/Chat" element={<Chat />} />
            </Route>
            <Route path="/MyPage" element={<MyPage />} />
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
