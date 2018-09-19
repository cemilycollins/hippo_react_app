import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = props => {
  return (
    <div className="ui inverted menu navbar">
      <NavLink exact to="/" className="item">
        <h2 className="ui header">
          <i className="h square icon" />
          <div className="content">Hippo</div>
          <div className="ui sub header" style={{color: "white"}}> &nbsp; Find a hospital before you can say "Hippo!"</div>
        </h2>
      </NavLink>
      <NavLink
        exact
        to="/login"
        className="ui item"
        activeClassName="ui active item"
      >
        Login
      </NavLink>
    </div>
  );
};

// {props.user && props.user.name ? <NavLink id="nav-item"
//   exact
//   to="/profile"
//   className="ui item"
//   activeClassName="ui active item"
// >
//   Profile
// </NavLink> : null}
// {props.user && props.user.name ? <div className="ui button" onClick={props.logOut}>
//   Log Out
// </div> : null}

export default NavBar;
