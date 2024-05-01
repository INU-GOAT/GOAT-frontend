import { useState } from 'react';
import { Map, MapMarker } from "react-kakao-maps-sdk";
import useKakaoLoader from "./useKakaoLoader";

const center = {
  lat: 37.375557,
  lng: 126.63280,
};

export default function KaKaoMap() {
  useKakaoLoader();
  const [position, setPosition] = useState({
    lat: undefined,
    lng: undefined,
  });

  const getCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      () => alert("위치 정보를 가져오는데 실패했습니다."),
      {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000,
      }
    );
  };

  return (
    <>
      <Map
        id="map"
        center={position.lat ? position : center}
        style={{
          width: "60%",
          height: "450px",
        }}
        level={3}
        onClick={(_, mouseEvent) => {
          const latlng = mouseEvent.latLng;
          setPosition({
            lat: latlng.getLat(),
            lng: latlng.getLng(),
          });
        }}
      >
        <MapMarker position={position.lat ? position : center} />
      </Map>
      <div id="clickLatlng">
        {position.lat &&
          `클릭한 위치의 위도는 ${position.lat} 이고, 경도는 ${position.lng} 입니다`}
      </div>
      <button onClick={getCurrentPosition}>현재 위치</button>
    </>
  );
}
