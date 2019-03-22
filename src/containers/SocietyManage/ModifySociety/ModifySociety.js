import {
  Form,Icon, Input, DatePicker, TimePicker, Button,Row,Col,Checkbox,Cascader ,message
} from 'antd';
import React, { Component } from 'react'
import './ModifySociety.scss'
import {getAllClassByGrade} from '@/api/class'
import { getStudentByClass } from '@/api/user'
import {editSocietyApi} from '@/api/society'
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

class ModifySociety extends Component {
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
    }],
    president:'',
    societyFoundingTime:'',
    societyIntroduction:'',
    societyName:'',
    vicePresident:''
  }
  componentWillMount(){
    let {soc} = this.props.location.state
    this.setState({
      _id:soc._id,
      president:soc.president?soc.president._id:'',
      societyFoundingTime:soc.societyFoundingTime,
      societyIntroduction:soc.societyIntroduction,
      societyName:soc.societyName,
      vicePresident:soc.vicePresident?soc.vicePresident._id:'',
      vicePresidentName:soc.vicePresident?soc.vicePresident.name:'',
      presidentName:soc.president?soc.president.name:'',
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
    if(selectedOptions.length === 1){
      let classList =  await this.getAllClassByGrade(selectedOptions[selectedOptions.length - 1].value)
      if(classList){
        targetOption.loading = false;
        targetOption.children = classList.map(item=>{
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
    if(selectedOptions.length === 2){
      let stuList =  await this.getStudentByClass(selectedOptions[selectedOptions.length - 1].value)
      if(stuList){
        targetOption.loading = false;
        targetOption.children = stuList.map(item=>{
          return {
            label: item.name,
            value: item._id,
          }
        });
        this.setState({
          options: [...this.state.options],
        });
      }
    }
  }
  handleChange(e){
    this.setState({
      [e.target.name]:e.target.value
    })
  }
  DatePick(date,dateString){
    this.setState({
      societyFoundingTime:dateString
    })
  }
  pickPresident = (value) => {
    this.setState({
      president:value[value.length-1]
    })
  }
  pickVicePresident = (value) => {
    this.setState({
      vicePresident:value[value.length-1]
    })
  }
  async editSociety(){
    let data = {
      _id:this.state._id,
      president:this.state.president,
      societyFoundingTime:this.state.societyFoundingTime,
      societyIntroduction:this.state.societyIntroduction,
      societyName:this.state.societyName,
      vicePresident:this.state.vicePresident
    }
    let res = await editSocietyApi(data)
    if(res){
      if(res.code === 0){
        message.success('修改社团成功！');
        this.props.history.push('/society-manage/manage-soc')
      }else{
        message.error(res.msg);
      }
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="society-modify">
        <Row>
          <Col span={9} offset={7}>
            <h3 className="society-modify__title">
              修改社团信息
              <span className="society-modify__title__desc">(仅限教师操作)</span>
            </h3>
          </Col>
        </Row>
        <Row>
          <Col span={9} offset={7}>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item>
                <Input name='societyName' value={this.state.societyName} onChange={this.handleChange.bind(this)} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="社团名称" />
              </Form.Item>
              <Form.Item>
                <DatePicker  onChange={this.DatePick.bind(this)} placeholder={this.state.societyFoundingTime || ''} />
              </Form.Item>
              <Form.Item>
                <Cascader
                  options={this.state.options}
                  loadData={this.loadData}
                  onChange={this.pickPresident}
                  changeOnSelect
                  placeholder={this.state.presidentName}
                />
              </Form.Item>
              <Form.Item>
                <Cascader
                  options={this.state.options}
                  loadData={this.loadData}
                  onChange={this.pickVicePresident}
                  changeOnSelect
                  placeholder={this.state.vicePresidentName}
                />
              </Form.Item>
              <Form.Item>
                <Input.TextArea 
                  value={this.state.societyIntroduction}
                  autosize={{ minRows: 4, maxRows: 10 }}
                  name="societyIntroduction" 
                  onChange={this.handleChange.bind(this)}  
                  placeholder="编写社团简介"
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" size='large' ghost onClick={this.editSociety.bind(this)}>
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

const WrappedModifySocietyForm = Form.create({ name: 'time_related_controls' })(ModifySociety);

export default WrappedModifySocietyForm;