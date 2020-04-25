import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AdminSignIn from './AdminSignIn';
import AdminHome from './AdminHome';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Home from './Home';
import LinkAnalytics from './LinkAnalytics';
import RedirectionPage from './RedirectionPage';
import './App.css';

export default class  App extends Component {
  constructor() {
    super();

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      email: ""
    }

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
  }

  // Method name should change... I use it both in the sign up and the sign in
  handleSuccessfulAuth(data) {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      email: data     
    })
  }

  render() {
    return (
      <div >
        <Router>
          <Switch >
          <Route 
              exact path="/redirection/:hash" 
              component={RedirectionPage} 
            />
            <Route 
              exact path="/asignin" 
              component={AdminSignIn} 
            />
            <Route 
              exact path="/ahome" 
              component={AdminHome} 
            />
            <Route 
              exact path="/" 
              render={ props => (
                  <SignIn {...props} handleSuccessfulAuth={this.handleSuccessfulAuth} loggedInStatus={this.state.loggedInStatus}/>
                )
              }
            />
            <Route 
              exact path="/signin" 
              render={ props => (
                  <SignIn {...props} handleSuccessfulAuth={this.handleSuccessfulAuth} loggedInStatus={this.state.loggedInStatus}/>
                )
              }
            />
            <Route 
              exact path="/signup" 
              render={ props => (
                <SignUp {...props} handleSuccessfulAuth={this.handleSuccessfulAuth} />
              )}
            />
            <Route 
              exact path="/home" 
              render={ props => (
                  <Home email={this.state.email}/>
                )
              }
            />
            <Route 
              exact path="/analytics" 
              render={ props => ( 
                <LinkAnalytics email={this.state.email} />
               )
              }
            />
          </Switch>
        </Router>
        
      </div>
    );
  }  
}


