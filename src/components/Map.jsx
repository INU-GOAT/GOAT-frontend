import React from 'react';

const Map = ({ center, style, level, children, onClick }) => {
    const { kakao } = window;

    return (
        <kakao.maps.Map center={center} style={style} level={level} onClick={onClick}>
            {children}
        </kakao.maps.Map>
    );
}

export default Map;