import React, { useState } from 'react';
import Match from './Match';
import KaKaoMap from "../components/KaKaoMap";
import "./css/Main.css";

function Main() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const handleLocationChange = (lat, lng) => {
    setLatitude(lat);
    setLongitude(lng);
  };

  return (
    <div className="main">
      <div className="content">
        <KaKaoMap onLocationChange={handleLocationChange} />
      </div>
      <div className="main-container">
        <div className="m-match-container">
          <Match latitude={latitude} longitude={longitude} />
        </div>
      </div>
    </div>
  );
}

export default Main;