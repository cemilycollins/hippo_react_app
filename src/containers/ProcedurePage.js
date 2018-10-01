import React from 'react'
import { ROOT_URL } from '../redux/actions'
import ProcedureTable from '../components/ProcedureTable'

class ProcedurePage extends React.Component {

  state = {
    procedure: null,
    filteredHPs: null,
    searchTerm: "",
  }

  componentDidMount() {
    fetch(ROOT_URL + `/procedures/${this.props.id}`)
      .then(r => r.json())
      .then(json => {
        this.setState({
          procedure: json,
          filteredHPs: json.hospital_procedures
        })
      })
  }

  formatDollars(num) {
    return (num).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
  }

  handleChange = (e) => {
    let value = e.target.value.toLowerCase()
    let filtered = this.state.procedure.hospital_procedures.filter(hp => (
      hp.hospital_name.toLowerCase().includes(value) || hp.state.toLowerCase().includes(value) || hp.city.toLowerCase().includes(value)
    ))
    this.setState({
      filteredHPs: filtered,
      searchTerm: e.target.value
    })
  }

  handleSort = () => {

  }

  render() {
    if (this.state.procedure) {
      const p = this.state.procedure
      return (
        <div id="profile">
          <h1>{p.name} ({p.procedure_number_string})</h1>
            <div className="ui teal segment">
              <h3>National Average Cost: ${this.formatDollars(p.nat_avg_cost)}</h3>
              <p><b>Number of Hospitals:</b> {p.total_hospitals}</p>
              <p><b>Total Cases in 2016:</b> {p.total_discharges}</p>
            </div>
          <div className="ui divider"></div>
            <div style={{"text-align": "center"}}>
              <h2>Pricing by Hospital:</h2>
            </div>
            <div className="ui grid">
              <div className="ui four wide column">
                <form className="ui form" style={{padding: "10px", "text-align": "center"}}>
                  <span className="field">
                    <label style={{"font-size": "12pt"}}>Filter</label>
                    <input type='text' value={this.state.searchTerm}  onChange={this.handleChange} placeholder="Hospital Name, State, City" />
                  </span>
                </form>
              </div>
              <div className="ui four wide column">
                <form className="ui form" style={{padding: "10px", "text-align": "center"}}>
                  <span className="field">
                    <label style={{"font-size": "12pt"}}>Sort</label>
                    <input type='checkbox' value="By Price" placeholder="Hospital Name, State, City" />
                  </span>
                </form>
              </div>
              <div className="ui four wide column">
                <button className="ui button">Reset Filter/Sort</button>
              </div>
            </div>
          <ProcedureTable procedure={p} hospital_procedures={this.state.filteredHPs} />
        </div>
      )
    } else {
      return (
        <div className="loader">
          <div className="ui active dimmer">
            <div className="ui loader"></div>
          </div>
        </div>
      )
    }

  }
}

export default ProcedurePage
