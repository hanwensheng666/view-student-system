
import React, { Component } from 'react'
import {Switch,Route} from 'react-router-dom'
import Loadable from 'react-loadable';
import PageHolder from '@/components/common/PageHolder'

const RegistStudent = Loadable({
  loader: () => import('@/containers/StudentManage/RegistStudent/RegistStudent'),
  loading: PageHolder
});
const StudentList = Loadable({
  loader: () => import('@/containers/StudentManage/StudentList/StudentList'),
  loading: PageHolder
});
const ModifyStudent = Loadable({
  loader: () => import('@/containers/StudentManage/ModifyStudent/ModifyStudent'),
  loading: PageHolder
});
class Index extends Component{
  render(){
    return (
      <Switch>
				<Route path="/student-manage/regist-student" component={RegistStudent} />
        <Route path="/student-manage/student-info" component={StudentList} />
        <Route path="/student-manage/modify-student" component={ModifyStudent} />
      </Switch>
    )
  }
}

export default Index;