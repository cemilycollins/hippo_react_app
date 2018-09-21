import React from 'react'
import { Link } from 'react-router-dom'

const HospitalCard = props => {
  const hospital = props.hospital
  const name = hospital.name.toLowerCase().split(" ").map(word => {
    let newWord = word.split("")
    newWord[0] = newWord[0].toUpperCase()
    return newWord.join("")
  }).join(" ")
  const review = hospital.reviews.length > 0 ? hospital.reviews.slice(-1)[0] : null
  return (
    <Link to={`/hospitals/${hospital.id}`} className="ui card" >
    <div className='ui content'>
      <div className='ui header' id='name'>{name}</div>
      <div className='meta'><i className="yellow star icon" /> Rating: {hospital.rating_average}/5</div>
      <div className='description'>
        <p><b>Address:</b> {hospital.street_address}</p>
        <p>{hospital.city}, {hospital.state} {hospital.zip_code}</p>
        <p><b>Most Recent Review:</b></p>
        <p>{review ? `"${review.body}" - ${review.date}` : "No reviews yet for this hospital"}</p>
      </div>
    </div>
    </Link>
  )
}

export default HospitalCard
