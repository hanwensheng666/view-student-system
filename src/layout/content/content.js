import React, { Component } from 'react'
import { Layout } from 'antd';
import { Route,Switch } from 'react-router-dom'
import PrivateRoute from '@/components/common/PrivateRoute'
import Mine from '@/containers/Mine/Mine'
import Overview from '@/containers/Overview/Overview'
import Competition from '@/containers/Competition/Competition'
import ActManage from '@/containers/ActManage/ActManage'
import Signup from '@/containers/Signup/Signup'
import { IDENTITY } from '@/basic/config/identity'



const { Content } = Layout;

class MyPage extends Component {
  render() {
	return (
		<Content style={{ margin: '0 16px' }}>
			<Switch>
				<Route path="/overview" component={Overview} />
				<Route path="/signup" component={Signup} />
				<Route path="/competition" component={Competition} />
        <PrivateRoute verifiy={IDENTITY.MANAGER}  path='/act-manage'  component={ActManage} />
        <Route path='/mine'  component={Mine}></Route>
			</Switch>
	  </Content> 
	)
  }
}


export default MyPage