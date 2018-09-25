import React from 'react'
import { connect } from 'react-redux'
import ReviewsContainer from '../containers/ReviewsContainer'

const OtherUserProfile = props => {
  const user = props.users.find(u => u.id === parseInt(props.id, 10))
  if (user) {
    return (
      <div id="profile">
        <div className="ui teal segment">
          <img className="ui small circular image" src={user.profile_pic} alt="profile"/>
          <h2>{user.name}</h2>
          <h3>{user.city}, {user.state}</h3>
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
