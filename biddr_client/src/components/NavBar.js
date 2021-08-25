
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
    <nav className="navbar navbar-light bg-light" >
            <div className="navbar-brand">Auctions</div>
            <span class="nav justify-content-end">
            <NavLink exact to="/" className="nav-item">Home</NavLink>
            <NavLink exact to="/auctions" className="nav-item">Auctions</NavLink>
            <NavLink exact to="/auctions/new" className="nav-item">New</NavLink>
            <NavLink exact to="sign_up" className="nav-item">Sign Up</NavLink>
            {!currentUser && (
                <NavLink exact to="/sign_in" className="nav-item">Sign In</NavLink>
            )}
            {currentUser && (
                <>
                    <div className="item">
                        Hello, {currentUser.full_name}
                    </div>
                    <button
                        className="ui inverted red button" 
                        onClick={handleSignOutClick}
                    >
                        Sign Out
                    </button>
                </>
            )}
            </span>
    </nav>
  );
}