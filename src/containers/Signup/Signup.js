
import {
  Table, Tag,Popconfirm,message,Cascader,Icon
} from 'antd';
import React, { Component } from 'react'
import './Signup.scss'
import {removeStudentById} from '@/api/user'
import {getSocietyList} from '@/api/society'
import {
  getAllActivityAndQuerySignIn,
  signOut,
} from '@/api/activity'

class StudentList extends Component{
  state = {
    
    options:[],
    actList:[],
    class:'',
    soc:'all',
  }
  columns = [{
    title: '活动名称',
    dataIndex: 'activityName',
    key: 'activityName',
    width:150
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
  },{
    title: '参与',
    dataIndex: 'isSignIn',
    key: 'isSignIn',
    width:150,
    render:isSignIn=>isSignIn?'已报名':''
  }, {
    title: '操作',
    key: 'action',
    render: act => {
      return (
        <>
          <Tag onClick={()=>{this.edit(act)}} color='geekblue' key={act._id+'1'}>查看详情</Tag>
          {act.isSignIn&&(<Popconfirm title={`确定要取消参加${act.activityName}?`} onConfirm={()=>{this.remove(act)}} okText="确认" cancelText="取消">
            <Tag color='red' key={act._id+'2'}>取消报名</Tag>
          </Popconfirm>)}
        </>
      )
    },
    width:150
  }]
  
  componentWillMount(){
    this.getSocietyLists()
    this.getActs()
  }
  async getSocietyLists(){
    let res = await getSocietyList();
    if(res && res.code === 0){
     
      let societyList = res.results;
      let options = societyList.map(item=>{
        return {
          value: item._id,
          label: item.societyName,
          soc:item,
          isLeaf: true,
        }
      })
      options.unshift({
        value: 'all',
        label: '全部社团',
        soc:{},
        isLeaf: true,
      })
      this.setState({options})
    }
  }
  
  edit(act){
    this.props.history.push('/act-detial',{act})
  }
  remove(stu){
    this.removeStudentById(stu._id)
    this.getActs()
  }
  pickSoc = (value) => {
    this.setState({
      soc:value[value.length-1]
    },()=>{
      this.getActs()
    })
  }
  async getActs() {
    let res = await getAllActivityAndQuerySignIn(this.state.soc)
    if (res && res.code === 0) {
      let actList = res.results.map(item => {
        item.key = item._id;
        return item
      })
      this.setState({actList})
    }
  }
  
  async removeStudentById(_id){
    let res = await signOut({actId:_id})
    if(res && res.code === 0){
      message.success('取消报名成功！');
      this.getActs()
    }else{
      message.error(res.msg);
    }
  }
  
  
  render(){
    let actList = this.state.actList
    return (
      <div className="society-list">
        <div className="society-list__cascader">
          <Cascader
            options={this.state.options}
            onChange={this.pickSoc}
            changeOnSelect
            placeholder="请选择社团"
          />
        </div>
        <div className="society-list__table">
          <Table 
            align='center' 
            pagination={{
              hideOnSinglePage:true,
              defaultPageSize:10,
              defaultCurrent:1,
              current:1,
              total:25,
              pageSizeOptions:['10']
            }}
            columns={this.columns} 
            dataSource={actList}
            scroll={{ y: 400 }}
          />
        </div>
      </div>
    )
  }
}

export default StudentList;