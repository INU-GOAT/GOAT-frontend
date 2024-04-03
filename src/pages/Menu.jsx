import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './css/Menu.css';

function Menu() {
  const navigate = useNavigate();

  return (
    <div id="wrap">
      <header>
        <nav>
          <ul className="nav-items">
            <li>
              <a
                className="main-items"
                onClick={(event) => {
                  event.preventDefault();
                  navigate("./Main");
                }}
              >
                GOAT
              </a>
            </li>
            <li>
              <a onClick={(event) => {
                event.preventDefault();
                navigate("./Schedule");
                }}>전적</a>
            </li>
            <li>
              <a onClick={(event) => {
                event.preventDefault();
                navigate("./Club");
                }}>클럽</a>
            </li>
            <li>
              <a onClick={(event) => {
                event.preventDefault();
                navigate("./MyPage");
                }}>마이페이지</a>
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
//홈 전적 클럽 마이페이지
