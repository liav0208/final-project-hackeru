import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "./searchBar";


class Navbar extends Component {
  state = {};

  renderIfUserLog = (user) => {
    return (
      <React.Fragment>
        <li className="navbar__item ">
          <NavLink
            to="/user-management"
            className="navbar__link navbar__username"
          >
            <i className="fas fa-user"></i>
            {user.name}
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink className="navbar__link" to="/logout">
            <i className="fas fa-logout-alt"></i>
            Logout
          </NavLink>
        </li>
      </React.Fragment>
    );
  };

  renderIfNoUser = () => {
    return (
      <React.Fragment>
        <li className="navbar__item">
          <NavLink className="navbar__link" to="/signup-teacher">
            Teach with us
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink className="navbar__link" to="/signin">
            Sign in
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink className="navbar__link" to="/signup">
            Sign up
          </NavLink>
        </li>
      </React.Fragment>
    );
  };

  render() {
    const { user } = this.props;
    return (
      <nav className="navbar">
        <ul className="navbar__list-left">
          <li className="navbar__item">
            <NavLink className="navbar__link logo" to="/">
              Become A Prof
            </NavLink>
          </li>
          {user && (
            <React.Fragment>
              <li className="navbar__item">
                <NavLink className="navbar__link" to="/messages/inbox">
                  Messages
                </NavLink>
              </li>
              <li className="navbar__item">
                <NavLink className="navbar__link" to="/blog">
                  Blog
                </NavLink>
              </li>
            </React.Fragment>
          )}
        </ul>
        {user && <SearchBar />}
        <ul className="navbar__list-right">
          {!user && this.renderIfNoUser()}
          {user && this.renderIfUserLog(user)}
        </ul>
      </nav>
    );
  }
}

export default Navbar;
