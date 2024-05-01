import React from 'react';

const MapMarker = ({ position }) => {
    const { kakao } = window;

    return (
        <kakao.maps.Marker position={position} />
    );
}

export default MapMarker;