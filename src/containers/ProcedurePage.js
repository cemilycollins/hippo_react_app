import React from 'react'
import { ROOT_URL } from '../redux/actions'

class ProcedurePage extends React.Component {

  state = {
    procedure: null
  }

  componentDidMount() {
    fetch(ROOT_URL + `/procedures/${this.props.id}`)
      .then(r => r.json())
      .then(json => {
        this.setState({
          procedure: json
        })
      })
  }

  render() {
    if (this.state.procedure) {
      return (
        <div>
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
