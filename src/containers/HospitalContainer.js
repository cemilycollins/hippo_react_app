import React from 'react'
import { connect } from "react-redux"

import HospitalCard from '../components/HospitalCard'
import Map from '../components/Map'

const HospitalContainer = props => {
  return (
    <div>
      <Map />
      <div className="hospitalContainer">
        {props.hospitals ? props.hospitals.map(hospital => <HospitalCard hospital={hospital}/>) : null}
      </div>
    </div>

  )
}

const mapStateToProps = ({hospitals}) => ({hospitals})

export default connect(mapStateToProps)(HospitalContainer)
