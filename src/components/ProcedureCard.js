import React from 'react'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'


function formatDollars(num) {
  return (num).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}

const ProcedureCard = props => {
  const p = props.procedure
  const percent = Math.abs(parseInt(((p.average_covered_charges / p.nat_avg_cost) * 100), 10))
  return (
    <div className="ui card" onClick={() => props.push(`/procedures/${p.procedure_id}`)}>
      <div className="content">
        <div className="header">{p.procedure_name}</div>
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
            <a>${formatDollars(p.nat_avg_cost)}</a> national average charge
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
              <a>{p.total_discharges} cases</a> at this hospital in 2016
              </div>
            </div>
          </div>
          <div className="event">
            <div className="content">
              <div className="summary">
              <i className="hospital outline icon"></i>
              <a>{p.total_hospitals - 1} other hospitals</a> have this procedure
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="extra content">
        <span>
        {(percent - 100) > 0 ? <span><i className="arrow circle up icon"></i> {percent-100}% more</span> : <span><i className="arrow circle down icon"></i> {Math.abs(percent-100)}% less</span>} costly than the national average
      </span>
      </div>
      <div className="ui bottom attached button">
        <i className="add icon"></i>
        Compare to other hospitals
      </div>
    </div>
  )
}

export default connect(null, {push})(ProcedureCard)
