import React from 'react'
import { connect } from 'react-redux'
import ReviewsContainer from '../containers/ReviewsContainer'
import { ROOT_URL } from '../redux/actions'

class OtherUserProfile extends React.Component {

  constructor() {
    super()
    this.state = {
      user: null
    }
  }
  _isMounted = false

  componentDidMount() {
    this._isMounted = true
    if (this._isMounted) {
      fetch(ROOT_URL + `/users/${this.props.id}`)
        .then(r => r.json())
        .then(json => this.setState({
          user: json
        }))
    }
  }

  componentDidUnmount() {
    this._isMounted = false
  }

  render() {
    if (this.state.user && this.state.user.reviews) {
      const user = this.state.user
      return (
        <div id="profile">
          <div className='ui teal segment' id="profileSegment">
            <div style={{width: "155px"}}>
              <img className="ui small circular image" src={user.profile_pic} alt="profile"/>
            </div>
            <div>
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
}

const mapStateToProps = ({users}) => ({users})

export default connect(mapStateToProps)(OtherUserProfile)
