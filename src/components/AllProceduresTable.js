import React from 'react'
import {Link} from 'react-router-dom'

function formatDollars(num) {
  return (num).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class AllProceduresTable extends React.Component {
  render() {
    const procedures = this.props.procedures
    if (procedures && procedures.length > 0) {
      return (
        <div>
        <table className="ui celled striped table">
          <thead>
            <tr>
              <th colSpan="1">Procedure Name</th>
              <th colSpan="1">Code</th>
              <th colSpan="1">Total Hospitals</th>
              <th colSpan="1"># of cases reported in 2016</th>
              <th colSpan="1">National Average Charge</th>
            </tr>
          </thead>
          <tbody>
            {procedures.map(p =>
              <tr>
                <td><Link to={`/procedures/${p.id}`}>{p.name}</Link></td>
                <td>{p.procedure_number_string}</td>
                <td>{numberWithCommas(p.total_hospitals)}</td>
                <td>{numberWithCommas(p.total_discharges)}</td>
                <td>${formatDollars(p.nat_avg_cost)}</td>
            </tr>)}
          </tbody>
        </table>
        </div>
      )
    } else {
      return (
        <div style={{height: '300px', maxWidth: '1100px', position: 'relative'}} id='profile'>
          <div className="loader">
            <div className="ui active dimmer">
              <div className="ui loader"></div>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default AllProceduresTable
