import {
  Form,Icon, Input, DatePicker,TimePicker, Button,Row,Col,Cascader ,message
} from 'antd';
import React, { Component } from 'react'
import './ModifyAct.scss'
import { getSocietyList } from '@/api/society'
import {
  createActApi,
  editAct
} from '@/api/activity'
class ModifyStudent extends Component {
  state = {
    options:[],
    _id:'',
    activityCredit:'',
    activityIntroduction:'',
    activityName:'',
    activityOrganizer:'',
    society:'',
    initClass:{}
  }
  componentWillMount(){
    let stu = {
      _id:'',
      activityCredit:'',
      activityIntroduction:'',
      activityName:'',
      activityOrganizer:'',
      society:'',
      activityTime:'',
      initClass:{}
    }
    if(this.props.location.state && this.props.location.state.stu){
      stu = this.props.location.state.stu;
    }
    this.setState({
      _id:stu._id,
      activityCredit:stu.activityCredit,
      activityIntroduction:stu.activityIntroduction,
      activityName:stu.activityName,
      activityOrganizer:stu.activityOrganizer,
      society:stu.society,
      activityTime:stu.activityTime.trim().split(" ")[0],
      activityTime1:stu.activityTime.trim().split(" ")[1],
      initClass:{}
    })
  
    this.getSocietyLists()
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
      this.setState({options})
    }
  }
  
  
  
  
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
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
  DatePick(date,dateString){
    this.setState({
      activityTime:dateString
    })
  }
  TimePick(time,timeString){
    this.setState({
      activityTime1:timeString
    })
  }
  
  pickSociety = (value,soc) => {
    this.setState({
      society:value[value.length-1],
      orzOption:[]
    },()=>{
      let orzOption = [
        {
          value:soc[0].soc.president._id,
          label:soc[0].soc.president.name,
        },
        {
          value:soc[0].soc.vicePresident._id,
          label:soc[0].soc.vicePresident.name,
        }
      ]
      this.setState({orzOption})
    })
  }
  
  async createAct(){
    let data = {
      activityTime:this.state.activityTime+' '+this.state.activityTime1,
      society:this.state.society,
      activityName:this.state.activityName,
      activityCredit:this.state.activityCredit,
      activityIntroduction:this.state.activityIntroduction,
      activityOrganizer:this.state.activityOrganizer
    }
    let res = await editAct(data)
    if(res){
      if(res.code === 0){
        message.success('修改活动成功！');
        this.props.history.push('/act-manage/act-list')
      }else{
        message.error(res.msg);
      }
    }
  }
  
  
  render() {
    return (
      <div className="modify-act">
        <Row>
          <Col span={9} offset={7}>
            <h3 className="modify-act__title">
              编辑活动信息
            </h3>
          </Col>
        </Row>
        <Row>
          <Col span={9} offset={7}>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item>
                <Input name='activityName' value={this.state.activityName} onChange={this.handleChange.bind(this)} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="活动名称" />
              </Form.Item>
              <Form.Item>
                <DatePicker   onChange={this.DatePick.bind(this)} placeholder={this.state.activityTime   || "请选择活动开始日期" }/>
              </Form.Item>
              <Form.Item>
                <TimePicker onChange={this.TimePick.bind(this)} placeholder={this.state.activityTime1   || "活动时间" }/>
              </Form.Item>
              <Form.Item>
                <Input name='activityCredit' type='number'   value={this.state.activityCredit}   onChange={this.handleChange.bind(this)} prefix={<Icon type="database" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="活动学分" />
              </Form.Item>
              <Form.Item>
                <Cascader
                  options={this.state.options}
                  loadData={this.loadData}
                  onChange={this.pickSociety}
                  changeOnSelect
                  placeholder={this.state.society.societyName || "请选择活动组织社团" }
                />
              </Form.Item>
              <Form.Item>
                <Cascader
                  options={this.state.orzOption}
                  onChange={this.pickActivityOrganizer}
                  changeOnSelect
                  placeholder={(this.state.activityOrganizer&&this.state.activityOrganizer.name) || "请选择活动负责人" }
                />
              </Form.Item>
              <Form.Item>
                <Input.TextArea
                  autosize={{ minRows: 4, maxRows: 10 }}
                  name="activityIntroduction"
                  value={this.state.activityIntroduction}
                  onChange={this.handleChange.bind(this)}
                  placeholder="编写活动介绍"
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" size='large' ghost onClick={this.createAct.bind(this)}>
                  修改活动
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