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

const HospitalMap = withScriptjs(withGoogleMap((props) =>{

  const state = {
    isOpen: false,
    hospital: null
  }

  function onToggleOpen(id) {
    state.isOpen = !state.isOpen
    state.hospital = props.hospitals.find(h => h.id === id)
  }
  const markers = props.hospitals.map( hospital => <Marker
                    key={hospital.id}
                    position={{lat: hospital.latitude, lng: hospital.longitude}}
                    onClick={() => onToggleOpen(hospital.id)}
                  />);

  if (props.mapCenter) {
    return (
        <GoogleMap
          defaultZoom={props.mapCenter.zoom}
          center={props.mapCenter.center}
          >
          {markers}
          {state.isOpen && <InfoWindow onCloseClick={() => onToggleOpen()}>
            <Link to={`/hospitals/${state.hospital.id}`}><h4>{state.hospital.name}</h4></Link>
            <p>{formatStars(state.hospital.rating_average)}</p>
          </InfoWindow>
        }
        </GoogleMap>
      )
  } else {
    return null
  }
  }
))

const mapStateToProps = ({hospitals, mapCenter}) => ({hospitals, mapCenter})

export default connect(mapStateToProps)(HospitalMap);
