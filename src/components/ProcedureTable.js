import React from 'react'
import {Link} from 'react-router-dom'

function formatDollars(num) {
  return (num).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}

function percent(hosp, nat) {
   return parseInt(((hosp / nat) * 100), 10)-100
}

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

// <th colSpan="1">Average Medicare Payment</th>
// <th colSpan="1">Average Total Payment</th>
//
// <td>${formatDollars(p.average_medicare_payments)}</td>
// <td>${formatDollars(p.average_total_payments)}</td>

const ProcedureTable = props => {
  const procedures = props.hospital_procedures
  const procedure = props.procedure
  return (
    <div>
    <table className="ui celled striped table">
      <thead>
        <tr>
          <th colSpan="1">Hospital Name</th>
          <th colSpan="1"># Patients Treated (2016)</th>
          <th colSpan="1">Average Charge</th>
          <th colSpan="1">% Difference from National Average</th>
        </tr>
      </thead>
      <tbody>
        {procedures.map(p =>
          <tr>
            <td><Link to={`/hospitals/${p.hospital.id}`}>{hospitalName(p.hospital.name)} - {hospitalName(p.hospital.city)}, {p.hospital.state}</Link> <p>{formatStars(p.hospital.rating_average)}</p></td>
            <td>{p.total_discharges}</td>
            <td>${formatDollars(p.average_covered_charges)}</td>
            <td>{percent(p.average_covered_charges, procedure.nat_avg_cost)}%</td>
        </tr>)}
      </tbody>
    </table>
    </div>
  )
}

export default ProcedureTable
