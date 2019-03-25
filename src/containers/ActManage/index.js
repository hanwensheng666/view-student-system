
import React, { Component } from 'react'
import {Switch,Route} from 'react-router-dom'
import Loadable from 'react-loadable';
import PageHolder from '@/components/common/PageHolder'

const CreateAct = Loadable({
  loader: () => import('@/containers/ActManage/CreateAct/CreateAct'),
  loading: PageHolder
});
const ActList = Loadable({
  loader: () => import('@/containers/ActManage/ActList/ActList'),
  loading: PageHolder
});
const ModifyAct = Loadable({
  loader: () => import('@/containers/ActManage/ModifyAct/ModifyAct'),
  loading: PageHolder
});


class Index extends Component{
  render(){
    return (
      <Switch>
        <Route path="/act-manage/create-act" component={CreateAct} />
				 <Route path="/act-manage/act-list" component={ActList} />
        <Route path="/act-manage/modify-act" component={ModifyAct} />
      </Switch>
    )
  }
}

export default Index;