import React from 'react'

function formatDollars(num) {
  return (num).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}

// <th colspan="1"># Hospitals with this procedure</th>
//
// <td>{p.procedure.total_hospitals}</td>

const ProcedureTable = props => {
  const procedures = props.procedures
  return (
    <div>
    <table class="ui celled striped table">
      <thead>
        <tr>
          <th colspan="5">This Hospital</th>
          <th colspan="1">National</th>
        </tr>
        <tr>
          <th colspan="1">Procedure Name</th>
          <th colspan="1">Average Charge</th>
          <th colspan="1">Average Medicare Payment</th>
          <th colspan="1">Average Total Payment</th>
          <th colspan="1"># Patients Treated (2016)</th>
          <th colspan="1">National Avg. Cost</th>
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
        </tr>)}
      </tbody>
    </table>
    </div>
  )
}

export default ProcedureTable
