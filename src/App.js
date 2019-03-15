import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'
import { Route,Switch } from 'react-router-dom'
import Login from '@/containers/Login/Login.jsx'
import '@/static/scss/common.scss';
import Layout from './layout';
import PrivateRoute from '@/components/common/PrivateRoute'
import { Provider } from 'react-redux';
import store from './store/index'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path="/login" component={Login} />
            <PrivateRoute path="/" component={Layout} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
