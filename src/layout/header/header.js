import React, { Component } from 'react'

import { Button, Row, Col } from 'antd';
import {connect} from 'react-redux'
// import logo from '@/static/images/logo.png'
// import logo2x from '@/static/images/logo@2x.png'
import './header.css';

class Header extends Component {
  render() {
    const {userInfo} = this.props.auth
    return (
      <header className="header" >
        <Row type="flex" justify="space-between" align="middle">
          <Col span={12} className="header_title">
            <span className="logo">
              LOGO
              {/* <img className="logoImg" src={logo} srcSet={`${logo2x} 2x`} alt="logo"/> */}
            </span>
            <span className="logoText">太原师范学院计算机系活动管理系统</span>
          </Col>
          <Col span={4} className="login_info">
            <span>欢迎您，<span>{userInfo.name}</span></span>
            <Button>退出</Button>
          </Col>
        </Row>
      </header>
    )
  }
}

const mapStateToProps = state => ({
  auth:state.auth
})
export default connect(mapStateToProps)(Header);