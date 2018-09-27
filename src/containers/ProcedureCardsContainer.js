import React from 'react'
import ProcedureCard from '../components/ProcedureCard'

class ProcedureContainer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      filteredProcedures: props.procedures,
      procedures: props.procedures.slice(0,15),
      firstIndex: 0,
      lastIndex: 15
    }
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
      <div>
        {this.props.procedures.length > 0 ?
          <div>
            <h3>Showing procedures {this.state.firstIndex + 1} to {this.state.lastIndex} of {this.state.filteredProcedures.length}</h3>
            <div className="ui left aligned button" onClick={this.handlePrev}><i className="caret left icon"/> Prev</div>
            <div className="ui right floated button" onClick={this.handleNext}>Next <i className="caret right icon"/></div>
            <div className="ui cards">
              {this.state.procedures.map(procedure => <ProcedureCard procedure={procedure}/>)}
            </div></div> : <div className="ui active dimmer">
              <div className="ui loader"></div>
            </div>
        }

      </div>
    )
  }
}

export default (ProcedureContainer)
