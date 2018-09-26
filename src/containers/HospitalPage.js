import React from 'react'
import { connect } from "react-redux"

import ReviewsContainer from './ReviewsContainer'
import HospitalDetail from '../components/HospitalDetail'
import AddReviewContainer from './AddReviewContainer'
import ProcedureTable from '../components/ProcedureTable'
import { ROOT_URL } from '../redux/actions'


class HospitalPage extends React.Component {

  state = {
    hospital: null
  }

  componentDidMount() {
    fetch(ROOT_URL + `/hospitals/${this.props.id}`)
      .then(r => r.json())
      .then(json => {
        this.setState({
          hospital: json
        })
      })
  }

  hospitalName = (hospital) => {
    return hospital.name.toLowerCase().split(" ").map(word => {
      let newWord = word.split("")
      newWord[0] = newWord[0].toUpperCase()
      return newWord.join("")
    }).join(" ")
  }

  render() {
    let hospital = this.state.hospital
    if (this.state.hospital) {
      return (
        <div id="profile">
          <h2><i className="hospital outline icon"/> {this.hospitalName(hospital)}</h2>
          <div className="ui divider"></div>
            <HospitalDetail hospital={hospital} />
          <div className="ui divider"></div>
            <ProcedureTable procedures={hospital.hospital_procedures} />
          <div className="ui divider"></div>
            <AddReviewContainer id={this.props.id}/>
          <div className="ui divider"></div>
          {hospital.reviews.length > 0 ? <ReviewsContainer reviews={hospital.reviews}/> : <h2>Be the first to review this hospital!</h2> }
        </div>
      )
    } else {
      return null
    }
  }
}

const mapStateToProps = ({hospitals}) => ({hospitals})

export default connect(mapStateToProps)(HospitalPage)
