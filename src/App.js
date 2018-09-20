import React, { Component } from 'react';
import './App.css';
import { connect } from "react-redux"
import { Route, Switch, Link, withRouter } from 'react-router-dom'

import NavBar from './components/NavBar'
import HospitalContainer from './containers/HospitalContainer'
import CreateUserForm from './components/CreateUserForm'
import LoginForm from './components/LoginForm'
import { ROOT_URL, updateUser, fetchHospitals } from './redux/actions'


class App extends Component {

  componentDidMount() {
    if (this.props.hospitals.length === 0) {
      this.props.fetchHospitals()
    }
    if (localStorage.getItem('token')) {
      fetch(ROOT_URL + '/me', {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }).then(r => r.json())
      .then(user => this.props.updateUser(user))
    }
  }

  render() {
    return (
      <div className="App">
        <NavBar user={this.props.user}/>
        <HospitalContainer/>
        <LoginForm />
      </div>
    );
  }
}

const mapStateToProps = ({hospitals, user}) => ({hospitals, user})

export default connect(mapStateToProps, {fetchHospitals, updateUser})(withRouter(App));
