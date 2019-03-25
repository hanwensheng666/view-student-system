import {
  Form,Icon, Input, DatePicker, TimePicker, Button,Row,Col,Checkbox,Cascader,Select
} from 'antd';

import React, { Component } from 'react'
import {getAllClassByGrade} from '@/api/class'


import './ActManage.scss'




class ActManage extends Component{
  state = {
    value:'',
    options:[{
      value: '2016',
      label: '2016',
      isLeaf: false,
    }, {
      value: '2015',
      label: '2015',
      isLeaf: false,
    }, {
      value: '2014',
      label: '2014',
      isLeaf: false,
    }, {
      value: '2013',
      label: '2013',
      isLeaf: false,
    }]
  }
  componentWillMount(){
  
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  async getAllClassByGrade(grade){
    let res = await getAllClassByGrade(grade)
    return res.results
  }
  loadData = async (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    let stuList =  await this.getAllClassByGrade(selectedOptions[0].value)
    targetOption.loading = true;
    if(stuList){
      targetOption.loading = false;
      targetOption.children = stuList.map(item=>{
        return {
          label: item.classNo,
          value: item._id,
          isLeaf: false
        }
      });
      this.setState({
        options: [...this.state.options],
      });
    }
  }
  handleChange(value){
    this.setState({
      value
    })
  }
  
  render() {
    const Option = Select.Option;
    return (
      <div className="manage">
        <Row>
          <Col span={8} offset={8}>
            <h3 className="manage__title">
              创建社团活动
              <span className="manage__title__desc">(仅限教师操作)</span>
            </h3>
          </Col>
        </Row>
        <Row>
          <Col span={8} offset={8}>
            <Select
              className="select_way"
              defaultValue={'请选择'}
              onChange={this.handleChange.bind(this)}
              >
              <Option value="请选择">444</Option>
              <Option value="请选择">5255</Option>
              <Option value="请选择">5255</Option>
            </Select>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ActManage;
