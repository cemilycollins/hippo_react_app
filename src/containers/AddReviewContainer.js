import React from "react"
import CreateReviewForm from '../components/CreateReviewForm'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class AddReviewContainer extends React.Component {
  constructor() {
    super()
    this.state = {
      addReviewClicked: false
    }
  }

  handleClick = () => {
    this.setState({
      addReviewClicked: !this.state.addReviewClicked
    })
  }

  render() {
    const user = this.props.user
    return (
      <div>
        <div className="ui purple button" style={{"margin-top": "0px"}} onClick={this.handleClick}>
        {user && this.state.addReviewClicked ? "Go Back" : "Add New Review"}</div>
        {user && this.state.addReviewClicked ? <CreateReviewForm id={this.props.id} hideForm={this.handleClick} /> : null}
        {!user && this.state.addReviewClicked ? <h3 style={{color: "red"}}>Please <Link to='/login'>Log In</Link> to add a review!</h3> : null}
      </div>
    )
  }
}

const mapStateToProps = ({user}) => ({user})

export default connect(mapStateToProps)(AddReviewContainer)
