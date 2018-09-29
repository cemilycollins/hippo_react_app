import React from 'react'
import { connect } from "react-redux"
import { ROOT_URL, updateUser } from "../redux/actions"
import { push } from 'connected-react-router'
import { Link } from 'react-router-dom'

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
        if (json) {
          this.props.updateUser(json.user);
          localStorage.setItem("token", json.token);
          this.props.push(`users/${json.user.id}`)
        }
      })
  }

  render(){
  return (
    <div id="login">
      <div style={{"text-align": "center"}}>
      <h2>Let's get you signed in</h2>
      <h4>New to Hippo? <Link to='/signup'>Click here</Link> to sign up!</h4>
      <p></p>
      </div>
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

export default connect(null, {push, updateUser})(Login)
