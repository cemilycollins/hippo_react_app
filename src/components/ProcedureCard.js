import React from 'react'

function formatDollars(num) {
  return (num).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}

const ProcedureCard = props => {
  const p = props.procedure
  const percent = parseInt(((p.average_covered_charges / p.procedure.nat_avg_cost) * 100), 10)
  return (
    <div className="ui card">
      <div className="content">
        <div className="header">{p.procedure.name}</div>
      </div>
      <div className="content">
      <h4 className="ui sub header" style={{'font-size': "12pt"}}>Pricing</h4>
      <div className="ui small feed">
        <div className="event">
          <div className="content">
          <div className="summary" style={{'font-size': "12pt"}}>
          <i className="money bill alternate outline icon"></i>
          <a>${formatDollars(p.average_covered_charges)}</a> average charge</div>
          </div>
        </div>
        <div className="event">
          <div className="content">
            <div className="summary">
            <i className="globe icon"></i>
            <a>${formatDollars(p.procedure.nat_avg_cost)}</a> national average charge
            </div>
          </div>
        </div>
      </div>
        <h4 className="ui sub header">Procedure Info</h4>
        <div className="ui small feed">
          <div className="event">
            <div className="content">
              <div className="summary">
              <i className="users icon"></i>
              <a>{p.total_discharges} people treated</a> in 2016
              </div>
            </div>
          </div>
          <div className="event">
            <div className="content">
              <div className="summary">
              <i className="hospital outline icon"></i>
              <a>{p.procedure.total_hospitals - 1} other hospitals</a> have this procedure
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="extra content">
        <span>
        <i className="dollar sign icon"></i>
        {percent-100}% {(percent - 100) > 0 ? "more" : "less"} pricey than the average
      </span>
      </div>
      <div className="ui bottom attached button">
        <i className="add icon"></i>
        See More
      </div>
    </div>
  )
}

export default ProcedureCard
