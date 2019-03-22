
import React, { Component } from 'react'
import {Switch,Route} from 'react-router-dom'
import Loadable from 'react-loadable';
import PageHolder from '@/components/common/PageHolder'

const CreateSociety = Loadable({
  loader: () => import('@/containers/SocietyManage/CreateSociety/CreateSociety'),
  loading: PageHolder
});
const SocietyList = Loadable({
  loader: () => import('@/containers/SocietyManage/SocietyList/SocietyList'),
  loading: PageHolder
});
const ModifySociety = Loadable({
  loader: () => import('@/containers/SocietyManage/ModifySociety/ModifySociety'),
  loading: PageHolder
});
class Index extends Component{
  render(){
    return (
      <Switch>
        <Route path="/society-manage/create-soc" component={CreateSociety} />
				<Route path="/society-manage/manage-soc" component={SocietyList} />
        <Route path="/society-manage/modify-society" component={ModifySociety} />
      </Switch>
    )
  }
}

export default Index;