import { Outlet, useNavigate } from "react-router-dom";

function Menu() {
  const navigate = useNavigate();
  return (
    <div>
      <header>
        <button onClick={() => navigate("/Main")}>GOAT</button>
        <button>일정관리</button>
        <button>고객센터</button>
        <button>클럽</button>
        <button>마이페이지</button>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Menu;
//홈 일정관리 고객센터 클럽 마이페이지
