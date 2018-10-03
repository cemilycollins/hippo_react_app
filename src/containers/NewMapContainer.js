import React from "react";
import HospitalMap from "../components/NewMap";

class MapContainer extends React.Component {

	render() {
		let passProps = null
		let id = "map"
		let hospital = null
		if (this.props.showPage) {
			passProps = this.props.latlng
			id = "map2"
			hospital = this.props.hospital
		} 
		return (
			<HospitalMap
				passProps={passProps}
				hospital={hospital}
				googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyBaLcXDzSMz-u-TmpYGp7Cv4NRrRbEo6uM&v=3.exp&libraries=geometry,drawing,places`}
				loadingElement={<div id={id} />}
				containerElement={<div id={id} />}
				mapElement={<div id={id} />}
			/>
		);
	}
}

export default MapContainer
