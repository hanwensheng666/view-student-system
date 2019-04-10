import {
  Form,Icon, Input, Button,Row,Col,Cascader ,message,Radio  
} from 'antd';
import React, { Component } from 'react'
import './ModifyStudent.scss'
import {getAllClassByGrade} from '@/api/class'
import { getStudentByClass,modifyStudent } from '@/api/user'
const RadioGroup = Radio.Group;
class ModifyStudent extends Component {
  state = {
    options:[{
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
    },{
      value: '2014',
      label: '2014',
      isLeaf: false,
    }],
    sex:'1',
    tel:'',
    name:'',
    userNo:'',
    class:''
  }
  componentWillMount(){
    let stu = {
      _id:'',
      sex:'',
      tel:'',
      name:'',
      userNo:'',
      class:'',
      initClass:{}
    }
    if(this.props.location.state && this.props.location.state.stu){
      stu = this.props.location.state.stu;
    }
    this.setState({
      _id:stu._id,
      sex:stu.sex,
      tel:stu.tel,
      name:stu.name,
      userNo:stu.userNo,
      class:stu.class._id,
      initClass:stu.class
    })
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
  async modifyStudent(){
    let data = {
      _id:this.state._id,
      sex:this.state.sex,
      tel:this.state.tel,
      name:this.state.name,
      userNo:this.state.userNo,
      class:this.state.class
    }
    let res = await modifyStudent(data)
    if(res){
      if(res.code === 0){
        message.success('学生信息修改成功！');
        this.props.history.go(-1)
      }else{
        message.error(res.msg);
      }
    }
  }
  render() {
    return (
      <div className="modify-student">
        <Row>
          <Col span={9} offset={7}>
            <h3 className="modify-student__title">
              编辑学生信息
            </h3>
          </Col>
        </Row>
        <Row>
          <Col span={9} offset={7}>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item>
                <Input name='name' value={this.state.name} onChange={this.handleChange.bind(this)} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="学生姓名" />
              </Form.Item>
              <Form.Item>
                <RadioGroup name='sex' onChange={this.handleChange.bind(this)} value={this.state.sex}>
                  <Radio value={1}>男</Radio>
                  <Radio value={0}>女</Radio>
                </RadioGroup>
              </Form.Item>
              <Form.Item>
                <Input name='userNo' value={this.state.userNo} onChange={this.handleChange.bind(this)} prefix={<Icon type="solution" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="学号" />
              </Form.Item>
              <Form.Item>
                <Input name='tel' value={this.state.tel} onChange={this.handleChange.bind(this)} prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="联系电话" />
              </Form.Item>
              <Form.Item>
                <Cascader
                  options={this.state.options}
                  loadData={this.loadData}
                  onChange={this.pickClass}
                  changeOnSelect
                  placeholder={this.state.initClass.classNo || "请选择所在班级"}
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" size='large' ghost onClick={this.modifyStudent.bind(this)}>
                  确认修改
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

const WrappedModifyStudentForm = Form.create({ name: 'time_related_controls' })(ModifyStudent);

export default WrappedModifyStudentForm;