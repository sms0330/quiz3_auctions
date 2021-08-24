import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AuctionNewPage } from './components/AuctionNewPage';
import { AuctionShowPage } from './components/AuctionShowPage';
import { AuctionIndexPage } from './components/AuctionIndexPage';
import { WelcomePage } from './components/WelcomePage.js';
import { SignInPage } from './components/SignInPage';
import { NotFoundPage } from './components/NotFoundPage';
import { NavBar } from './components/NavBar';
import { User } from './requests';
import { Session } from './requests';
import { AuthRoute } from './components/AuthRoute';
import { Spinner } from './Spinner';


class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        currentUser: null,
        loading: false,
      };
    }
    getUser = () => {
      User.current()
        .then(data => {
          if (typeof data.id !== 'number') {
            this.setState({ loading: false });
          } else {
            this.setState({ loading: false, currentUser: data });
          }
        })
        .catch(() => {
          this.setState({ loading: false });
        });
    };
    signOut = () => {
      Session.destroy().then(() => {
        this.setState({
          currentUser: null,
        });
      });
    };
    componentDidMount() {
      this.getUser();
    }

    render() {
        const { loading, currentUser } = this.state;
        if (loading) {
          return <Spinner />;
        }
    return (
        <BrowserRouter>
            <div id="site-container">
            <header>
                <NavBar 
                currentUser={currentUser} 
                onSignOut={this.signOut} 
                />
            </header>
            <Switch>
                <Route exact path="/" component={WelcomePage} />
                <Route exact path="/auctions" component={AuctionIndexPage} />
                <AuthRoute 
                    isAllowed={!!currentUser}
                    component={AuctionNewPage}
                    path = "/auctions/new"
                    exact
                />
                <AuthRoute 
                    isAllowed={!!currentUser}
                    component={AuctionShowPage}
                    path="/auctions/:id"
                />
                <Route 
                    path="/sign_in"
                    render={routeProps => (
                        <SignInPage {...routeProps} onSignIn={this.getUser} />
                    )}  
                />
                <Route component={NotFoundPage} />
            </Switch>
            </div>
        </BrowserRouter>
    );
};
}

export default App;