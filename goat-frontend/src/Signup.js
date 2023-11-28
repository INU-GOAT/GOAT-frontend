import React from 'react';
import './Signup.css'


function Signup() {
  return (
    <div>
      <h1>회원가입</h1>
      <table>
        <tr>
          <td><label for="userid">아이디</label></td> 
          <td><input type="text" id="id"></input></td>
        </tr>
        <tr>
          <td><label for="password">비밀번호</label></td> 
          <td><input type="password" id="pw" name="pw"></input></td>
        </tr>
        <tr>
          <td><label for="passwordcheck">비밀번호 확인</label></td> 
          <td><input type="password" id="pw_check" name="pwcheck"></input></td>
        </tr>
        <tr>
          <td><label for="name">이름</label></td> 
          <td><input type="text" id="name" name="name"></input></td>
        </tr>
        <tr>
          <td><label for="gender">성별</label></td> 
          <input type="radio" id="gender" name="gender" value="male"></input><label for="male">남성</label>
          <input type="radio" id="gender" name="gender" value="femal"></input><label for="female">여성</label>
        </tr>
        <tr>
          <td><label for="number">전화번호</label></td>
          <td><input type="text" id="number" name="number"></input></td>
        </tr>
      </table>
      <input type="submit" value={"가입하기"} className="signup_event" ></input>
    </div>
  );
}

/*
function Signup() {
  return (
    <div>
      <h1>Welcome back!</h1>
    </div>
  );
}
*/
export default Signup;