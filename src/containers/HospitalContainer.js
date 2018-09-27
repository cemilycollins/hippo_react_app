import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from "react-redux"

import HospitalCard from '../components/HospitalCard'
import Map from '../components/Map'
import MapPlacesSearch from '../components/MapPlacesSearch'

const HospitalContainer = props => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={MapPlacesSearch} />
        <Route exact path="/hospitals" render={() => (
          <div>
            <Map />
            <div className="hospitalContainer">
              {props.hospitals ? props.hospitals.map(hospital => <HospitalCard hospital={hospital}/>) : null}
            </div>
          </div>
        )} />
      </Switch>
    </div>
  )
}

const mapStateToProps = ({hospitals}) => ({hospitals})

export default connect(mapStateToProps)(HospitalContainer)
