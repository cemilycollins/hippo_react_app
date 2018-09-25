import React from "react"
import { connect } from 'react-redux'
import { ROOT_URL, editReview } from '../redux/actions'


class EditReviewForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      review_id: props.review.id,
      body: props.review.body,
      date: props.review.date,
      rating: props.review.rating
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
    } else {
      fetch(ROOT_URL + `/reviews/${this.state.review_id}`,{
        method:'PATCH',
        headers:{
          'Content-Type':'application/json',
          'Accept':'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          id: this.state.review_id,
          body: this.state.body,
          rating: this.state.rating,
          date: this.state.date
        })
      })
      .then(res=> res.json())
      .then(json=> {
        if (json.date) {
          this.props.hideForm()
          this.props.editReview(json)
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
      <h3>Edit Your Review</h3>
        <form onSubmit={this.handleSubmit} className="ui form" >
          <label htmlFor="rating"><b>Rating:</b></label>
          <div className="ui inline form field">
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
            <input onChange={this.handleBodyChange} name="date" type="date" value={this.state.date} />
          </div>
          <div className="ui form field">
            <label htmlFor="body">Body</label>
            <textarea onChange={this.handleBodyChange} name="body" placeholder="Type your review here..." value={this.state.body} />
          </div>
          <input className="ui purple button" type="submit" name="Submit"/>
        </form>
      </div>
    )
  }
}


const mapStateToProps = ({user}) => ({user})

export default connect(mapStateToProps, { editReview })(EditReviewForm)
