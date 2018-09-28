import React from "react"
import { connect } from 'react-redux'
import { Modal } from 'semantic-ui-react'
import { ROOT_URL, addReview } from '../redux/actions'


class CreateReviewForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      body: "",
      user_id: props.user.id,
      hospital_id: props.id,
      date: new Date(),
      rating: 0
    }
  }

  handleChange = (e) => {
    this.setState({
      rating: parseInt(e.target.value, 10)
    })
  }

  handleBodyChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.state.rating === 0 || this.state.body === "") {
      alert("Please fill out all fields before submitting the form")
    } else if (this.state.date > new Date()) {
      alert("Date of visit must be today or in the past")
    } else {
      fetch(ROOT_URL + '/reviews',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          'Accept':'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          body: this.state.body,
          user_id: this.state.user_id,
          hospital_id: this.state.hospital_id,
          rating: this.state.rating,
          date: this.state.date
        })
      })
      .then(res=> res.json())
      .then(json=> {
        if (json.date) {
          this.props.closeModal()
          this.props.addReview(json)
        } else {
          alert(json.error)
        }
      })
    }
  }

  render() {
    return (
      <div style={{width: '75%', margin: 'auto'}}>
      <p></p>
        <form onSubmit={this.handleSubmit} className="ui form" style={{padding: "20px"}}>
          <h2>New Review For {this.props.hospitalName}</h2>
          <div className="ui inline form field">
            <label htmlFor="rating">Rating:</label>
            <input className="ui checkbox" type="checkbox" onChange={this.handleChange} value={1} checked={this.state.rating === 1} name="rating" />
            <label>{1}</label> &nbsp;
            <input className="ui checkbox" type="checkbox" onChange={this.handleChange} value={2} checked={this.state.rating === 2} name="rating" />
            <label>{2}</label> &nbsp;
            <input className="ui checkbox" type="checkbox" onChange={this.handleChange} value={3} checked={this.state.rating === 3} name="rating" />
            <label>{3}</label> &nbsp;
            <input className="ui checkbox" type="checkbox" onChange={this.handleChange} value={4} checked={this.state.rating === 4} name="rating" />
            <label>{4}</label> &nbsp;
            <input className="ui checkbox" type="checkbox" onChange={this.handleChange} value={5} checked={this.state.rating === 5} name="rating" />
            <label>{5}</label>
          </div>
          <div className="ui form field">
            <label htmlFor="date">Date of visit:</label>
            <input onChange={this.handleBodyChange} name="date" type="date" />
          </div>
          <div className="ui form field">
            <label htmlFor="body">Body</label>
            <textarea onChange={this.handleBodyChange} name="body" placeholder="Type your review here..." />
          </div>
            <input className="ui purple button" type="submit" name="Submit" />
        </form>
      </div>
    )
  }
}


const mapStateToProps = ({user}) => ({user})

export default connect(mapStateToProps, {addReview})(CreateReviewForm)
