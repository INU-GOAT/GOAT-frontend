import { BrowserRouter, Route, Routes } from "react-router-dom";

import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Main from "./pages/Main";
import Menu from "./pages/Menu";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={Menu}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/Main" element={<Main />} />
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/SignUp" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
