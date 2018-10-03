import React from "react"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const formatStars = (rating) => {
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

class MapMarker extends React.Component {

  state = {
    isOpen: false
  }

  onToggleOpen = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    const hospital = this.props.hospital
    return (
      <Marker
        key={hospital.id}
        position={{lat: hospital.latitude, lng: hospital.longitude}}
        onClick={this.onToggleOpen}
      >
        {this.state.isOpen && <InfoWindow onCloseClick={this.onToggleOpen}>
          <div>
            <Link to={`/hospitals/${hospital.id}`}><h4>{hospital.name}</h4></Link>
            <p>{formatStars(hospital.rating_average)}</p>
          </div>
        </InfoWindow>}
      </Marker>
    )
  }
}

const HospitalMap = withScriptjs(withGoogleMap((props) =>{

  const markers = props.hospitals.map( hospital => <MapMarker hospital={hospital} />
                );

  if (props.mapCenter && props.passProps === false) {
    return (
        <GoogleMap
          zoom={props.mapCenter.zoom}
          center={props.mapCenter.center}
          >
          {markers}
        </GoogleMap>
      )
  } else if (props.passProps) {
    return (

        <GoogleMap
          zoom={12}
          center={props.passProps}
          >
          <MapMarker hospital={props.hospital} />
        </GoogleMap>
      )
  } else {
    return null
  }
}))

const mapStateToProps = ({hospitals, mapCenter}) => ({hospitals, mapCenter})

export default connect(mapStateToProps)(HospitalMap);
