import React from 'react'
import GoogleMapReact from 'google-map-react'

class Map extends React.Component {
  static defaultProps = {
    center: {
      lat: 39.8283,
      lng: -98.5795
    },
    zoom: 4
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
