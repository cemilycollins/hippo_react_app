import React from 'react'
import { ROOT_URL, deleteReview } from '../redux/actions'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import EditReviewForm from './EditReviewForm'

class ReviewCard extends React.Component {
  constructor(){
    super()
    this.state = {
      editClicked: false
    }
  }

  handleClick = () => {
    this.setState({
      editClicked: !this.state.editClicked
    })
  }

  handleDelete = () => {
    fetch(ROOT_URL + `/reviews/${this.props.review.id}`, {
      method: "DELETE",
      headers: {
        'Content-Type':'application/json',
        'Accept':'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        id: this.props.review.id
      })
    }).then(r => r.json())
      .then(json => {
        if (json.id) {
          this.props.deleteReview(json)
          this.handleClick()
        } else {
          alert(json.error)
        }
      })
  }

  formatStars(rating) {
    let arr = []
    for (let i = 0; i < rating; i++) {
      arr.push(<i className="yellow star icon" />)
    }
    if (arr.length < 5) {
      for (let i = arr.length; i < 5 ; i++) {
        arr.push(<i className="grey star icon" />)
      }
    }
    return arr
  }

  formatName(name) {
    return name.toLowerCase().split(" ").map(word => {
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
  if (this.props.review) {
    const review = this.props.review
    return (
      <div className="ui card">
        <div className='ui content'>
          <div className='ui header'>
            {this.formatStars(review.rating)}
            {this.props.user && this.props.user.id === review.user_id ? <i onClick={this.handleClick} className="right aligned edit outline icon" /> : null }
          </div>
          <Link to={`/hospitals/${review.hospital_id}`} className='meta'>{this.formatName(review.hospital_name)}</Link>
          <div className='description'>
            <p><b>Reviewer:</b> <Link to={`/users/${review.user_id}`}>{review.user_name}</Link></p>
            <p><b>Date:</b> {review.date}</p>
            <p>"{review.body}"</p>
          </div>
          <div className="extra content">
            {this.state.editClicked && this.props.user && this.props.user.id === review.user_id ? (
              <div className="ui two buttons">
                <p></p>
                <div className='ui active basic teal button' onClick={this.handleClick}>Go Back</div>
                <div className='ui active basic red button' onClick={this.handleDelete}>Delete</div>
              </div>
            ): null}
            {this.state.editClicked ? <EditReviewForm review={this.props.review} hideForm={this.handleClick} /> : null}
          </div>
        </div>
      </div>
    )} else {
      return null
    }
  }
}

const mapStateToProps = ({user, users}) => ({user, users})

export default connect(mapStateToProps, {deleteReview})(ReviewCard)
