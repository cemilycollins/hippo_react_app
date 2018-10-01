import React from 'react'
import { connect } from "react-redux"
import { bindActionCreators } from 'redux'
import { push } from 'connected-react-router'

import { ROOT_URL} from "../redux/actions"

class CreateUserForm extends React.Component{
  constructor(){
    super()
    this.state={
      name: '',
      email: '',
      password: '',
      city: '',
      state: '',
      profile_pic: ''
    }
  }

  changeHandler=(val, key)=>{
    if(key === 'type_of'){
      val ? val = "admin" : val = "user"
    }
    this.setState({
      [key]: val
    })
  }

  // This code was meant for creating a user who is an administrator.
  // <div className="ui form field">
  //   <label>Are you a hospital administrator? (Check if yes)</label>
  //   <input type="checkbox" onChange={(e)=>this.changeHandler(e.target.checked,'type_of')} name="type_of" />
  // </div>

  addToDB=(e)=>{
    e.preventDefault()
    fetch(ROOT_URL + '/users',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Accept':'application/json'
      },
      body: JSON.stringify({user:{
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        city: this.state.city,
        state: this.state.state,
        type_of: "user",
        profile_pic: this.state.profile_pic
      }})
    })
    .then(res=> res.json())
    .then(json=> {
      if (json.name) {
        this.props.push('/login')
      } else {
        alert(json.error)
      }
    })
  }


render(){
  return(
    <div style={{padding: '10%', width: '75%', margin: 'auto'}}>
    <h2>Create New Account</h2>
      <form onSubmit={(e) => this.addToDB(e)} className="ui form">
        <div className="ui form field">
          <label htmlFor="email">Email</label>
          <input onChange={(e)=>this.changeHandler(e.target.value,'email')} type="text" name="email" placeholder="Email" />
        </div>
        <div className="ui form field">
          <label htmlFor="password">Password</label>
          <input onChange={(e)=>this.changeHandler(e.target.value,'password')} type="password" name="password" placeholder="Password" />
        </div>
        <div className="ui form field">
          <label htmlFor="name">Name</label>
          <input onChange={(e)=>this.changeHandler(e.target.value,'name')} type="text" name="name" placeholder="Name" />
        </div>
        <div className="ui form field">
          <label htmlFor="city">City</label>
          <input onChange={(e)=>this.changeHandler(e.target.value,'city')} type="text" name="city" placeholder="City" />
        </div>
        <div className="ui form field">
          <label htmlFor="state">State</label>
          <input onChange={(e)=>this.changeHandler(e.target.value,'state')} type="text" name="state" placeholder="State" />
        </div>
        <div className="ui form field">
          <label htmlFor="profile_pic">Profile Picture URL</label>
          <input onChange={(e)=>this.changeHandler(e.target.value,'profile_pic')} type="text" name="profile_pic" placeholder="Profile Picture URL" />
        </div>
        <input className="ui purple button" type="submit" name="Submit"/>
      </form>
    </div>
  )}
}

const mapDispatchToProps = dispatch => bindActionCreators({
  push: (url) => push(url),
}, dispatch)

export default connect(null, mapDispatchToProps)(CreateUserForm)
