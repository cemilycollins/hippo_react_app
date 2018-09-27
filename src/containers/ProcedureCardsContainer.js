import React from 'react'
import ProcedureCard from '../components/ProcedureCard'

const ProcedureContainer = props => {
  return (
    <div>
      {props.procedures.length > 0 ?
        <div className="ui cards">
          {props.procedures.map(procedure => <ProcedureCard procedure={procedure}/>)}
        </div> : <div className="ui active dimmer">
          <div className="ui loader"></div>
        </div>}

    </div>
  )
}

export default (ProcedureContainer)
