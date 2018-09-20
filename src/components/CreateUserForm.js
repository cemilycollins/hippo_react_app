import React from 'react'
import {Link} from 'react-router-dom'

class CreateUserForm extends React.Component{
  constructor(){
    super()
    this.state={
      name: '',
      email: '',
      password_digest: '',
      city: '',
      state: '',
      type_of: '',
      profile_pic: ''
    }
  }

    changeHandler=(val, key)=>{
      if(key === 'type_of'){
        val = val.innerText.toLowerCase()
      }
      this.setState({
        [key]: val
      })
    }

    addToDB=(e)=>{
      e.preventDefault()
      fetch('http://localhost:3000/users/',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          'Accept':'application/json'
        },
        body: JSON.stringify({
          name: this.state.name,
          email: this.state.email,
          password_digest: this.state.password,
          city: this.state.city,
          state: this.state.state,
          type_of: this.state.type_of,
          profile_pic: this.state.profile_pic
        })
      })
      .then(res=> res.json())
      .then(json=> console.log(json))
    }


  render(){
    return(
      <div style={{padding: '10%', width: '75%', margin: 'auto'}}>
      <h2>Create A New Account</h2>
        <form onSubmit={this.addToDB} className="ui form">
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
            <label htmlFor="profile_pic">Profile Picture URL</label>
            <input onChange={(e)=>this.changeHandler(e.target.value,'profile_pic')} type="text" name="profile_pic" placeholder="Profile Picture URL" />
          </div>
          <div className="ui form field">
            <label htmlFor="state">State</label>
            <input onChange={(e)=>this.changeHandler(e.target.value,'state')} type="text" name="state" placeholder="Tell us about yourself..." />
          </div>
          <div class="ui selection dropdown">
            <input type="hidden" name="type_of" />
            <i class="dropdown icon"></i>
            <div class="default text">Are you a hospital administrator?</div>
            <div class="menu">
              <div class="item" data-value="hospital_admin">Yes</div>
              <div class="item" data-value="user">No</div>
            </div>
          </div>

          <Link to="/login" className="ui purple button" type="submit">Submit</Link>
        </form>
      </div>
    )
  }

}

export default CreateUserForm
