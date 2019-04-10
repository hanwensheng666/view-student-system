
import {
  Table, Tag,Popconfirm,message,Cascader
} from 'antd';
import React, { Component } from 'react'
import './ActList.scss'

import {getSocietyList} from '@/api/society'
import {
  getAct,
  deleteAct
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
  }, {
    title: '操作',
    key: 'action',
    render: stu => {
      return (
        <>
          <Tag onClick={()=>{this.edit(stu)}} color='geekblue' key={stu._id+'1'}>编辑</Tag>
          <Popconfirm title={`确定要删除活动${stu.activityName}?`} onConfirm={()=>{this.remove(stu)}} okText="确认" cancelText="取消">
            <Tag color='red' key={stu._id+'2'}>删除</Tag>
          </Popconfirm>
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
  
  edit(stu){
    this.props.history.push('/act-manage/modify-act',{stu})
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
    let res = await getAct(this.state.soc)
    if (res && res.code === 0) {
      let actList = res.results.map(item => {
        item.key = item._id;
        return item
      })
      this.setState({actList})
    }
  }
  
  async removeStudentById(_id){
    let res = await deleteAct({_id})
    if(res && res.code === 0){
      message.success('删除活动信息成功！');
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
              defaultPageSize:6,
              defaultCurrent:1,
              total:actList.length,
              pageSizeOptions:['6']
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