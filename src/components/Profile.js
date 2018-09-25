import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import ReviewsContainer from '../containers/ReviewsContainer'

const Profile = props => {
  const user = props.user
  if (user) {
    return (
      <div id="profile">
        <h2>My Profile</h2>
        <div className="ui teal segment">
          <img className="ui small circular image" src={user.profile_pic} alt="profile"/>
          <h2>{user.name}</h2>
          <h3>{user.city}, {user.state}</h3>
        </div>
        <div className="ui divider"></div>
          
        <div className="ui divider"></div>
        {user.reviews.length > 0 ? <ReviewsContainer reviews={user.reviews}/> : <h2>You don't have any reviews yet! <Link to="/">Click here</Link> to see hospitals.</h2> }
      </div>
    )
  } else {
    return null
  }

}

const mapStateToProps = ({user}) => ({user})

export default connect(mapStateToProps)(Profile)
