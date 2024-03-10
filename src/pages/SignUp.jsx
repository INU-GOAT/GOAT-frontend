import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./css/SignUp.css";

function SignUp() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [pwCheck, setPwCheck] = useState("");
  const [name, setName] = useState("");
  const [nickName, setNickName] = useState("");
  const [age, setAge] = useState("");
  //const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  return (
    <div className="box">
      <h1>회원가입</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();

          console.log(id, pw);
          navigate("/LogIn");
        }}
      >
        <p />
        <label>아이디</label>
        <input
          onChange={(event) => {
            setId(event.target.value);
          }}
          required
          type="text"
          value={id}
        ></input>
        <p />
        <label>비밀번호</label>
        <input
          onChange={(event) => {
            setPw(event.target.value);
          }}
          required
          type="password"
          value={pw}
        ></input>
        <p />
        <label>비밀번호 확인</label>
        <input
          onChange={(event) => {
            setPwCheck(event.target.value);
          }}
          required
          type="password"
          value={pwCheck}
        ></input>
        <p />
        <label>이름</label>
        <input
          onChange={(event) => {
            setName(event.target.value);
          }}
          required
          type="text"
          value={name}
        ></input>
        <p />
        <label>닉네임</label>
        <input
          onChange={(event) => {
            setNickName(event.target.value);
          }}
          required
          type="text"
          value={nickName}
        ></input>
        <p />
        <label>나이</label>
        <input
          onChange={(event) => {
            setAge(event.target.value);
          }}
          required
          type="text"
          value={age}
        ></input>
        <p /> <label for="gender">성별</label>
        <input type="radio" id="gender" name="gender" value="male"></input>
        <label for="male">남성</label>
        <input type="radio" id="gender" name="gender" value="femal"></input>
        <label for="female">여성</label>
        <p />
        <label>전화번호</label>
        <input
          onChange={(event) => {
            setPhone(event.target.value);
          }}
          required
          type="text"
          value={phone}
        ></input>
        <button>가입하기</button>
      </form>
    </div>
  );
}

export default SignUp;

//수정 해야 할 부분 : 유효성 검사, 성멸선택, 나이
