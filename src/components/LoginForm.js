import React from 'react'
import { connect } from "react-redux"
import { ROOT_URL, updateUser } from "../redux/actions"
import { bindActionCreators } from 'redux'
import { push } from 'connected-react-router'

class Login extends React.Component {
  handleSubmit = e => {
    e.preventDefault()
    let data = JSON.stringify({
      email: e.target.querySelector('input[name="email"]').value,
      password: e.target.querySelector('input[name="password"]').value
    })
    fetch(ROOT_URL + '/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: data
    })
      .then(res => {
        if (res.status === 401 || res.status === 404) {
          alert("login failed")
          return
        } else {
          return res.json()
        }
      })
      .then(json => {
        this.props.updateUser(json.user);
        localStorage.setItem("token", json.token);
        this.props.push('/profile')
      })
  }

  render(){
  return (
    <div style={{padding: '10%', width: '75%', margin: 'auto'}}>
      <h2>Sign In</h2>
      <form className="ui form" onSubmit={this.handleSubmit}>
        <div className="ui form field">
          <label htmlFor="email">Email</label>
          <input type="text" name="email" placeholder="Email" />
        </div>
        <div className="ui form field">
          <label htmlFor="password">Password</label>
          <input type="text" name="password" placeholder="Password" />
        </div>
        <button className="ui purple button" type="submit">Log In</button>
      </form>
    </div>
  )
}
}

const mapDispatchToProps = dispatch => bindActionCreators({
  push: (url) => push(url),
  updateUser
}, dispatch)

export default connect(null, mapDispatchToProps)(Login)
