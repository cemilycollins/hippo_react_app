import React from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import AllProcedureCardContainer from './AllProcedureCardContainer'

class SearchProceduresPage extends React.Component {

  render() {
    const ps = this.props.procedures
    return (
      <div id="profile">
        <h1><i className="ui stethoscope icon"/> Procedures</h1>
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
          <div style={{textAlign: "center"}}>
            <h2>All Procedures:</h2>
            <h4>Want to see this in table format? <button className="ui button" onClick={() => this.props.push('/procedures/table')}>Click Here!</button></h4>
            <AllProcedureCardContainer all={true} procedures={ps} />
          </div>
      </div>
    )
  }
}

const mapStateToProps = ({procedures}) => ({procedures})

export default connect(mapStateToProps, {push})(SearchProceduresPage)
