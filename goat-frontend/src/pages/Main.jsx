import mapImage from "./map.png";
import "./css/Main.css";
import Gender from "./button/Gender";
import Sport from "./button/Sport";
import Time from "./button/Time";
import Matching from "./button/Matching";

function Main() {
  return (
    <div>
      <h1>GOAT</h1>
      <img src={mapImage} width={200} />
      <Sport />
      <Gender />

      <Time />
      <button className="match">매칭 시작</button>
      <Matching />
    </div>
  );
}

export default Main;

//메뉴바, 조건설정, 추가예정, 매칭시작 버튼
//스포츠 종목, 희망 경기 위치, 희망 시간, 희망 성별
//축구 배드민턴(단식,복식) 농구 풋살
