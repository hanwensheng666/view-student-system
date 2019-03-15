import React, { Component } from 'react'
import { Link } from 'react-router-dom';


import { Layout, Menu, Icon } from 'antd';
const { Sider } = Layout;

export default class Side extends Component {
    render() {
        return (
			<Sider>
				<Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" style={{marginTop:"20px"}}>
					<Menu.Item key="1">
						<Link to="/componentManagement">
							<Icon type="pie-chart" />
							<span>组件管理</span>
						</Link>
					</Menu.Item>
					<Menu.Item key="2">
						<Link to="/channelManagement">
							<Icon type="appstore-o" />
							<span>渠道管理</span>
						</Link>
					</Menu.Item>
					<Menu.Item key="9">
						<Link to="/pageManagement">
							<Icon type="database" />
							<span>页面管理</span>
						</Link>
					</Menu.Item>
				</Menu>
			</Sider>
        )
    }
}
