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

const AllProcedureCard = props => {
  const p = props.procedure
  return (
    <div className="ui card">
      <div className="content">
        <div className="header"><Link to={`/procedures/${p.id}`}>{p.name}</Link></div>
      </div>
      <div className="content">
      <h4 className="ui sub header" style={{fontSize: "12pt"}}>Pricing</h4>
      <div className="ui small feed">
        <div className="event">
          <div className="content">
            <div className="summary" style={{fontSize: "12pt"}}>
            <i className="money bill alternate outline icon"></i>
            <b style={{color: "#733BBF"}}>${formatDollars(p.nat_avg_cost)}</b> national average
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
              <b style={{color: "#733BBF"}}>{numberWithCommas(p.total_discharges)} cases</b> reported in 2016
              </div>
            </div>
          </div>
          <div className="event">
            <div className="content">
              <div className="summary">
              <i className="hospital outline icon"></i>
              <b style={{color: "#733BBF"}}>{numberWithCommas(p.total_hospitals)} hospitals</b> have this procedure
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ui bottom attached button" onClick={() => props.push(`/procedures/${p.procedure_id}`)}>
        <i className="add icon"></i>
        Find hospitals with this procedure
      </div>
    </div>
  )
}

export default connect(null, {push})(AllProcedureCard)
