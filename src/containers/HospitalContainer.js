import React from 'react'
import { connect } from "react-redux"

import HospitalCard from '../components/HospitalCard'
import ConnectedMapContainer from '../components/Map'
import MapPlacesSearch from '../components/MapPlacesSearch'

const HospitalContainer = props => {
  if (props.hospitals) {
    return (
      <div>
        <MapPlacesSearch home={false} />
        <ConnectedMapContainer mapCenter={props.mapCenter} hospitals={props.hospitals}/>
        <div className="hospitalContainer">
          {props.hospitals ? props.hospitals.map(hospital => <HospitalCard hospital={hospital}/>) : null}
        </div>
      </div>
    )
  } else {
    return (
      <div className="loader">
        <div className="ui active dimmer">
          <div className="ui loader"></div>
        </div>
      </div>
    )
  }

}

const mapStateToProps = ({mapCenter, hospitals}) => ({mapCenter, hospitals})

export default connect(mapStateToProps)(HospitalContainer)
