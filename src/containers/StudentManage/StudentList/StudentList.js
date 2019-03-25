
import {
  Table, Tag,Popconfirm,message,Cascader,Icon
} from 'antd';
import React, { Component } from 'react'
import './StudentList.scss'
import {getStudentByClass,removeStudentById} from '@/api/user'
import {getAllClassByGrade} from '@/api/class'

class StudentList extends Component{
  state = {
    options:[{
      value: '2018',
      label: '2018',
      isLeaf: false,
    },{
      value: '2017',
      label: '2017',
      isLeaf: false,
    },{
      value: '2016',
      label: '2016',
      isLeaf: false,
    }, {
      value: '2015',
      label: '2015',
      isLeaf: false,
    }],
    studentList:[],
    class:''
  }
  columns = [{
    title: '学号',
    dataIndex: 'userNo',
    key: 'userNo',
    width:150
  }, {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    width:150
  }, {
    title: '性别',
    dataIndex: 'sex',
    key: 'sex',
    render:sex => sex===0?'女':'男',
    width:150
  },{
    title: '班级',
    dataIndex: 'class',
    key: 'class',
    render:classes => classes.classNo,
    width:150
  },{
    title: '电话',
    dataIndex: 'tel',
    key: 'tel',
    width:150
  }, {
    title: '操作',
    key: 'action',
    render: stu => {
      return (
        <>
          <Tag onClick={()=>{this.edit(stu)}} color='geekblue' key={stu._id+'1'}>编辑</Tag>
          <Popconfirm title={`确定要删除社团${stu.name}?`} onConfirm={()=>{this.remove(stu)}} okText="确认" cancelText="取消">
            <Tag color='red' key={stu._id+'2'}>删除</Tag>
          </Popconfirm>
        </>
      )
    },
    width:150
  }]
  edit(stu){
    this.props.history.push('/student-manage/modify-student',{stu})
  }
  remove(stu){
    this.removeStudentById(stu._id)
    this.getStudentByClass()
  }
  pickClass = (value) => {
    if(value.length === 2){
      this.setState({
        class:value[value.length-1]
      },()=>{
        this.getStudentByClass()
      })
    }
  }
  async removeStudentById(id){
    let res = await removeStudentById(id)
    if(res && res.code === 0){
      message.success('删除学生信息成功！');
    }else{
      message.error(res.msg);
    }
  }
  async getStudentByClass(){
    let res = await getStudentByClass(this.state.class);
    if(res&&res.code===0){
      let studentList = res.results.map(item=>{
        item.key = item._id;
        return item
      })
      this.setState({studentList})
    }
    
  }
  async getAllClassByGrade(grade){
    let res = await getAllClassByGrade(grade)
    return res.results
  }
  loadData = async (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    let classList =  await this.getAllClassByGrade(selectedOptions[selectedOptions.length - 1].value)
    if(classList){
      targetOption.loading = false;
      targetOption.children = classList.map(item=>{
        return {
          label: item.classNo,
          value: item._id,
          isLeaf:true
        }
      });
      this.setState({
        options: [...this.state.options],
      });
    }
  }
  render(){
    let studentList = this.state.studentList
    return (
      <div className="society-list">
        <div className="society-list__cascader">
          <Cascader
            options={this.state.options}
            loadData={this.loadData}
            onChange={this.pickClass}
            // prefix={<Icon type="idcard" style={{ color: 'rgba(0,0,0,.25)' }} />}
            changeOnSelect
            placeholder="请选择班级"
          />
        </div>
        <div className="society-list__table">
          <Table 
            align='center' 
            pagination={false} 
            columns={this.columns} 
            dataSource={studentList} 
            scroll={{ y: 400 }}
          />
        </div>
      </div>
    )
  }
}

export default StudentList;