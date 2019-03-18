import React, { Component } from 'react'
import { Layout } from 'antd';
import { Route,Switch } from 'react-router-dom'
import PrivateRoute from '@/components/common/PrivateRoute'
import { IDENTITY } from '@/basic/config/identity'
import Loadable from 'react-loadable';
import PageHolder from '@/components/common/PageHolder'


const { Content } = Layout;

const Overview = Loadable({
  loader: () => import('@/containers/Overview/Overview'),
  loading: PageHolder
});
const Signup = Loadable({
  loader: () => import('@/containers/Signup/Signup'),
  loading: PageHolder
});
const ActManage = Loadable({
  loader: () => import('@/containers/ActManage/ActManage'),
  loading: PageHolder
});
const Mine = Loadable({
  loader: () => import('@/containers/Mine/Mine'),
  loading: PageHolder
});
const Competition = Loadable({
  loader: () => import('@/containers/Competition/Competition'),
  loading: PageHolder
});


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