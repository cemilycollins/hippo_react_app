import React from "react"
import { connect } from 'react-redux'
import { ROOT_URL, updateUser } from '../redux/actions'

class EditUserForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: props.user.name,
      email: props.user.email,
      city: props.user.city,
      state: props.user.state,
      profile_pic: props.user.profile_pic
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    fetch(ROOT_URL + `/users/${this.props.user.id}`,{
      method:'PATCH',
      headers:{
        'Content-Type':'application/json',
        'Accept':'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({user:{
        id: this.props.user.id,
        name: this.state.name,
        email: this.state.email,
        city: this.state.city,
        state: this.state.state,
        profile_pic: this.state.profile_pic
      }})
    })
    .then(res=> res.json())
    .then(json=> {
      if (json.name) {
        this.props.hideForm()
        this.props.updateUser(json)
      } else {
        alert(json.error)
      }
    })
  }

  render() {
    return (
      <div>
        <div className="ui divider"></div>
        <div className="ui purple button" style={{"margin-top": "0px"}} onClick={this.props.hideForm}>
        Go Back</div>
        <div style={{padding: '5%', width: '90%', margin: 'auto'}}>
        <h2>Update Your Information</h2>
          <form onSubmit={(e)=> this.handleSubmit(e)} className="ui form">
            <div className="ui form field">
              <label htmlFor="email">Email</label>
              <input onChange={this.handleChange} type="text" name="email" placeholder="Email" value={this.state.email}/>
            </div>
            <div className="ui form field">
              <label htmlFor="name">Name</label>
              <input onChange={this.handleChange} type="text" name="name" placeholder="Name" value={this.state.name}/>
            </div>
            <div className="ui form field">
              <label htmlFor="city">City</label>
              <input onChange={this.handleChange} type="text" name="city" placeholder="City" value={this.state.city}/>
            </div>
            <div className="ui form field">
              <label htmlFor="state">State</label>
              <input onChange={this.handleChange} type="text" name="state" placeholder="State" value={this.state.state}/>
            </div>
            <div className="ui form field">
              <label htmlFor="profile_pic">Profile Picture URL</label>
              <input onChange={this.handleChange} type="text" name="profile_pic" placeholder="Profile Picture URL" value={this.state.profile_pic}/>
            </div>
            <input className="ui purple button" type="submit" name="Submit"/>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({user}) => ({user})

export default connect(mapStateToProps, {updateUser})(EditUserForm)
