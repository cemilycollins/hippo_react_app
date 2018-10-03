import React from 'react'
import { push } from 'connected-react-router'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'


function formatDollars(num) {
  return (num).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const ProcedureCard = props => {
  const p = props.procedure
  const percent = Math.abs(parseInt(((p.average_covered_charges / p.nat_avg_cost) * 100), 10))
  return (
    <div className="ui card">
      <div className="content">
        <div className="header"><Link to={`/procedures/${p.procedure_id}`}>{p.procedure_name}</Link></div>
      </div>
      <div className="content">
      <h4 className="ui sub header" style={{fontSize: "12pt"}}>Pricing</h4>
      <div className="ui small feed">
        <div className="event">
          <div className="content">
          <div className="summary" style={{fontSize: "12pt"}}>
          <i className="money bill alternate outline icon"></i>
          <b style={{color: "#733BBF"}}>${formatDollars(p.average_covered_charges)}</b> average charge</div>
          </div>
        </div>
        <div className="event">
          <div className="content">
            <div className="summary">
            <i className="globe icon"></i>
            <b style={{color: "#733BBF"}}>${formatDollars(p.nat_avg_cost)}</b> national average charge
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
              <b style={{color: "#733BBF"}}>{numberWithCommas(p.total_discharges)} cases</b> at this hospital in 2016
              </div>
            </div>
          </div>
          <div className="event">
            <div className="content">
              <div className="summary">
              <i className="hospital outline icon"></i>
              <b style={{color: "#733BBF"}}>{numberWithCommas(p.total_hospitals - 1)} other hospitals</b> have this procedure
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
      <div className="ui bottom attached button" onClick={() => props.push(`/procedures/${p.procedure_id}`)}>
        <i className="add icon"></i>
        Compare to other hospitals
      </div>
    </div>
  )
}

export default connect(null, {push})(ProcedureCard)
