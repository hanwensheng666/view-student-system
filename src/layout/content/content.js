import React, { Component } from 'react'
import { Layout } from 'antd';
import { Route,Switch } from 'react-router-dom'

import ComponentManagement from '../../containers/ComponentManagement/ComponentManagement.jsx'
import ChannelManagement from '../../containers/ChannelManagement/ChannelManagement.jsx'
import PageManagement from '../../containers/PageManagement/PageManagement.jsx'
import Login from '../../containers/Login/Login.jsx'
import Regist from '../../containers/regist/regist.jsx'



const { Content } = Layout;

class MyPage extends Component {
  render() {
	return (
		<Content style={{ margin: '0 16px' }}>
			<Switch>
				<Route path="/channelManagement" component={ChannelManagement} />
				<Route path="/pageManagement" component={PageManagement} />
				<Route path="/login" component={Login} />
				<Route path="/regist" component={Regist} />
				<Route path="/componentManagement" component={ComponentManagement} />
			</Switch>
	  </Content> 
	)
  }
}


export default MyPage