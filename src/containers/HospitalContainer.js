import React from 'react'
import HospitalCard from '../components/HospitalCard'
import Map from '../components/Map'
import MapPlacesSearch from '../components/MapPlacesSearch'
import { connect } from "react-redux"

const HospitalContainer = props => {
  return (
    <div>
      <MapPlacesSearch />
      <Map />
      <div className="hospitalContainer">
        {props.hospitals ? props.hospitals.map(hospital => <HospitalCard hospital={hospital}/>) : null}
      </div>
    </div>
  )
}

const mapStateToProps = ({hospitals}) => ({hospitals})

export default connect(mapStateToProps)(HospitalContainer)
