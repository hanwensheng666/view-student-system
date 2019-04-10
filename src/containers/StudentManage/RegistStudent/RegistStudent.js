import {
  Form,Icon, Input, Button,Row,Col,Cascader ,message,Radio  
} from 'antd';
import React, { Component } from 'react'
import './RegistStudent.scss'
import {getAllClassByGrade} from '@/api/class'
import { getStudentByClass,regist } from '@/api/user'
const RadioGroup = Radio.Group;
class RegistStudent extends Component {
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
    sex:'1',
    password:'',
    tel:'',
    name:'',
    userNo:'',
    class:''
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
  async getStudentByClass(classId){
    let res = await getStudentByClass(classId)
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
  handleChange(e){
    this.setState({
      [e.target.name]:e.target.value
    })
  }
  pickClass = (value) => {
    this.setState({
      class:value[value.length-1]
    })
  }
  async registStudent(){
    let data = {
      sex:this.state.sex,
      password:this.state.password,
      tel:this.state.tel,
      name:this.state.name,
      userNo:this.state.userNo,
      identity:0,
      class:this.state.class
    }
    let res = await regist(data)
    if(res){
      if(res.code === 0){
        message.success('学生信息录入成功！');
        // this.props.history.push('/society-manage/manage-soc')
      }else{
        message.error(res.msg);
      }
    }
  }
  render() {
    return (
      <div className="regist-student">
        <Row>
          <Col span={9} offset={7}>
            <h3 className="regist-student__title">
              学生信息录入
              <span className="regist-student__title__desc">(仅限教师操作)</span>
            </h3>
          </Col>
        </Row>
        <Row>
          <Col span={9} offset={7}>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item>
                <Input name='name' onChange={this.handleChange.bind(this)} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="学生姓名" />
              </Form.Item>
              <Form.Item>
                <RadioGroup name='sex' onChange={this.handleChange.bind(this)} value={this.state.sex}>
                  <Radio value={1}>男</Radio>
                  <Radio value={0}>女</Radio>
                </RadioGroup>
              </Form.Item>
              <Form.Item>
                <Input name='userNo' onChange={this.handleChange.bind(this)} prefix={<Icon type="solution" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="学号" />
              </Form.Item>
              <Form.Item>
                <Input name='password' onChange={this.handleChange.bind(this)} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="登录密码" />
              </Form.Item>
              <Form.Item>
                <Input name='tel' onChange={this.handleChange.bind(this)} prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="联系电话" />
              </Form.Item>
              <Form.Item>
                <Cascader
                  options={this.state.options}
                  loadData={this.loadData}
                  onChange={this.pickClass}
                  changeOnSelect
                  placeholder="请选择所在班级"
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" size='large' ghost onClick={this.registStudent.bind(this)}>
                  创建
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

const WrappedRegistStudentForm = Form.create({ name: 'time_related_controls' })(RegistStudent);

export default WrappedRegistStudentForm;