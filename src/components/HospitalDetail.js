import React from 'react'

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
      arr.push(<i className="star outline icon" />)
    }
  }
  return arr
}

const HospitalDetail = props => {
  let hospital = props.hospital
  return (
    <div className="ui teal segment">
      <h3>Average Rating: {formatStars(hospital.rating_average)} ({hospital.reviews.length} reviews)</h3>
      <h3>Address:</h3>
      <p>{hospital.street_address}, {hospital.city}, {hospital.state} {hospital.zip_code}</p>
    </div>
  )
}

export default HospitalDetail
