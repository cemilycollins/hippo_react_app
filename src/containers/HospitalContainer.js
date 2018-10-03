import React from 'react'
import { connect } from "react-redux"
import { Link } from 'react-router-dom'

import HospitalCard from '../components/HospitalCard'
import MapContainer from '../containers/NewMapContainer'
import MapPlacesSearch from '../components/MapPlacesSearch'

function formatStars(rating) {
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

function hospitalName(name) {
  return name.toLowerCase().split(" ").map(word => {
    if (word.length > 0 && word !== "&") {
      let newWord = word.split("")
      newWord[0] = newWord[0].toUpperCase()
      return newWord.join("")
    } else {
      return word
    }
  }).join(" ")
}

const HospitalContainer = props => {
  if (props.hospitals) {
    return (
      <div>
        <MapPlacesSearch home={false} />
        <MapContainer showPage={false} />
        <div className="ui grid" id="hospitalContainer2">
          <div className="four wide column">
            {props.hospitals && props.hospitals.length > 0 ? <div className="ui vertical menu">
                {props.hospitals.slice(0,20).map(hospital => <div className="item">
                  <Link to={`/hospitals/${hospital.id}`}>{hospitalName(hospital.name)}</Link>
                  <div>({hospitalName(hospital.city)}, {hospital.state})</div>
                  <p>{formatStars(hospital.rating_average)}</p>
                </div>) }
            </div> : null}
          </div>
          <div className="twelve wide column">
            <div id="hospitalContainer">
              {props.hospitals ? props.hospitals.slice(0,9).map(hospital => <HospitalCard hospital={hospital}/>) : null}
            </div>
          </div>
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
