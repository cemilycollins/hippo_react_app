import React from 'react'
import { connect } from 'react-redux'
import ReviewsContainer from '../containers/ReviewsContainer'

const OtherUserProfile = props => {
  const user = props.users.find(u => u.id === parseInt(props.id, 10))
  if (user) {
    return (
      <div id="profile">
        <div className="ui teal segment">
          <div className="three wide column">
            <img className="ui small circular image" src={user.profile_pic} alt="profile"/>
          </div>
          <div className="nine wide column">
            <h2>{user.name}</h2>
            <p><b>{user.city}, {user.state}</b></p>
          </div>
        </div>
        <div className="ui divider"></div>
        {user.reviews.length > 0 ? <ReviewsContainer reviews={user.reviews}/> : null }
      </div>
    )
  } else {
    return null
  }
}

const mapStateToProps = ({users}) => ({users})

export default connect(mapStateToProps)(OtherUserProfile)
