import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import LogOut from "../components/LogOut";
import Notification from "../components/Notification";
import "./css/Menu.css";

function Menu() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleNavigation = (path) => (event) => {
    event.preventDefault();
    navigate(path);
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const handleNotificationDelete = (id) => {
    console.log(`Notification ${id} deleted`);
  };

  return (
    <div id="wrap">
      <header>
        <nav className="header-nav">
          {isMobile && (
            <button className="menu-button" onClick={toggleMenu}>
              &#9776;
            </button>
          )}
          <ul className={`nav-items-center ${isMobile && menuOpen ? "show" : ""}`}>
            <li>
              <button className="main-items" onClick={handleNavigation("./Main")}>
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
              <button onClick={handleNavigation("./ChatHandler")}>채팅방</button>
            </li>
            <li>
              <LogOut />
            </li>
          </ul>
          <div className="notification-container">
            <button className="notification-button" onClick={toggleNotifications}>알림</button>
            <Notification onDelete={handleNotificationDelete} showNotifications={showNotifications} setShowNotifications={setShowNotifications} />
          </div>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Menu;