
import React, { Component } from 'react'
import {Switch,Route} from 'react-router-dom'
import Loadable from 'react-loadable';
import PageHolder from '@/components/common/PageHolder'

const CreateAct = Loadable({
  loader: () => import('@/containers/ActManage/CreateAct/CreateAct'),
  loading: PageHolder
});
class Index extends Component{
  render(){
    return (
      <Switch>
        <Route path="/act-manage/create-act" component={CreateAct} />
				{/* <Route path="/society-manage/manage-soc" component={SocietyList} />
        <Route path="/society-manage/modify-society" component={ModifySociety} /> */}
      </Switch>
    )
  }
}

export default Index;