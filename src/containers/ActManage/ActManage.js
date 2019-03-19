import {
  Form,Icon, Input, DatePicker, TimePicker, Button,Row,Col,Checkbox,Cascader,Select
} from 'antd';
import React, { Component } from 'react'
import {getAllClassByGrade} from '@/api/class'


import './ActManage.scss'


const Option = Select.Option;


class ActManage extends Component{
  state = {
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
      console.log(stuList)
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
  DatePick(date,dateString){
    console.log(date,dateString)
  }
  pickStu = (value, selectedOptions) => {
    console.log(value, selectedOptions);
  }
  handleChange(){
  
  }
  
  render() {
    const { getFieldDecorator } = this.props.form;
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
            <Form onSubmit={this.handleSubmit} className="login-form">
              
              <Select defaultValue="lucy" style={{ width: 120 }} loading>
                <Option value="lucy">Lucy</Option>
              </Select>
              
              <Select
                className="select_way"
                defaultValue={'请选择'}
                onChange={this.handleChange.bind(this)}>
                {
                  this.clubNames.length > 0 && clubNames.map((item,index)=>{
                  
                  })
                }
                <Option value="请选择">请选择</Option>
              </Select>
              
              
              
             {/* <Form.Item>
                {getFieldDecorator('userName', {
                  rules: [{ required: true, message: '请设置社团名称' }],
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="社团名称" />
                )}
              </Form.Item>
              <Form.Item>
                <DatePicker onChange={this.DatePick.bind(this)} placeholder="请选择社团成立时间" />
              </Form.Item>
              <Form.Item>
                <Cascader
                  options={this.state.options}
                  loadData={this.loadData}
                  onChange={this.pickStu}
                  changeOnSelect
                />
              </Form.Item>*/}
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}
const WrappedActManageForm = Form.create({ name: 'time_related_controls' })(ActManage);

export default WrappedActManageForm;
