import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux"
import { logoutUser } from "../redux/actions"

const NavBar = props => {
  return (
    <div className="ui inverted menu navbar">
      <NavLink exact to="/" className="item">
        <h2 className="ui header">
          <i className="h square icon" />
          <div className="content">Hippo</div>
          <p style={{color: "white", "font-size": "12pt"}}> &nbsp; Find the best hospitals in town!</p>
        </h2>
      </NavLink>
      <NavLink
        exact
        to="/hospitals"
        className="ui item"
        activeClassName="ui active item"
      >
        Search Hospitals
      </NavLink>
      <NavLink
        exact
        to="/procedures"
        className="ui item"
        activeClassName="ui active item"
      >
        Search Procedures
      </NavLink>
      {props.user ? <NavLink id="nav-item"
        exact
        to={`/users/${props.user.id}`}
        className="ui item"
        activeClassName="ui active item"
      >
        Profile
      </NavLink> : <NavLink
        exact
        to="/signup"
        className="ui item"
        activeClassName="ui active item"
      >
        Sign Up
      </NavLink>}
      {props.user ? <div className="ui item" onClick={props.logoutUser}>
        Log Out
      </div> : <NavLink
        exact
        to="/login"
        className="ui item"
        activeClassName="ui active item"
      >
        Login
      </NavLink>}
    </div>
  );
};


const mapStateToProps = ({user}) => ({user})

export default connect(mapStateToProps, {logoutUser})(NavBar);
