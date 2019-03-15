import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { connect } from 'react-redux';
import './Login.scss'
const FormItem = Form.Item;

class Login extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login">
        <div className="login__form" >
          <div className="login__form__logo">
            <span>太原师范学院计算机系活动管理系统</span>
          </div>
          <Form onSubmit={this.handleSubmit}>
            <FormItem>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: '请输入用户名!' }],
              })(
                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="请输入您的用户名" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="请输入密码" />
              )}
            </FormItem>
            <FormItem>
              <Button type="primary" block htmlType="submit" className="login__form__button">
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

export default connect(mapStateToPorps)(Form.create()(Login));