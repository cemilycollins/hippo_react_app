import React from 'react'
import {Map, Marker, GoogleApiWrapper, InfoWindow} from 'google-maps-react'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'

export class MapContainer extends React.Component {

  constructor() {
    super()
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      center: null,
      zoom: null
    }
  }

  _isMounted = false

  componentDidMount() {
    this._isMounted = true
    if (this._isMounted) {
      this.setState({
        center: this.props.mapCenter.center,
        zoom: this.props.mapCenter.zoom
      })
    }
  }

  componentDidUnmount() {
    this._isMounted = false
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  hospitalName = (name) => {
    return name.toLowerCase().split(" ").map(word => {
      let newWord = word.split("")
      newWord[0] = newWord[0].toUpperCase()
      return newWord.join("")
    }).join(" ")
  }

  formatStars = (rating) => {
    let arr = []
    for (let i = 0; i < rating; i++) {
      if ((rating-i) < 0.6 && (rating-i) > 0) {
        arr.push(<i className="yellow star half icon" />)
      } else {
        arr.push(<i className="yellow star icon" />)
      }
    }
    if (arr.length < 5) {
      for (let i = arr.length; i < 5 ; i++) {
        arr.push(<i className="grey star icon" />)
      }
    }
    return arr
  }


  render() {
    console.log(this.props)
    if (this.props.mapCenter && this.props.hospitals.length > 0) {
      const mapProps = this.props.mapCenter
      return (
        <div id="map">
          <Map
            google={this.props.google}
            onClick={this.onMapClicked}
            zoom={this.state.zoom}
            initialCenter={this.state.center}
            >

            {this.props.hospitals.map(h => <Marker
              onClick={this.onMarkerClick}
              name={h.name}
              url={`/hospitals/${h.id}`}
              value={this.formatStars(h.rating_average)}
              position={{lat: h.latitude, lng: h.longitude}}
            />)}

            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}>
                <div>
                  <h4 onClick={() => this.props.push(this.state.selectedPlace.url)}>{this.state.selectedPlace.name}</h4>
                  {this.state.selectedPlace.value}
                </div>
            </InfoWindow>

          </Map>
        </div>
      )
    } else if (this.props.mapCenter && this.props.hospitals.length === 0) {
      const map = this.props.mapCenter
      return (
        <div id="map">
          <Map
            google={this.props.google}
            zoom={map.zoom}
            initialCenter={map.center}
            >
          </Map>
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

const mapStateToProps = ({mapCenter, hospitals}) => ({mapCenter, hospitals})

export default connect(mapStateToProps, {push})(GoogleApiWrapper((props) =>({
  apiKey: "AIzaSyBaLcXDzSMz-u-TmpYGp7Cv4NRrRbEo6uM"
}))(MapContainer))
