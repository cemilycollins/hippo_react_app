import React from 'react'
import { ROOT_URL } from '../redux/actions'
import ProcedureTable from '../components/ProcedureTable'

class ProcedurePage extends React.Component {

  state = {
    procedure: null,
    originalHPs: null,
    filteredHPs: null,
    searchTerm: "",
    sortLowToHigh: false,
    sortHighToLow: false,
    sortByRating: false
  }

  componentDidMount() {
    fetch(ROOT_URL + `/procedures/${this.props.id}`)
      .then(r => r.json())
      .then(json => {
        this.setState({
          procedure: json,
          originalHPs: [...json.hospital_procedures],
          filteredHPs: [...json.hospital_procedures]
        })
      })
  }

  formatDollars(num) {
    return (num).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
  }

  handleChange = (e) => {
    let value = e.target.value.toLowerCase()
    let filtered = this.state.procedure.hospital_procedures.filter(hp => (
      hp.hospital.name.toLowerCase().includes(value) || hp.hospital.state.toLowerCase().includes(value) || hp.hospital.city.toLowerCase().includes(value)
    ))
    this.setState({
      filteredHPs: filtered,
      searchTerm: e.target.value
    })
  }

  handleSortLowToHigh = (e) => {
    let sort = this.state.filteredHPs.sort( (a,b) => a.average_covered_charges - b.average_covered_charges)
    this.setState({
      sortLowToHigh: true,
      sortHighToLow: false,
      sortByRating: false,
      filteredHPs: sort
    })
  }

  handleSortHighToLow = (e) => {
    let sort = this.state.filteredHPs.sort( (a,b) => b.average_covered_charges - a.average_covered_charges)
    this.setState({
      sortLowToHigh: false,
      sortHighToLow: true,
      sortByRating: false,
      filteredHPs: sort
    })
  }

  handleSortByRating = (e) => {
    let sort = this.state.filteredHPs.sort( (a,b) => b.rating_average - a.rating_average)
    this.setState({
      sortByRating: true,
      sortLowToHigh: false,
      sortHighToLow: false,
      filteredHPs: sort
    })
  }

  reset = () => {
    this.setState({
      filteredHPs: this.state.originalHPs,
      searchTerm: "",
      sortLowToHigh: false,
      sortHighToLow: false,
      sortByRating: false
    })
  }

  render() {
    if (this.state.procedure && this.state.procedure.nat_avg_cost) {
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
              <div className="ui six wide column">
                <form className="ui form" style={{padding: "10px", "text-align": "center"}} onSubmit={(e) => e.preventDefault()}>
                  <span className="field">
                    <label style={{"font-size": "12pt"}}>Filter</label>
                    <input type='text' value={this.state.searchTerm}  onChange={this.handleChange} placeholder="Hospital Name, State, City" />
                  </span>
                </form>
              </div>
              <div className="ui four wide column" style={{"text-align": "center"}}>
                <p></p>
                <button className="ui button" onClick={this.reset}>Reset Filter/Sort</button>
              </div>
              <div className="ui six wide column">
                <form className="ui form" style={{padding: "10px", "text-align": "center"}}>
                  <b style={{"font-size": "12pt"}}>Sort</b>
                  <div className="inline field" id="sort">
                    <label>Price: Low to High</label>
                    <input type='checkbox' checked={this.state.sortLowToHigh} onChange={this.handleSortLowToHigh}/>
                  </div>
                  <div className="inline field" id="sort">
                    <label>Price: High to Low</label>
                    <input type='checkbox' checked={this.state.sortHighToLow} onChange={this.handleSortHighToLow}/>
                  </div>
                  <div className="inline field" id="sort">
                    <label>Rating: High to Low</label>
                    <input type='checkbox' checked={this.state.sortByRating} onChange={this.handleSortByRating}/>
                  </div>
                </form>
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
