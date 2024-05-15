import React, { useState } from 'react';
import Match from './Match';
import KaKaoMap from "../components/KaKaoMap";
import "./css/Main.css";

function Main() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [preferCourt, setPreferCourt] = useState('');

  const handleLocationChange = (lat, lng, courtName) => {
    setLatitude(lat);
    setLongitude(lng);
    setPreferCourt(courtName);
  };

  return (
    <div className="main">
      <div className="content">
        <KaKaoMap onLocationChange={handleLocationChange} />
      </div>
      <div className="main-container">
        <div className="m-match-container">
          <Match latitude={latitude} longitude={longitude} preferCourt={preferCourt} />
        </div>
      </div>
    </div>
  );
}

export default Main;