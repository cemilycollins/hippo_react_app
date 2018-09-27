import React, { Component } from 'react';
import './App.css';
import { connect } from "react-redux"
import { Route, Switch, withRouter } from 'react-router-dom'

import NavBar from './components/NavBar'
import HospitalContainer from './containers/HospitalContainer'
import CreateUserForm from './components/CreateUserForm'
import LoginForm from './components/LoginForm'
import Profile from './components/Profile'
import HospitalPage from './containers/HospitalPage'
import OtherUserProfile from './components/OtherUserProfile'
import MapPlacesSearch from './components/MapPlacesSearch'
import { ROOT_URL, updateUser, fetchHospitals} from './redux/actions'


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
        <Switch>
          <Route exact path="/" component={MapPlacesSearch} />
          <Route exact path="/search" component={HospitalContainer} />
          <Route exact path='/login' component={LoginForm} />
          <Route exact path='/signup' component={CreateUserForm} />
          <Route path='/hospitals/:hospital_id' render={props => <HospitalPage id={props.match.params.hospital_id}/>} />
          {this.props.user ? <Route exact path={`/users/${this.props.user.id}`} render={() => <Profile user={this.props.user}/>} /> : null }
          <Route path='/users/:user_id' render={props => <OtherUserProfile id={props.match.params.user_id}/>} />
        </Switch>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  hospitals: state.hospitals,
  user: state.user,
  users: state.users
})

export default withRouter(connect(mapStateToProps, {fetchHospitals, updateUser})(App))
