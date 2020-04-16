import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AdminSignIn from './AdminSignIn';
import AdminHome from './AdminHome';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Home from './Home';
import LinkAnalytics from './LinkAnalytics';
import './App.css';

function App() {
  return (
    <div >
      <Router>
        <Switch >
          <Route exact path="/asignin" component={AdminSignIn} />
          <Route exact path="/ahome" component={AdminHome} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/analytics" component={LinkAnalytics} />
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
