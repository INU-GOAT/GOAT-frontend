import React, { useState, useEffect, useRef } from "react";
import { Map, MapMarker, MapInfoWindow } from "react-kakao-maps-sdk";
import useKakaoLoader from "./useKakaoLoader";
import "./KaKaoMap_chat.css";

export default function KaKaoMap(props) {
  useKakaoLoader();

  const [position, setPosition] = useState({
    lat: undefined,
    lng: undefined,
  });

  const [searchResult, setSearchResult] = useState(props.court);

  const mapRef = useRef(null);
  const [selectedPlace, setSelectedPlace] = useState(null);

  useEffect(() => {
    fitMapToMarkers(props.court);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fitMapToMarkers(searchResult);
    setTimeout(function () {
      mapRef.current?.relayout();
      fitMapToMarkers(searchResult);
    }, 3000);
  }, [searchResult]);

  const handleMarkerClick = (place) => {
    setSelectedPlace(place);
    setPosition({
      lat: place.latitude,
      lng: place.longitude,
    });
  };

  const fitMapToMarkers = (places) => {
    if (mapRef.current && places.length > 0) {
      const bounds = new window.kakao.maps.LatLngBounds();
      places.forEach((place) => {
        bounds.extend(
          new window.kakao.maps.LatLng(place.latitude, place.longitude)
        );
      });
      mapRef.current.setBounds(bounds);
    }
  };

  return (
    <div className="chat-map-container">
      <div className="chat-map-wrapper">
        <Map
          className="chat-map"
          id="map"
          ref={mapRef}
          center={
            position.lat
              ? position
              : {
                  lat: props.court[0].latitude,
                  lng: props.court[0].longitude,
                }
          }
          level={3}
        >
          {searchResult.map((place, index) => (
            <React.Fragment key={index}>
              <MapMarker
                position={{ lat: place.latitude, lng: place.longitude }}
                onClick={() => handleMarkerClick(place)}
              />
              {selectedPlace && selectedPlace.court === place.court && (
                <MapInfoWindow
                  position={{ lat: place.latitude, lng: place.longitude }}
                >
                  <div>{place.court}</div>
                </MapInfoWindow>
              )}
            </React.Fragment>
          ))}
        </Map>
      </div>
    </div>
  );
}
