import React, { Component } from 'react'
import { Layout } from 'antd';
import { Route,Switch,Redirect } from 'react-router-dom'
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
  loader: () => import('@/containers/ActManage/index'),
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
const SocietyManage = Loadable({
  loader: () => import('@/containers/SocietyManage/index'),
  loading: PageHolder
});

const StudentManage = Loadable({
  loader: () => import('@/containers/StudentManage/index'),
  loading: PageHolder
});
const ActDetial = Loadable({
  loader: () => import('@/containers/ActDetial/ActDetial'),
  loading: PageHolder
});
class Containers extends Component {
  render() {
	return (
		<Content style={{ margin: '0 16px' }}>
			<Switch>
				<Route path="/overview" component={Overview} />
				<Route path="/signup" component={Signup} />
				<Route path="/competition" component={Competition} />
				<Route path="/act-detial/:actId" component={ActDetial} />
        <PrivateRoute verifiy={IDENTITY.TEACHER_MANAGER}  path='/act-manage'  component={ActManage} />
        <PrivateRoute verifiy={IDENTITY.TEACHER}  path='/society-manage'  component={SocietyManage} />
        <PrivateRoute verifiy={IDENTITY.TEACHER}  path='/student-manage'  component={StudentManage} />
        <Route path='/mine'  component={Mine}></Route>
        <Redirect to="/overview" />
			</Switch>
	  </Content> 
	)
  }
}


export default Containers