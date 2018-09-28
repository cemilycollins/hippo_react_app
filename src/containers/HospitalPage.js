import React from 'react'
import { connect } from "react-redux"

import ReviewsContainer from './ReviewsContainer'
import HospitalDetail from '../components/HospitalDetail'
import ProcedureCardsContainer from './ProcedureCardsContainer'
import CreateReviewModal from '../components/CreateReviewModal'
import { ROOT_URL, setShowHospital } from '../redux/actions'


class HospitalPage extends React.Component {

  componentDidMount() {
    if (this.props.hospitals.length > 0 && this.props.hospitals.find(h => h.id === parseInt(this.props.id, 10))) {
      this.props.setShowHospital(this.props.hospitals.find(h => h.id === parseInt(this.props.id, 10)))
    } else {
      fetch(ROOT_URL + `/hospitals/${this.props.id}`)
      .then(r => r.json())
      .then(json => this.props.setShowHospital(json))
    }
    window.scrollTo(0,0)
  }

  hospitalName = (hospital) => {
    return hospital.name.toLowerCase().split(" ").map(word => {
      let newWord = word.split("")
      newWord[0] = newWord[0].toUpperCase()
      return newWord.join("")
    }).join(" ")
  }

  render() {
    let hospital = this.props.showHospital
    if (this.props.showHospital && this.props.showHospital.id === parseInt(this.props.id, 10)) {
      return (
        <div id="profile">
          <h2><i className="hospital outline icon"/> {this.hospitalName(hospital)}</h2>
          <div className="ui divider"></div>
            <HospitalDetail hospital={hospital} />
          <div className="ui divider"></div>
            <CreateReviewModal id={this.props.id} hospitalName={this.hospitalName(hospital)}/>
            {hospital.reviews.length > 0 ? <ReviewsContainer reviews={hospital.reviews}/> : <h2>Be the first to review this hospital!</h2> }
          <div className="ui divider"></div>
            <ProcedureCardsContainer procedures={hospital.hospital_procedures} />
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

const mapStateToProps = ({showHospital, hospitals}) => ({showHospital, hospitals})

export default connect(mapStateToProps, {setShowHospital})(HospitalPage)
