import React from 'react'

function formatDollars(num) {
  return (num).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}

const ProcedureTable = props => {
  const procedures = props.procedures
  return (
    <div>
    <h2><i className="dollar sign"/>Pricing:</h2>
    <table className="ui celled striped table">
      <thead>
        <tr>
          <th colSpan="5">This Hospital</th>
          <th colSpan="2">National</th>
        </tr>
        <tr>
          <th colSpan="1">Procedure Name</th>
          <th colSpan="1">Average Charge</th>
          <th colSpan="1">Average Medicare Payment</th>
          <th colSpan="1">Average Total Payment</th>
          <th colSpan="1"># Patients Treated (2016)</th>
          <th colSpan="1">National Avg. Cost</th>
          <th colSpan="1"># Hospitals Performing This Procedure</th>
        </tr>
      </thead>
      <tbody>
        {procedures.map(p => <tr>
          <td>{p.procedure.name}</td>
          <td>${formatDollars(p.average_covered_charges)}</td>
          <td>${formatDollars(p.average_medicare_payments)}</td>
          <td>${formatDollars(p.average_total_payments)}</td>
          <td>{p.total_discharges}</td>
          <td>${formatDollars(p.procedure.nat_avg_cost)}</td>
          <td>{p.procedure.total_hospitals}</td>
        </tr>)}
      </tbody>
    </table>
    </div>
  )
}

export default ProcedureTable
