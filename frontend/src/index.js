import React from 'react';
import { render } from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Login from './Components/Login';
import SignUp from "./Components/SignUp";
//define routes of the app
const App = () => (
  <HashRouter> 
    <Switch>
      <Route path='/Login' component={Login} exact/>
      <Route path='/SignUp' component={SignUp} exact/>
    </Switch>
  </HashRouter>
);

render(<App />, document.getElementById('root'));