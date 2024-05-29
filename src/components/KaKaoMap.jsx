import React, { useState, useEffect, useRef } from 'react';
import { Map, MapMarker, MapInfoWindow } from "react-kakao-maps-sdk";
import useKakaoLoader from "./useKakaoLoader";
import './KaKaoMap.css';
import { List, ListItem, ListItemText } from '@mui/material';

const center = {
  lat: 37.375557,
  lng: 126.63280,
};

export default function KaKaoMap({ onLocationChange }) {
  useKakaoLoader();
  const [position, setPosition] = useState({
    lat: undefined,
    lng: undefined,
  });
  const [preferCourt, setPreferCourt] = useState({preferCourt:""});
  
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const mapRef = useRef(null);
  const [selectedPlace, setSelectedPlace] = useState(null);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        if (searchKeyword.trim() === '') {
          event.preventDefault();
          return;
        }
        
        const ps = new window.kakao.maps.services.Places();
        ps.keywordSearch(searchKeyword, (data, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            setSearchResult(data);
            fitMapToMarkers();
          } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
            setSearchResult([]);
          }
        });
      }
    };
  
    document.addEventListener('keypress', handleKeyPress);
  
    return () => {
      document.removeEventListener('keypress', handleKeyPress);
    };
  },     // eslint-disable-next-line react-hooks/exhaustive-deps
  [searchKeyword]);

  useEffect(() => {
    fitMapToMarkers();
  },     // eslint-disable-next-line react-hooks/exhaustive-deps
  [searchResult]);

  const handleMarkerClick = (place) => {
    setSelectedPlace(place);
    setPosition({
      lat: place.y,
      lng: place.x,
    });
    setPreferCourt({
      preferCourt: place.place_name
    });
    onLocationChange(place.y, place.x, place.place_name);
  };

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

  const fitMapToMarkers = () => {
    if (mapRef.current && searchResult.length > 0) {
      const bounds = new window.kakao.maps.LatLngBounds();
      searchResult.forEach(place => {
        bounds.extend(new window.kakao.maps.LatLng(place.y, place.x));
      });
      mapRef.current.setBounds(bounds);
    }
  };

  const handleListItemClick = (place) => {
    setSelectedPlace(place);
    setPosition({
      lat: place.y,
      lng: place.x,
    });
    setPreferCourt({
      preferCourt: place.place_name
    });
    onLocationChange(place.y, place.x, place.place_name);
  };

  return (
    <div className="map-container">
      <div className="map-wrapper">
        <Map
          className="map"
          id="map"
          ref={mapRef}
          center={position.lat ? position : center}
          level={3}
          onClick={(_, mouseEvent) => {
            const latlng = mouseEvent.latLng;
            setPosition({
              lat: latlng.getLat(),
              lng: latlng.getLng(),
            });
            if (selectedPlace) {
              setPreferCourt({
                preferCourt: selectedPlace.place_name
              });
            }
          }}
        >
          {searchResult.map((place, index) => (
            <MapMarker
              key={index}
              position={{ lat: place.y, lng: place.x }}
              onClick={() => handleMarkerClick(place)}
            />
          ))}
          {selectedPlace && (
            <MapInfoWindow
              position={{ lat: selectedPlace.y, lng: selectedPlace.x }}
              content={selectedPlace.place_name}
              removable={true}>
                <div>{selectedPlace.place_name}</div>
              </MapInfoWindow>
          )}
        </Map>
        <button 
          className="current_place"
          onClick={getCurrentPosition}>
          현재 위치
        </button>
        <div className="keyword">
          <input 
            type="text" 
            value={searchKeyword} 
            onChange={(e) => setSearchKeyword(e.target.value)} 
            placeholder="장소를 검색하세요" 
          />
        </div>
        <div className="search_results">
          <h2>검색 결과</h2>
          <List className="search_list">
            {searchResult.map((place, index) => (
            <ListItem key={index} button onClick={() => handleListItemClick(place)}>
              <ListItemText primary={place.place_name} />
            </ListItem>
            ))}
          </List>
        </div>
      </div>
    </div>
  );
}
