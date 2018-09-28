import React from 'react'
import {Link} from 'react-router-dom'

function formatDollars(num) {
  return (num).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}

function percent(nat, hosp) {
  const percent = parseInt(((hosp / nat) * 100), 10)-100
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
    <h2><i className="dollar sign icon"/>Pricing:</h2>
    <table className="ui celled striped table">
      <thead>
        <tr>
          <th colSpan="1">Hospital Name</th>
          <th colSpan="1"># Patients Treated (2016)</th>
          <th colSpan="1">Average Charge</th>
          <th colSpan="1">% Difference from Nat'l Avg</th>
        </tr>
      </thead>
      <tbody>
        {procedures.map(p =>
          <tr>
            <td><Link to={`/hospitals/${p.hospital.id}`}>{p.hospital.name} - {p.hospital.city}, {p.hospital.state}</Link></td>
            <td>{p.total_discharges}</td>
            <td>${formatDollars(p.average_covered_charges)}</td>
            <td>{percent(p.average_covered_charges, procedure.nat_avg_cost)}</td>
        </tr>)}
      </tbody>
    </table>
    </div>
  )
}

export default ProcedureTable
