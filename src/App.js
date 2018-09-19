import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar'
import HospitalContainer from './containers/HospitalContainer'
import { connect } from "react-redux"
import { fetchHospitals } from './redux/actions'

class App extends Component {

  componentDidMount() {
    if (this.props.hospitals.length === 0) {
      this.props.fetchHospitals()
    }
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        <HospitalContainer/>
      </div>
    );
  }
}

const mapStateToProps = ({hospitals}) => ({hospitals})

export default connect(mapStateToProps, {fetchHospitals})(App);
