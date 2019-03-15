import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'

import './App.css';
import Layout from './layout';

import { Provider } from 'react-redux';
import store from './redux/store'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
