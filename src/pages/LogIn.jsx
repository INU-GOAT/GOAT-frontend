import { useNavigate } from "react-router-dom";
import { useState } from "react";

import "./css/LogIn.css";

function LogIn() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const navigate = useNavigate();
  return (
    <div className="box">
      <h1>로그인 페이지</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();

          console.log(id, pw);
          navigate("/Main");
        }}
      >
        <input
          onChange={(event) => {
            setId(event.target.value);
          }}
          required
          type="text"
          placeholder="아이디"
          value={id}
        />

        <input
          onChange={(event) => {
            setPw(event.target.value);
          }}
          required
          type="password"
          placeholder="비밀번호"
          value={pw}
        />

        <button>로그인</button>
      </form>
      <button className="signUp" onClick={() => navigate("/SignUp")}>
        회원가입
      </button>
    </div>
  );
}

export default LogIn;
