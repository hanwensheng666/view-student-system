import React, { Component } from 'react'

import { Button, Row, Col } from 'antd';
import logo from '../../assets/images/logo.png'
import logo2x from '../../assets/images/logo@2x.png'

import './header.css';


class MyHeader extends Component {
    render() {
        return (
			<header className="header" >
				<Row type="flex" justify="space-between" align="middle">
					<Col span={12} className="header_title">
						<span className="logo">
							<img className="logoImg" src={logo} srcSet={`${logo2x} 2x`} alt="logo"/>
						</span>
						<span className="logoText">运营配置管理系统</span>
					</Col>
					<Col span={4} className="login_info">
						<span>当前登录人：<span>gujian</span></span>
						<Button>退出</Button>
					</Col>
				</Row>
			</header>
        )
    }
}


export default MyHeader;