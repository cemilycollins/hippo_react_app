import React from 'react'
import GoogleMapReact from 'google-map-react'

class Map extends React.Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  }

  render() {
    return (
      <div id="map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBaLcXDzSMz-u-TmpYGp7Cv4NRrRbEo6uM" }}
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
      ></GoogleMapReact>
      </div>
    )
  }

}

export default Map
