import React from 'react'
import { ROOT_URL, setProcedures, addProcedures } from '../redux/actions'
import { connect } from 'react-redux'
import AllProcedureCard from '../components/AllProcedureCard'

class AllProceduresContainer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      filteredProcedures: [],
      procedures: [],
      firstIndex: 0,
      lastIndex: 15,
      searchTerm: ""
    }
  }

  _isMounted = false

  componentDidMount() {
    this._isMounted = true
    if (this._isMounted && this.props.procedures.length === 0) {
      fetch(ROOT_URL + `/procedures?first=${0}&last=${99}`)
        .then(r => r.json())
        .then(json => {
          this.props.setProcedures(json)
          this.setState({
            allProcedures: json,
            filteredProcedures: json,
            procedures: json.slice(0,15)
          })
          fetch(ROOT_URL + `/procedures?first=${100}&last=${572}`)
            .then(r => r.json())
            .then(json => {
              this.props.addProcedures(json)
              this.setState({
                allProcedures: [...this.state.allProcedures, ...json],
                filteredProcedures: [...this.state.filteredProcedures, ...json]
              })
            })
        })
    } else if (this._isMounted && this.props.procedures.length === 100) {
      this.setState({
        allProcedures: this.props.procedures,
        filteredProcedures: this.props.procedures,
        procedures: this.props.procedures.slice(0,15)
      })
      fetch(ROOT_URL + `/procedures?first=${100}&last=${572}`)
        .then(r => r.json())
        .then(json => {
          this.props.addProcedures(json)
          this.setState({
            allProcedures: [...this.state.allProcedures, ...json],
            filteredProcedures: [...this.state.filteredProcedures, ...json]
          })
        })
    } else if (this._isMounted && this.props.procedures.length > 100) {
      this.setState({
        allProcedures: this.props.procedures,
        filteredProcedures: this.props.procedures,
        procedures: this.props.procedures.slice(0,15)
      })
    }
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  handleNext = (e) => {
    let newFirst = this.state.firstIndex + 15
    let newLast = this.state.lastIndex + 15
    let total = this.state.filteredProcedures.length + 1
    if (newFirst > total) {
      this.setState({
        procedures: this.state.filteredProcedures.slice(0,15),
        firstIndex: 0,
        lastIndex: 15
      })
    } else if (newLast > total) {
      this.setState({
        procedures: this.state.filteredProcedures.slice(newFirst, total),
        firstIndex: newFirst,
        lastIndex: (total - 1)
      })
    } else {
      this.setState({
        procedures: this.state.filteredProcedures.slice(newFirst, newLast),
        firstIndex: newFirst,
        lastIndex: newLast
      })
    }
  }

  handleChange = (e) => {
    let filtered = this.state.allProcedures.filter(p => (
      p.name.toLowerCase().includes(e.target.value.toLowerCase())
    ))
    let last = 15

    if (filtered.length < 15) {
      last = filtered.length
    }

    this.setState({
      searchTerm: e.target.value,
      filteredProcedures: filtered,
      procedures: filtered.slice(0,15),
      firstIndex: 0,
      lastIndex: last
    })
  }

  handlePrev = (e) => {
    let newFirst = this.state.firstIndex - 15
    let newLast = this.state.lastIndex - 15
    let total = this.state.filteredProcedures.length + 1
    let remainder = this.state.filteredProcedures.length % 15
    if (newFirst < 0) {
      this.setState({
        procedures: this.state.filteredProcedures.slice( (total - remainder - 1), total),
        firstIndex: (total - remainder - 1),
        lastIndex: (total - 1)
      })
    } else if (this.state.lastIndex === (total - 1)) {
      this.setState({
        procedures: this.state.filteredProcedures.slice(newFirst, (newFirst + 15)),
        firstIndex: newFirst,
        lastIndex: (newFirst + 15)
      })
    } else {
      this.setState({
        procedures: this.state.filteredProcedures.slice(newFirst, newLast),
        firstIndex: newFirst,
        lastIndex: newLast
      })
    }
  }


  render() {
    return (
      <div style={{"text-align": "center"}}>
        {this.props.procedures.length > 0 ?
          <div>
            <form className="ui form" style={{padding: "10px"}} onSubmit={(e) => e.preventDefault()}>
              <span className="inline field">
                <label style={{"font-size": "12pt"}}>Filter by keyword</label>
                <input type='text' style={{"min-width": "400px"}} value={this.state.searchTerm}  onChange={this.handleChange} placeholder="Heart transplant, Bronchitis, Hip..." />
              </span>
            </form>
            {this.state.filteredProcedures.length > 15 ? <span>
              <div className="ui left floated button" onClick={this.handlePrev}><i className="caret left icon"/> Prev</div>
              <div className="ui right floated button" onClick={this.handleNext}>Next <i className="caret right icon"/></div>
            </span> : <span>
              <div className="ui left floated disabled button"><i className="caret left icon"/> Prev</div>
              <div className="ui right floated disabled button">Next <i className="caret right icon"/></div>
            </span>}

            {this.state.filteredProcedures.length > 15 ? <h4>Showing procedures {this.state.firstIndex + 1} to {this.state.lastIndex} of {this.state.filteredProcedures.length}</h4> : <h4>Showing procedures {this.state.firstIndex + 1} to {this.state.filteredProcedures.length} of {this.state.filteredProcedures.length}</h4> }
            <div className="ui cards">
              {this.state.procedures.map(procedure => <AllProcedureCard key={procedure.id} procedure={procedure}/>)}
            </div>
            {this.state.filteredProcedures.length > 15 ? <div>
              <p></p>
              <div className="ui left floated button" onClick={this.handlePrev}><i className="caret left icon"/> Prev</div>
              <div className="ui right floated button" onClick={this.handleNext}>Next <i className="caret right icon"/></div>
            </div> : null}
          </div> : null
        }
        {this.props.all && this.props.procedures.length === 0 ? <div>
          <h3>Loading...</h3>
            <div style={{height: '300px', width: '100%', position: 'relative'}}>
              <div className="loader">
                <div className="ui active dimmer">
                  <div className="ui loader"></div>
                </div>
              </div>
            </div>
        </div> : null}
      </div>
    )
  }
}
const mapStateToProps = ({procedures}) => ({procedures})

export default connect(mapStateToProps, {setProcedures, addProcedures})(AllProceduresContainer)
