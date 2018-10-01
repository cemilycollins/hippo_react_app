import React from "react";
import HospitalMap from "../components/NewMap";

class MapContainer extends React.Component {

	render() {
		return (
			<HospitalMap
				googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyBaLcXDzSMz-u-TmpYGp7Cv4NRrRbEo6uM&v=3.exp&libraries=geometry,drawing,places`}
				loadingElement={<div id="map" />}
				containerElement={<div id="map" />}
				mapElement={<div id="map" />}
			/>
		);
	}
}

export default MapContainer
