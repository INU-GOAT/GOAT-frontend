import React, { useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

function KakaoMap (){
	const { kakao } = window;
	const [address, setAddress] = useState(null); 

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