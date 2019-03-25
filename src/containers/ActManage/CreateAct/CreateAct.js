import {
  Form,Icon, Input, DatePicker, Button,Row,Col,Cascader ,message,TimePicker
} from 'antd';
import React, { Component } from 'react'
import './CreateAct.scss'
import {getAllClassByGrade} from '@/api/class'
import { getStudentByClass } from '@/api/user'
import { getSocietyList } from '@/api/society'
import {createActApi} from '@/api/activity'
class CreateAct extends Component {
  state = {
    options:[],
    orzOption:[],
    activityTime:'',
    activityTime1:'',
    society:'',
    activityName:'',
    activityCredit:0,
    activityIntroduction:'',
    activityOrganizer:''
  }
  componentWillMount(){
    this.getSocietyList()
  }
  async getSocietyList(){
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
            isLeaf: true
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
  pickActivityOrganizer = (value) => {
    this.setState({
      activityOrganizer:value[value.length-1]
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
    let res = await createActApi(data)
    if(res){
      if(res.code === 0){
        message.success('创建活动成功！');
        this.props.history.push('/act-manage/manage-act')
      }else{
        message.error(res.msg);
      }
    }
  }
  render() {
    return (
      <div className="create-act">
        <Row>
          <Col span={9} offset={7}>
            <h3 className="create-act__title">
              创建活动
              <span className="create-act__title__desc">(仅限教师操作)</span>
            </h3>
          </Col>
        </Row>
        <Row>
          <Col span={9} offset={7}>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item>
                <Input name='activityName' onChange={this.handleChange.bind(this)} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="活动名称" />
              </Form.Item>
              <Form.Item>
                <DatePicker onChange={this.DatePick.bind(this)} placeholder="请选择活动开始日期" />
              </Form.Item>
              <Form.Item>
                <TimePicker onChange={this.TimePick.bind(this)} placeholder="活动时间" />
              </Form.Item>
              <Form.Item>
                <Input name='activityCredit' type='number' onChange={this.handleChange.bind(this)} prefix={<Icon type="database" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="活动学分" />
              </Form.Item>
              <Form.Item>
                <Cascader
                  options={this.state.options}
                  loadData={this.loadData}
                  onChange={this.pickSociety}
                  changeOnSelect
                  placeholder="请选择活动组织社团"
                />
              </Form.Item>
              <Form.Item>
                <Cascader
                  options={this.state.orzOption}
                  onChange={this.pickActivityOrganizer}
                  changeOnSelect
                  placeholder="请选择活动负责人"
                />
              </Form.Item>
              <Form.Item>
                <Input.TextArea 
                  autosize={{ minRows: 4, maxRows: 10 }}
                  name="activityIntroduction" 
                  onChange={this.handleChange.bind(this)}  
                  placeholder="编写活动介绍"
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" size='large' ghost onClick={this.createAct.bind(this)}>
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

const WrappedCreateActForm = Form.create({ name: 'time_related_controls' })(CreateAct);

export default WrappedCreateActForm;