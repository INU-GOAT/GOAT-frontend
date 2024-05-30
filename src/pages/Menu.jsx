import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import LogOut from "../components/LogOut";
import Notification from "../components/Notification";

function Menu() {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [userInfo, setUserInfo] = useState(null); // 유저 정보 상태 추가
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    // 유저 정보 가져오는 함수
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get("http://15.165.113.9:8080/api/users", {
          headers: { auth: token },
        });
        setUserInfo(response.data.data);
      } catch (error) {
        console.error("Error fetching user info", error);
      }
    };

    fetchUserInfo();
  }, [token]);

  const handleNavigation = (path) => (event) => {
    event.preventDefault();
    navigate(path);
  };

  // 클럽 버튼 클릭 시 호출되는 함수
  const handleClubNavigation = (event) => {
    event.preventDefault();
    if (userInfo && userInfo.clubId) {
      navigate("/ClubInfo", { state: { clubId: userInfo.clubId } });
    } else {
      navigate("/Club");
    }
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
          <ul className="nav-items">
            <li>
              <button
                className="main-items"
                onClick={handleNavigation("/Main")}
              >
                GOAT
              </button>
            </li>
            <li>
              <button onClick={handleNavigation("/Schedule")}>전적</button>
            </li>
            <li>
              <button onClick={handleClubNavigation}>클럽</button>
            </li>
            <li>
              <button onClick={handleNavigation("/MyPage")}>마이페이지</button>
            </li>
            <li>
              <button onClick={handleNavigation("./ChatHandler")}>
                채팅방
              </button>
            </li>
            <li>
              <LogOut />
            </li>
          </ul>
          <div className="notification-container">
            <button
              className="notification-button"
              onClick={toggleNotifications}
            >
              알림
            </button>
            {showNotifications && (
              <Notification onDelete={handleNotificationDelete} />
            )}
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
