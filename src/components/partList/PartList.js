import React, { Component } from 'react'
import { List } from 'antd';



export default class PartList extends Component{
  state = {
    data:[]
  }
  render(){
    let data = [];
    if(this.props.act.activityParticipate && this.props.act.activityParticipate.map){
      data = this.props.act.activityParticipate.map(item=>{
        return (
          <div style={{width:'100%',display:'flex',justifyContent:'space-between'}}>
            <div>{item.user.name}</div>
            <div>{item.user.class.classNo}</div>
          </div>
        )
      })
    }
    return (
      <div>
        <h3 style={{ margin: '16px 0' }}>参与人员名单</h3>
        <List
          size="small"
          bordered
          dataSource={data}
          renderItem={item => (<List.Item>{item}</List.Item>)}
        />
      </div>
    )
  }
}