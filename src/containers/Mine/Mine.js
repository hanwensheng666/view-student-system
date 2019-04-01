import React, { Component } from 'react'
import './Mine.scss'

import { Avatar ,Table,Rate,message} from 'antd';
import {Link} from 'react-router-dom'
import {
  getActByUser,
  rateForAct
} from '@/api/activity'

import {getUserInfo} from '@/api/user'
class Mine extends Component{
  
  state = {
    options:[],
    actList:[],
    totalScore:'',
    soc:'all',
  }
  columns = [{
    title: '活动名称',
    dataIndex: 'activityName',
    key: 'activityName',
    width:150,
    render:(activityName,act)=>{
      return <Link to={`/act-detial/${act._id}`}>{activityName}</Link>
    }
  }, {
    title: '时间',
    dataIndex: 'activityTime',
    key: 'activityTime',
    width:150
  }, {
    title: '学分',
    dataIndex: 'activityCredit',
    key: 'activityCredit',
    width:150
  },{
    title: '活动组织社团',
    dataIndex: 'society.societyName',
    key: 'society.societyName',
    width:150
  },{
    title: '负责人',
    dataIndex: 'activityOrganizer.name',
    key: 'activityOrganizer.name',
    width:150
  }, {
    title: '评分',
    key: 'action',
    render: stu => {
      console.log(stu,'ds')
      return (
        <>
          {
            stu.myRate && stu.myRate!=='' ? (stu.myRate+'分') : <Rate
              onChange={this.num.bind(this,stu._id)}
              value={this.state['value'+stu._id]}
              allowHalf={true}
              allowClear={false}
            />
          }
        </>
      )
    },
    width:150
  }]
  
  componentWillMount(){
    this.getActs()
    this.info()
  }
  num(id,rate){
    
    let parameter={
      actId:id,
      rate:rate
    }
    this.rateForActs(parameter)
  }
  async rateForActs(item) {
   
    let res = await rateForAct(item)
    if (res && res.code === 0) {
      this.getActs()
      console.log(res,'345678')
    }
    if (res && res.code === 1) {
      message.success('您已经评过分啦！');
    }
  }
  async getActs() {
    let res = await getActByUser()
    if (res && res.code === 0) {
      let totalScore=res.results.totalScore
      let actList = res.results && res.results.actList.map(item => {
        this.setState({
          ['value'+item._id]:2.5
        })
        item.key = item._id;
        return item
      })
      console.log(res)
      this.setState({actList,totalScore})
    }
  }
  
  async info() {
    let res = await getUserInfo()
    if (res && res.code === 0) {
      let user=res.results
      let name=user.name
      let tel=user.tel
      let sex=user.sex
      let identity=user.identity
      let userNo=user.userNo
      let credit=user.credit
      let classNo=user.class?user.class.classNo : '非学生'
      this.setState({
        name, sex,tel,identity,userNo,classNo,credit
      })
    }
  }
  
  render() {
    let total = this.state.actList.length;
    return (
      <div className="mine-page">
        <h2 className="h2" >基本信息</h2>
        <div className="mine">
          <div className="mine__info">
            <div className="mine__info__type">
              <span className="mine__info__type__bold">姓名：</span>
              <span>{this.state.name}</span>
            </div>
            <div className="mine__info__type">
              <span className="mine__info__type__bold">性别：</span>
              <span>{this.state.sex ? '男' : '女'}</span>
            </div>
          </div>
          <div className="mine__info">
            <div className="mine__info__type">
              <span className="mine__info__type__bold">电话：</span>
              <span>{this.state.tel}</span>
            </div>
            <div className="mine__info__type">
              <span className="mine__info__type__bold">班级：</span>
              <span>{this.state.classNo}</span>
            </div>
          </div>
          <div className="mine__info">
            <div className="mine__info__type">
              <span className="mine__info__type__bold">学号：</span>
              <span>{this.state.userNo}</span>
            </div>
            <div className="mine__info__type">
              <span className="mine__info__type__bold">活动学分：</span>
              <span>{this.state.credit}</span>
            </div>
          </div>
        </div>
        <h2  className="h2">参加的活动</h2>
        <div className="content">
          <Table
            align='center'
            pagination={{
              hideOnSinglePage:true,
              defaultPageSize:5,
              defaultCurrent:1,
              total:this.state.actList.length,
              pageSizeOptions:['5']
            }}
            columns={this.columns}
            dataSource={this.state.actList}
            scroll={{ y: 400 }}
          />
        </div>
      </div>
     
      
      
    );
  }
}

export default Mine;