import React from 'react'
import HospitalCard from '../components/HospitalCard'
import { connect } from "react-redux"

const HospitalContainer = props => {
  return (
    <div>
    <p>Hospital Container</p>
    <ul>
      {props.hospitals ? props.hospitals.map(hospital => <HospitalCard hospital={hospital}/>) : null}
    </ul>
    </div>
  )
}

const mapStateToProps = ({hospitals}) => ({hospitals})

export default connect(mapStateToProps)(HospitalContainer)
