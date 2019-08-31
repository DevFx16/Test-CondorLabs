import React from 'react';
import { render } from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Home from './Components/Home';

//define routes of the app
const User = JSON.parse(localStorage.getItem('User'));
const App = () => (
  <HashRouter>
    <Switch>
      {User == null ? <Route path='/Login' component={Login} exact /> : null}
      {User == null ? <Route path='/SignUp' component={SignUp} exact /> : null}
      {User != null ? <Route path='/Home' component={Home} exact /> : null}
      <Route component={User != null ? Home : Login} exact />
    </Switch>
  </HashRouter>
);

render(<App />, document.getElementById('root'));