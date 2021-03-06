import React from 'react'
import MapContainer from '../containers/NewMapContainer'

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


function formatPhone(num) {
  let a = num.toString()
  return `(${a.slice(0,3)}) ${a.slice(3,6)}-${a.slice(6,10)}`
}

const HospitalDetail = props => {
  let hospital = props.hospital
  return (
    <div className="ui grid">
      <div className="eight wide column">
        <div className="ui teal segment" id="hospitalDetail">
          <h3>Average Rating: {formatStars(hospital.rating_average)} ({hospital.total_reviews} reviews)</h3>
          <b>Address:</b>
          <p>{hospital.street_address}, {hospital.city}, {hospital.state} {hospital.zip_code}</p>
          <b>Phone Number:</b>
          <p>{formatPhone(hospital.phone)}</p>
        </div>
      </div>
      <div className="eight wide column">
        {hospital.latitude ? <MapContainer showPage={true} latlng={{lat: hospital.latitude, lng: hospital.longitude}} hospital={hospital}/> : null }
      </div>
    </div>
  )
}

export default HospitalDetail
