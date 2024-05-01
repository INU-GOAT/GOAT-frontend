import { Map } from "react-kakao-maps-sdk"
import useKakaoLoader from "../components/useKakaoLoader.jsx"

export default function KakaoMap() {
  useKakaoLoader()

  return (
    <Map // 지도를 표시할 Container
      id="map"
      center={{
        // 지도의 중심좌표
        lat: 37.37555724804313,
        lng: 126.63280779604705,
      }}
	  style={{
        // 지도의 크기
        width: "50%",
        height: "450px",
      }}
      level={3} // 지도의 확대 레벨
	  
    />
  )
}