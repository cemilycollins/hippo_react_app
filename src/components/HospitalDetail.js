import React from 'react'

const HospitalDetail = props => {
  let hospital = props.hospital
  return (
    <div className="ui teal segment">
      <h3>Average Rating: {hospital.rating_average} Stars</h3>
      <h3>Address:</h3>
      <p>{hospital.street_address}, {hospital.city}, {hospital.state} {hospital.zip_code}</p>
    </div>
  )
}

export default HospitalDetail
