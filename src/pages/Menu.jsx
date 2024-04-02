import { Outlet, useNavigate } from "react-router-dom";
import "./css/Menu.css";

function Menu() {
  const navigate = useNavigate();
  return (
    <div id="wrap">
      <header>
        <nav>
          <ul class="nav-items">
            <li>
              <a
                class="main-items"
                onClick={(event) => {
                  event.preventDefault();
                  navigate("/Main");
                }}
              >
                GOAT
              </a>
            </li>
            <li>
              <a onClick={(event) => {
                event.preventDefault();
                navigate("/Schedule");
                }}>일정관리</a>
            </li>
            <li>
              <a onClick={(event) => {
                event.preventDefault();
                navigate("/Club");
                }}>클럽</a>
            </li>
            <li>
              <a onClick={(event) => event.preventDefault()}>고객센터</a>
            </li>
            <li>
              <a onClick={(event) => event.preventDefault()}>마이페이지</a>
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
//홈 일정관리 고객센터 클럽 마이페이지
