
import {
  Table, Divider, Tag,Popconfirm, message
} from 'antd';
import React, { Component } from 'react'
import './SocietyList.scss'
import {getSocietyList,removeSocietyById} from '@/api/society'


class SocietyList extends Component{
  state = {
    societyList:[]
  }
  columns = [{
    title: '社团名称',
    dataIndex: 'societyName',
    key: 'societyName',
  }, {
    title: '成立时间',
    dataIndex: 'societyFoundingTime',
    key: 'societyFoundingTime',
  }, {
    title: '社长',
    dataIndex: 'president',
    key: 'president',
    render:president=>president?president.name : '暂无'
  },{
    title: '副社长',
    dataIndex: 'vicePresident',
    key: 'vicePresident',
    render:vicePresident=>vicePresident?vicePresident.name : '暂无'
  },{
    title: '社团人数',
    dataIndex: 'member',
    key: 'member',
    render: member => member&&'0'+'人',
  }, {
    title: '操作',
    key: 'action',
    render: soc => {
      return (
        <>
          <Tag onClick={()=>{this.edit(soc)}} color='geekblue' key={soc._id+'1'}>编辑</Tag>
          <Popconfirm title={`确定要删除社团${soc.societyName}?`} onConfirm={()=>{this.remove(soc)}} okText="确认" cancelText="取消">
            <Tag color='red' key={soc._id+'2'}>删除</Tag>
          </Popconfirm>
        </>
      )
    },
  }]
  edit(soc){
    this.props.history.push('/society-manage/modify-society',{soc})
  }
  remove(soc){
    this.removeSocietyById(soc._id)
    this.getSocietyList()
  }
  async removeSocietyById(id){
    let res = await removeSocietyById({id})
  }
  componentWillMount(){
    this.getSocietyList()
  }
  async getSocietyList(){
    let res = await getSocietyList();
    if(res&&res.code===0){
      let societyList = res.results.map(item=>{
        item.key = item._id;
        return item
      })
      this.setState({societyList})
    }
    
  }
  render(){
    let societyList = this.state.societyList
    return (
      <div className="society-list">
        <Table 
          align='center' 
          pagination={false} 
          columns={this.columns} 
          dataSource={societyList} 
        />
      </div>
    )
  }
}

export default SocietyList;