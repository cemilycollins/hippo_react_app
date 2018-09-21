import React from 'react'
import HospitalCard from '../components/HospitalCard'
import { connect } from "react-redux"

const HospitalContainer = props => {
  return (
    <div className="ui cards">
      {props.hospitals ? props.hospitals.map(hospital => <HospitalCard hospital={hospital}/>) : null}
    </div>
  )
}

const mapStateToProps = ({hospitals}) => ({hospitals})

export default connect(mapStateToProps)(HospitalContainer)
