import React from 'react';
import { Form, Icon, Input, Button,notification  } from 'antd';
import { connect } from 'react-redux';
import './Login.scss'
import {loginAction} from '@/store/actions/auth'
import {login} from '@/api/user'
const FormItem = Form.Item;
notification.config({
  placement: 'topRight',
  top: 50,
})
class Login extends React.Component {
  state = {
    userNo:'',
    password:''
  }
  async userLogin(data){
    let res = await login({
      userNo:this.state.userNo,
      password:this.state.password
    })
    if(res && res.code === 0){
      this.props.loginAction({
        token:res.results.token,
        userInfo:res.results,
        identity:res.results.identity
      })
      notification.open({
        message:res.msg,
        description:'请稍等,正在跳转到主页...',
        duration:2
      })
      setTimeout(()=>{
        this.props.history.push('/')
      },3000)
    }else{
      notification.open({
        message:'您的输入有误',
        description:res.msg
      })
    }
  }
  handleChange(ev){
    this.setState({
      [ev.target.id]:ev.target.value
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login">
        <div className="login__form" >
          <div className="login__form__logo">
            <span>太原师范学院计算机系活动管理系统</span>
          </div>
          <Form>
            <FormItem>
              {getFieldDecorator('userNo', {
                rules: [{ required: true, message: '请输入用户名!' }],
              })(
                <Input onChange={this.handleChange.bind(this)}  prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="请输入您的用户名" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码!' }],
              })(
                <Input onChange={this.handleChange.bind(this)}  prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="请输入密码" />
              )}
            </FormItem>
            <FormItem>
              <Button onClick={this.userLogin.bind(this)} type="primary" block htmlType="submit" className="login__form__button">
                登录
              </Button>
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }
}

const mapStateToPorps = state => ({
  auth:state.auth
});

export default connect(mapStateToPorps,{loginAction})(Form.create({
  userNo:'',
  password:''
})(Login));