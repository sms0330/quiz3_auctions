
import React from 'react';
import { NavLink } from 'react-router-dom';
import './assets/bootstrap.min.css';

export function NavBar(props) {
  const { currentUser, onSignOut } = props;
  const handleSignOutClick = event => {
    event.preventDefault();

    if (typeof onSignOut === 'function') {
      onSignOut();
    }
  };
  return (
    <nav
      class="navbar navbar-light bg-light"
    >
      <NavLink to="/">Home</NavLink>
      <NavLink to="/auctions">Auctions</NavLink>

      {currentUser ? (
        <>
          <span>Welcome {currentUser.first_name + ' ' + currentUser.last_name}</span>
          <a href="#sign_out" onClick={handleSignOutClick}>
            Sign Out
          </a>
          <NavLink to="/auctions/new">New auction</NavLink>
        </>
      ) : (
        <>
          <NavLink to="/sign_in">Sign In</NavLink>
          <NavLink to="sign_up">Sign Up</NavLink>
        </>
      )}
    </nav>
  );
}