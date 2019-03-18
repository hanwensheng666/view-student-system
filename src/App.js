import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'
import { Route,Switch } from 'react-router-dom'
import Login from '@/containers/Login/Login.jsx'
import '@/static/scss/common.scss';
import Layout from './layout';
import PrivateRoute from '@/components/common/PrivateRoute'
import { Provider } from 'react-redux';
import {store,persistor} from '@/store/index'
import { PersistGate } from 'redux-persist/integration/react';




class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Switch>
              <Route path="/login" component={Login} />
              <PrivateRoute path="/" component={Layout} />
            </Switch>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    );
  }
}
export default App;
