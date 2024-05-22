import React, { useState, useEffect, useRef } from 'react';
import { Map, MapMarker, MapInfoWindow } from "react-kakao-maps-sdk";
import useKakaoLoader from "./useKakaoLoader";
import './KaKaoMap_chat.css';

const initialSearchResult = [
  { place_name: "송도 체육관 1", y: 37.382702, x: 126.635643 },
  { place_name: "송도 체육관 2", y: 37.382150, x: 126.634430 },
  { place_name: "송도 체육관 3", y: 37.381634, x: 126.636223 },
  { place_name: "송도 체육관 4", y: 37.380830, x: 126.633209 },
];

export default function KaKaoMap({ onLocationChange }) {
  useKakaoLoader();
  const [position, setPosition] = useState({
    lat: undefined,
    lng: undefined,
  });
  
  const [searchResult, setSearchResult] = useState(initialSearchResult);
  const mapRef = useRef(null);
  const [selectedPlace, setSelectedPlace] = useState(null);

  useEffect(() => {
    fitMapToMarkers(initialSearchResult);
  }, []);

  useEffect(() => {
    fitMapToMarkers(searchResult);
  }, [searchResult]);

  const handleMarkerClick = (place) => {
    setSelectedPlace(place);
    setPosition({
      lat: place.y,
      lng: place.x,
    });
  };

  const fitMapToMarkers = (places) => {
    if (mapRef.current && places.length > 0) {
      const bounds = new window.kakao.maps.LatLngBounds();
      places.forEach(place => {
        bounds.extend(new window.kakao.maps.LatLng(place.y, place.x));
      });
      mapRef.current.setBounds(bounds);
    }
  };

  return (
    <div className="map-container">
      <div className="map-wrapper">
        <Map
          className="map"
          id="map"
          ref={mapRef}
          center={position.lat ? position : { lat: 37.381634, lng: 126.635643 }}
          level={3}
        >
          {searchResult.map((place, index) => (
            <React.Fragment key={index}>
              <MapMarker
                position={{ lat: place.y, lng: place.x }}
                onClick={() => handleMarkerClick(place)}
              />
              {selectedPlace && selectedPlace.place_name === place.place_name && (
                <MapInfoWindow position={{ lat: place.y, lng: place.x }}>
                  <div>{place.place_name}</div>
                </MapInfoWindow>
              )}
            </React.Fragment>
          ))}
        </Map>
      </div>
    </div>
  );
}
