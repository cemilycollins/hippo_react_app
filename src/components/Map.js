import React from 'react'
import GoogleMapReact from 'google-map-react'
import { connect } from 'react-redux'

class Map extends React.Component {

  render() {
    if (this.props.mapCenter && this.props.mapCenter.zoom === 12) {
      const mapProps = this.props.mapCenter
      return (
        <div id="map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBaLcXDzSMz-u-TmpYGp7Cv4NRrRbEo6uM" }}
          defaultCenter={mapProps.center}
          defaultZoom={mapProps.zoom}
        ></GoogleMapReact>
        </div>
      )
    } else if (this.props.mapCenter) {
      const mapProps = this.props.mapCenter
      return (
        <div id="map">
          <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyBaLcXDzSMz-u-TmpYGp7Cv4NRrRbEo6uM" }}
            defaultCenter={mapProps.center}
            defaultZoom={mapProps.zoom}
          ></GoogleMapReact>
        </div>
      )
    } else {
      return (
        <div id="map">
          <div className="ui active dimmer">
            <div className="ui loader"></div>
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = ({mapCenter}) => ({mapCenter})

export default connect(mapStateToProps)(Map)
