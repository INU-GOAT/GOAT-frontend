import { useState } from 'react';
import { Map, MapMarker } from "react-kakao-maps-sdk";
import useKakaoLoader from "./useKakaoLoader";
import './KaKaoMap.css';

const markers = [
  { lat: 37.5076162, lng: 126.7376084 },
  { lat: 37.5071752, lng: 126.7341899 },
  { lat: 37.5144528, lng: 126.7432879 }
];
const center = {
  lat: 37.5076162,
  lng: 126.7376084
};

export default function KaKaoMap() {
  useKakaoLoader();
  const [position, setPosition] = useState(center);

  return (
    <>
      <Map
        className="map"
        id="map"
        center={position}
        level={5}
        onClick={(_, mouseEvent) => {
          const latlng = mouseEvent.latLng;
          setPosition({
            lat: latlng.getLat(),
            lng: latlng.getLng(),
          });
        }}
      >
        {markers.map((marker, index) => (
          <MapMarker key={index} position={marker} />
        ))}
      </Map>
    </>
  );
}
