import { BrowserRouter, Route, Routes } from "react-router-dom";

import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Main from "./pages/Main";
import Menu from "./pages/Menu";
import Chat from "./pages/Chat";
import LogInHandler from "./pages/LogInHandler";
import MyPage from "./pages/MyPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login/oauth2/code/kakao" element={<LogInHandler />} />
        <Route element={<Menu />}>
          <Route path="/Main" element={<Main />} />
          <Route path="/Chat" element={<Chat />} />
        </Route>
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/MyPage" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
