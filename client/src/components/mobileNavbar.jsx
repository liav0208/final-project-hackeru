import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "./searchBar";

const MobileNavbar = ({ user }) => {
  let [active, setActive] = useState(false);
  let [activeSearch, setSearch] = useState(false);

  const userLogOff = function () {
    return (
      <React.Fragment>
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
        <li className="navbar__item">
          <NavLink className="navbar__link" to="/signup-teacher">
            Teach with us
          </NavLink>
        </li>
      </React.Fragment>
    );
  };

  const userLogIn = function () {
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
          <NavLink className="navbar__link" to="/messages/inbox">
            Messages
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink className="navbar__link" to="/blog">
            Blog
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

  const searchBar = function () {
    return (
      <li>
        <SearchBar />
      </li>
    );
  };

  return (
    <nav className="mobile-navbar">
      <ul className="navbar__list">
        {user && (
          <li className="navbar__item">
            <button
              className="navbar__search-btn"
              onClick={() => {
                setSearch((activeSearch = !activeSearch));
                setActive((active = false));
              }}
            >
              <i className="fas fa-search"></i>
            </button>
          </li>
        )}
        <li className="navbar__item">
          <NavLink className="navbar__link logo" to="/">
            Become A Prof
          </NavLink>
        </li>
        <li
          className="mobile-navbar__humburger"
          onClick={() => {
            setActive((active = !active));
            setSearch((activeSearch = false));
          }}
        >
          <div className={active ? "humburger active" : "humburger"}></div>
        </li>
      </ul>
      {activeSearch && <ul className="links__list">{searchBar()}</ul>}
      {active && (
        <ul className="links__list" onClick={() => setActive((active = false))}>
          {!user && userLogOff()}
          {user && userLogIn()}
        </ul>
      )}
    </nav>
  );
};

export default MobileNavbar;
