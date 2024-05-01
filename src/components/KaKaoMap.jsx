import { Map } from "react-kakao-maps-sdk"
import useKakaoLoader from "../components/useKakaoLoader.jsx"

<<<<<<< HEAD
function KakaoMap (){
	const { kakao } = window;
	const [address, setAddress] = useState(null); 
=======
<<<<<< baek
function KakaoMap() {
    const { kakao } = window;
    const [clickedLatLng, setClickedLatLng] = useState(null);
>>>>>>> 6f80fb17311bf4fb7bd9070439402e5d4baa7185

	const getAddress = (lat, lng) => {
		const geocoder = new kakao.maps.services.Geocoder(); 
		const coord = new kakao.maps.LatLng(37.5566803113882, 126.904501286522); 
		const callback = function (result, status) {
			if (status === kakao.maps.services.Status.OK) {
				setAddress(result[0].address);
			}
		};
		geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
	};

	return (
		<>
			<Map center={{ lat: 37.5566803113882, lng: 126.904501286522 }} style={{ width: '800px', height: '600px' }} level={3}>
				<MapMarker position={{ lat: 37.5566803113882, lng: 126.904501286522 }} />
			</Map>
		</>
	);
};

export default KakaoMap;
=======
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
>>>>>> main
