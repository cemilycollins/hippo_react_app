import React from "react"
import { connect } from 'react-redux'
import { ROOT_URL } from '../redux/actions'


class CreateReviewForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      body: "",
      user_id: props.user.id,
      hospital_id: props.id,
      date: Date.today,
      rating: 0
    }
  }

  handleChange = (e) => {
    console.log(e.target.value)
    this.setState({
      rating: parseInt(e.target.value)
    })
  }

  handleBodyChange = (e) => {
    this.setState({
      body: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    debugger
    if (this.state.rating === 0 || this.state.body === "") {
      alert("Please fill out all fields before submitting the form")
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
        if (json.name) {
          this.props.hideForm()
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
      <h2>Your New Review</h2>
        <form onSubmit={this.handleSubmit} className="ui form" >
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
            <label htmlFor="body">Body</label>
            <textarea onChange={this.handleBodyChange} name="body" placeholder="Type your review here..." />
          </div>
          <input className="ui purple button" type="submit" name="Submit"/>
        </form>
      </div>
    )
  }
}

// <div className="inline fields" >
//   <label htmlFor="rating">Rating:</label>
//   <div className="field">
//     <div className="ui checkbox">
//       <input type="checkbox" checked={this.state.rating === 1} name="rating" />
//       <label>1</label>
//     </div>
//   </div>
//   <div className="field">
//     <div className="ui checkbox">
//       <input onChange={(e) => this.handleChange(e)} type="checkbox" checked={this.state.rating === 2} name="rating" tabindex="0" className="hidden"/>
//       <label>2</label>
//     </div>
//   </div>
//   <div className="field">
//     <div className="ui checkbox">
//       <input onChange={this.handleChange} type="checkbox" checked={this.state.rating === 3} name="rating" tabindex="0" className="hidden"/>
//       <label>3</label>
//     </div>
//   </div>
//   <div className="field">
//     <div className="ui checkbox">
//       <input onChange={this.handleChange} type="checkbox" checked={this.state.rating === 4} name="rating" tabindex="0" className="hidden"/>
//       <label>4</label>
//     </div>
//   </div>
//   <div className="field">
//     <div className="ui checkbox">
//       <input onChange={this.handleChange} type="checkbox" checked={this.state.rating === 5} name="rating" tabindex="0" className="hidden"/>
//       <label>5</label>
//     </div>
//   </div>
// </div>

const mapStateToProps = ({user}) => ({user})

export default connect(mapStateToProps)(CreateReviewForm)
