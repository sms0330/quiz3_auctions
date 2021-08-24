import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import { NavBar } from './components/NavBar';
// import { AuthRoute } from './AuthRoute';
import { WelcomePage } from './components/WelcomePage';
import { AuctionIndexPage } from './components/AuctionIndexPage';
import { AuctionShowPage } from './components/AuctionShowPage';
import { Spinner } from './Spinner';

function App() {
  return (
    <BrowserRouter>
      <div id="site-container">
      <header>
          <NavBar 
          // currentUser={currentUser} 
          // onSignOut={this.signOut} 
          />
      </header>
      <Switch>
          <Route exact path="/" component={WelcomePage} />
          <Route exact path="/auctions" component={AuctionIndexPage} />
          <Route exact path="/auctions/:id" component={AuctionShowPage} />
      </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
