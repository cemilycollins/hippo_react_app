import React from 'react'
import { ROOT_URL, setProcedures } from '../redux/actions'
import { connect } from 'react-redux'
import AllProceduresTable from '../components/AllProceduresTable'

class AllProceduresPage extends React.Component {

  constructor() {
    super()
    this.state = {
      filteredProcedures: [],
      allProcedures: [],
      searchTerm: "",
      sortLowToHigh: false,
      sortHighToLow: false
    }
  }

  _isMounted = false

  componentDidMount() {
    this._isMounted = true
    if (this._isMounted && this.props.procedures.length === 0) {
      fetch(ROOT_URL + '/procedures')
        .then(r => r.json())
        .then(json => {
          this.props.setProcedures(json)
          this.setState({
            filteredProcedures: [...json],
            allProcedures: [...json]
          })
        })
    } else if (this._isMounted && this.props.procedures.length > 0){
      this.setState({
        filteredProcedures: [...this.props.procedures],
        allProcedures: [...this.props.procedures]
      })
    }
  }

  componentDidUnmount() {
    this._isMounted = false
  }

  handleChange = (e) => {
    let value = e.target.value.toLowerCase()
    let filtered = this.props.procedures.filter(p => (
      p.name.toLowerCase().includes(value)
    ))
    this.setState({
      filteredProcedures: filtered,
      searchTerm: e.target.value
    })
  }

  handleSortLowToHigh = (e) => {
    let sort = this.state.filteredProcedures.sort( (a,b) => a.nat_avg_cost - b.nat_avg_cost)
    this.setState({
      sortLowToHigh: true,
      sortHighToLow: false,
      filteredProcedures: sort
    })
  }

  handleSortHighToLow = (e) => {
    let sort = this.state.filteredProcedures.sort( (a,b) => b.nat_avg_cost - a.nat_avg_cost)
    this.setState({
      sortLowToHigh: false,
      sortHighToLow: true,
      filteredProcedures: sort
    })
  }

  reset = () => {
    this.setState({
      filteredProcedures: [...this.state.allProcedures],
      searchTerm: "",
      sortLowToHigh: false,
      sortHighToLow: false
    })
  }

  render () {
    return (
      <div id="profile">
        <h1><i className="ui stethoscope icon"/> Procedures Table</h1>
          <div className="ui teal segment">
            <h3>Total Procedures: 573</h3>
            <b>Terminology:</b>
            <ul>
              <li><b>MCC</b> - means "Major Complications and Comorbidities" meaning that the patient has another condition or complication that has a major effect on the procedure.</li>
              <li><b>CC</b> - means "Complications and Comorbidities" which includes less severe conditions or complications than the MCC category.</li>
              <li><b>W</b> means "with"</li>
              <li><b>W/O</b> means "without"</li>
            </ul>
            <p>To see a full list of CC and MCC codes <a href="https://www.cms.gov/icd10manual/fullcode_cms/P0370.html" >click here</a></p>
          </div>
        <div className="ui divider"></div>
          <div style={{"text-align": "center"}}>
            <h2>All Procedures:</h2>
          </div>
          <div className="ui grid">
            <div className="ui six wide column">
              <form className="ui form" style={{padding: "10px", "text-align": "center"}} onSubmit={(e) => e.preventDefault()}>
                <span className="field">
                  <label style={{"font-size": "12pt"}}>Filter</label>
                  <input type='text' value={this.state.searchTerm}  onChange={this.handleChange} placeholder="Keyword" />
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
              </form>
            </div>
          </div>
        <AllProceduresTable procedures={this.state.filteredProcedures} />
      </div>
    )
  }
}

const mapStateToProps = ({procedures}) => ({procedures})

export default connect(mapStateToProps, {setProcedures})(AllProceduresPage)
