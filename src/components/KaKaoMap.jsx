import { Map } from "react-kakao-maps-sdk"
import useKakaoLoader from "../components/useKakaoLoader.jsx"


function KakaoMap() {
    const { kakao } = window;
    const [clickedLatLng, setClickedLatLng] = useState(null);

    const handleClick = (mouseEvent) => {
        // 클릭한 위치의 위도와 경도 정보를 가져옵니다
        const latlng = mouseEvent.latLng;

        // 클릭한 위치에 마커를 표시하기 위해 상태 업데이트
        setClickedLatLng({
            lat: latlng.getLat(),
            lng: latlng.getLng()
        });
    };

    return (
        <>
            <Map 
                center={{ lat: 37.5566803113882, lng: 126.904501286522 }} 
                style={{ width: '800px', height: '600px' }} 
                level={3} 
                onClick={handleClick} // 지도 클릭 이벤트 핸들러 등록
            >
                {/* 클릭한 위치에 마커 표시 */}
                {clickedLatLng && <MapMarker position={clickedLatLng} />}
            </Map>
            {/* 클릭한 위치의 위도와 경도 표시 */}
            <div id="clickLatlng">
                {clickedLatLng && (
                    <p>
                        클릭한 위치의 위도는 {clickedLatLng.lat}이고, 경도는 {clickedLatLng.lng}입니다.
                    </p>
                )}
            </div>
        </>
    );
}

export default KakaoMap;

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

