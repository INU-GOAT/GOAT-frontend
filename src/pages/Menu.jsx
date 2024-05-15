import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import LogOut from "../components/LogOut";
import "./css/Menu.css";

function Menu() {
  const navigate = useNavigate();

  const handleNavigation = (path) => (event) => {
    event.preventDefault();
    navigate(path);
  };

  return (
    <div id="wrap">
      <header>
        <nav className="header-nav">
          <ul className="nav-items">
            <li>
              <button
                className="main-items"
                onClick={handleNavigation("./Main")}
              >
                GOAT
              </button>
            </li>
            <li>
              <button onClick={handleNavigation("./Schedule")}>전적</button>
            </li>
            <li>
              <button onClick={handleNavigation("./Club")}>클럽</button>
            </li>
            <li>
              <button onClick={handleNavigation("./MyPage")}>마이페이지</button>
            </li>
            <li>
              <LogOut />
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Menu;
