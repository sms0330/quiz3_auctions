
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
            <NavLink exact to="/" className="item right menu">Home</NavLink>
            <NavLink exact to="/auctions" className="item">Auctions</NavLink>
            <NavLink exact to="/auctions/new" className="item">New</NavLink>
            <NavLink exact to="sign_up" className="item">Sign Up</NavLink>
            {!currentUser && (
                <NavLink exact to="/sign_in" className="item">Sign In</NavLink>
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
    </nav>
  );
}