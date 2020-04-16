import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
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
