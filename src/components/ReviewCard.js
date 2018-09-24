import React from 'react'
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

  render() {
  const review = this.props.review
  return (
    <div className="ui card" >
      <div className='ui content'>
        <div className='ui header'><i className="yellow star icon" /> Rating: {review.rating}/5</div>
        <div className='meta'>Date: {review.date}</div>
        <div className='description'>
          <p>"{review.body}"</p>
        </div>
        <div className="extra content">
          {this.props.user && this.props.user.id === review.user_id ? (
            <div className="ui two buttons">
              <div className='ui active basic red button' onClick={() => console.log("deleted")}>Delete</div>
              <div className='ui active basic teal button' onClick={this.handleClick}>Edit</div>
            </div>
          ): null}
          {this.state.editClicked ? <EditReviewForm review={this.props.review} hideForm={this.handleClick} /> : null}
        </div>
      </div>
    </div>
  )}
}

const mapStateToProps = ({user}) => ({user})

export default connect(mapStateToProps)(ReviewCard)
