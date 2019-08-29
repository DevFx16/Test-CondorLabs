import React from 'react';
import { render } from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Login from './Components/Login';
import SignUp from "./Components/SignUp";
import Home from './Components/Home';

//define routes of the app
const App = () => (
  <HashRouter> 
    <Switch>
      <Route path='/Login' component={Login} exact/>
      <Route path='/SignUp' component={SignUp} exact/>
      <Route path='/Home' component={Home} exact/>
    </Switch>
  </HashRouter>
);

render(<App />, document.getElementById('root'));