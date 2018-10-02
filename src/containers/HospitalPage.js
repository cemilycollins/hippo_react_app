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
      fetch(ROOT_URL + `/hospitals/${this.props.id}`)
      .then(r => r.json())
      .then(json => this.props.setShowHospital(json))
    } else {
      fetch(ROOT_URL + `/hospitals/${this.props.id}`)
      .then(r => r.json())
      .then(json => this.props.setShowHospital(json))
    }
    window.scrollTo(0,0)
  }

  hospitalName = (hospital) => {
    return hospital.name.toLowerCase().split(" ").map(word => {
      if (word.length > 0 && word !== "&") {
        let newWord = word.split("")
        newWord[0] = newWord[0].toUpperCase()
        return newWord.join("")
      } else {
        return word
      }
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
            <div style={{"text-align": "center"}}>
              {hospital.total_reviews > 0 ? null : <h3>Be the first to review this hospital!</h3> }
              <CreateReviewModal id={this.props.id} hospitalName={this.hospitalName(hospital)}/>
              {hospital.reviews && hospital.reviews.length > 0 ? <div style={{"text-align": "left"}}><ReviewsContainer reviews={hospital.reviews}/></div> : null }
            </div>
          <div className="ui divider"></div>
            <h2 style={{"text-align": "center"}}>Procedures and Pricing</h2>
            {hospital.hospital_procedures ? <ProcedureCardsContainer procedures={hospital.hospital_procedures} /> :
              <div style={{height: '300px', width: '100%', position: "relative"}}>
                <div className="loader">
                  <div className="ui active dimmer">
                    <div className="ui loader"></div>
                  </div>
                </div>
              </div>
            }
        </div>
      )
    } else {
      return (
        <div style={{height: '300px', width: '100%'}}>
          <div className="loader">
            <div className="ui active dimmer">
              <div className="ui loader"></div>
            </div>
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = ({showHospital, hospitals}) => ({showHospital, hospitals})

export default connect(mapStateToProps, {setShowHospital})(HospitalPage)
