import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import ReviewsContainer from '../containers/ReviewsContainer'
import EditUserForm from './EditUserForm'

class Profile extends React.Component {
  constructor() {
    super()
    this.state = {
      editUserClicked: false
    }
  }

  handleClick = () => {
    this.setState({
      editUserClicked: !this.state.editUserClicked
    })
  }

  render () {
    const user = this.props.user
    if (user) {
      return (
        <div id="profile">
          <h2>My Profile</h2>
          <div className="ui teal segment">
            <img className="ui small circular image" src={user.profile_pic} alt="profile"/>
            <h2>{user.name} <i onClick={this.handleClick} className="ui edit icon" /></h2>
            <h3>{user.city}, {user.state}</h3>
          </div>
          {this.state.editUserClicked ? <EditUserForm hideForm={this.handleClick} /> : null}
          <div className="ui divider"></div>
          {user.reviews.length > 0 ? <ReviewsContainer reviews={user.reviews}/> : <h2>You don't have any reviews yet! <Link to="/">Click here</Link> to see hospitals.</h2> }
        </div>
      )
    } else {
      return null
    }
  }

}

const mapStateToProps = ({user}) => ({user})

export default connect(mapStateToProps)(Profile)
