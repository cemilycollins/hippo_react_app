import React from "react"
import CreateReviewForm from '../components/CreateReviewForm'

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
    return (
      <div>
        <div className="ui purple button" style={{"margin-top": "0px"}} onClick={this.handleClick}>
        {this.state.addReviewClicked ? "Go Back" : "Add New Review"}</div>
        {this.state.addReviewClicked ? <CreateReviewForm id={this.props.id} hideForm={this.handleClick} /> : null}
      </div>
    )
  }
}

export default AddReviewContainer
