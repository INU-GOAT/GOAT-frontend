import "./login.css";

function Login() {
  return (
    <div>
      <h1>로그인 페이지</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const id = event.target.id.value;
          const pw = event.target.pw.value;
          console.log(id, pw);
        }}
      >
        <p>
          <input type="text" name="id" placeholder="아이디" />
        </p>
        <p>
          <input type="password" name="pw" placeholder="비밀번호" />
        </p>
        <input type="submit" value={"로그인"} className="loginBtn"></input>
      </form>
      <a
        href="회원가입"
        onClick={(event) => {
          event.preventDefault();
        }}
      >
        회원가입
      </a>
    </div>
  );
}

export default Login;
