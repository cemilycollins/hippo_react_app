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

const HospitalCard = props => {
  const hospital = props.hospital
  const name = hospital.name.toLowerCase().split(" ").map(word => {
    let newWord = word.split("")
    newWord[0] = newWord[0].toUpperCase()
    return newWord.join("")
  }).join(" ")
  const review = hospital.reviews.length > 0 ? hospital.reviews.slice(-1)[0] : null
  return (
    <div onClick={() => props.push(`/hospitals/${hospital.id}`)} className="ui hospital segment" >
    <div className='ui content'>
      <div className='ui black header' id='name'>{name}</div>
      <div className='meta'>{formatStars(hospital.rating_average)}</div>
      <div className='description'>
        <p><b>Address:</b> {hospital.street_address}</p>
        <p>{hospital.city}, {hospital.state} {hospital.zip_code}</p>
        <p><b>Most Recent Review:</b></p>
        <p>{review ? `"${review.body}" - ${review.date}` : "No reviews yet for this hospital"}</p>
      </div>
    </div>
  </div>
  )
}

const mapDispatchToProps = dispatch => bindActionCreators({
  push: (url) => push(url),
}, dispatch)

export default connect(null, mapDispatchToProps)(HospitalCard)
