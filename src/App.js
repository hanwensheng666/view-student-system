import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'
import { Route,Switch } from 'react-router-dom'
import Login from '@/containers/Login/Login.jsx'
import Regist from '@/containers/regist/regist.jsx'
import './App.css';
import Layout from './layout';

import { Provider } from 'react-redux';
import store from './redux/store'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/regist" component={Regist} />
            <Route path="/" component={Layout} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
