import React from 'react'
import { connect } from "react-redux"
import { bindActionCreators } from 'redux'
import { push } from 'connected-react-router'

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
      arr.push(<i className="star icon" />)
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

const HospitalCard = props => {
  const hospital = props.hospital
  return (
    <div onClick={() => props.push(`/hospitals/${hospital.id}`)} className="ui hospital segment" >
    <div className='ui content'>
      <div className='ui hospital header' id='name'>{hospitalName(hospital.name)}</div>
      <p>{formatStars(hospital.rating_average)} ({hospital.total_reviews} {hospital.total_reviews === 1 ? "review" : "reviews"})</p>
      <div className='description'>
        <p><b>Address:</b> {hospital.street_address}</p>
        <p>{hospital.city}, {hospital.state} {hospital.zip_code}</p>
      </div>
    </div>
  </div>
  )
}

const mapDispatchToProps = dispatch => bindActionCreators({
  push: (url) => push(url),
}, dispatch)

export default connect(null, mapDispatchToProps)(HospitalCard)
