import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import LogOut from "../components/LogOut";
import Notification from "../components/Notification";
import { connectNotificationSSE, disconnectNotificationSSE } from "../apis/notification";
import "./css/Menu.css";

function Menu() {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [sse, setSse] = useState(null);

  const handleNavigation = (path) => (event) => {
    event.preventDefault();
    navigate(path);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  useEffect(() => {
    const eventSource = connectNotificationSSE();
    setSse(eventSource);

    return () => {
      if (eventSource) {
        eventSource.close();
        disconnectNotificationSSE();
      }
    };
  }, []);

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
              <button onClick={handleNavigation("./ChatHandler")}>채팅방</button>
            </li>
            <li>
              <LogOut />
            </li>
          </ul>
          <div className="notification-container">
            <button className="notification-button" onClick={toggleNotifications}>알림</button>
            {showNotifications && <Notification />}
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